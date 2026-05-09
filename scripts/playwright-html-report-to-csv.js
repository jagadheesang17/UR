/**
 * Converts a Playwright HTML report folder (e.g. reporter/playwright-reports-<timestamp>)
 * to:
 * - CSV: s.no, module, test case id, test case, status, failed reason
 * - XLSX: sheet "Details" (same columns) + sheet "Summary" (totals: pass / fail / skipped / flaky)
 *
 * Usage: node scripts/playwright-html-report-to-csv.js <path-to-report-folder> [output-details.csv]
 */

const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");
const { extract } = require("playwright-core/lib/zipBundle");

function stripAnsi(s) {
  return String(s).replace(/\u001b\[[0-9;]*m/g, "");
}

function csvEscape(value) {
  if (value == null) return "";
  const s = stripAnsi(String(value));
  if (/[",\r\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function testCaseIdFromFile(file) {
  const name = path.basename(file).replace(/\.spec\.[jt]s$/i, "");
  let m = name.match(/^([A-Z]{2,}_[A-Z]+\d+[a-z]?)(?=_[A-Z])/);
  if (m) return m[1];
  m = name.match(/^([A-Z]+\d+[a-z]?)(?=_[A-Z])/);
  if (m) return m[1];
  const parts = name.split("_");
  return parts.length >= 2 ? `${parts[0]}_${parts[1]}` : parts[0] || name;
}

function moduleFromFile(file) {
  const norm = file.replace(/\\/g, "/");
  const idx = norm.indexOf("tests/");
  if (idx === -1) {
    const d = path.dirname(norm);
    return d === "." ? "" : d;
  }
  const rel = norm.slice(idx + "tests/".length);
  const dir = path.posix.dirname(rel);
  return dir === "." ? "(tests root)" : dir;
}

function outcomeToStatus(outcome) {
  switch (outcome) {
    case "expected":
      return "Passed";
    case "unexpected":
      return "Failed";
    case "flaky":
      return "Flaky";
    case "skipped":
      return "Skipped";
    default:
      return outcome || "";
  }
}

function collectFailedReason(testCase) {
  const results = testCase.results || [];
  const ordered = [...results].sort((a, b) => (b.retry ?? 0) - (a.retry ?? 0));
  const relevant = ordered.find(
    (r) =>
      r.status === "failed" ||
      r.status === "timedOut" ||
      r.status === "interrupted"
  );
  if (!relevant) return "";

  const parts = [];
  for (const err of relevant.errors || []) {
    if (err.message) parts.push(err.message.trim());
  }

  function walkSteps(steps) {
    for (const s of steps || []) {
      if (s.error) parts.push(String(s.error).trim());
      walkSteps(s.steps);
    }
  }
  walkSteps(relevant.steps);

  const seen = new Set();
  const unique = [];
  for (const p of parts) {
    if (!p || seen.has(p)) continue;
    seen.add(p);
    unique.push(p);
  }
  return unique.join("\n\n");
}

async function extractEmbeddedReportZip(indexHtmlPath, outDirAbs) {
  const html = fs.readFileSync(indexHtmlPath, "utf8");
  const m = html.match(
    /window\.playwrightReportBase64\s*=\s*"data:application\/zip;base64,([^"]+)"/
  );
  if (!m) {
    throw new Error(
      "Could not find embedded report ZIP in index.html (unexpected Playwright HTML report format)."
    );
  }
  const buf = Buffer.from(m[1], "base64");
  await fs.promises.mkdir(outDirAbs, { recursive: true });
  const tmpZip = path.join(outDirAbs, "__report.zip");
  await fs.promises.writeFile(tmpZip, buf);
  try {
    await extract(tmpZip, { dir: outDirAbs });
  } finally {
    await fs.promises.unlink(tmpZip).catch(() => {});
  }
}

async function loadTestFilesFromExtractedDir(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  const tests = [];
  for (const e of entries) {
    if (!e.isFile() || !e.name.endsWith(".json") || e.name === "report.json") {
      continue;
    }
    const p = path.join(dir, e.name);
    let data;
    try {
      data = JSON.parse(await fs.promises.readFile(p, "utf8"));
    } catch {
      continue;
    }
    if (data && Array.isArray(data.tests) && data.fileName) {
      tests.push(data);
    }
  }
  return tests;
}

function buildRows(testFiles) {
  const rows = [];
  for (const tf of testFiles) {
    const fileName = tf.fileName;
    const mod = moduleFromFile(fileName);
    const caseId = testCaseIdFromFile(fileName);
    for (const testCase of tf.tests || []) {
      const status = outcomeToStatus(testCase.outcome);
      const failedReason =
        status === "Failed" || status === "Flaky"
          ? collectFailedReason(testCase)
          : "";
      rows.push({
        module: mod,
        testCaseId: caseId,
        testCase: testCase.title || "",
        status,
        failedReason,
      });
    }
  }
  rows.sort((a, b) => {
    const c = a.module.localeCompare(b.module);
    if (c !== 0) return c;
    return (a.testCase || "").localeCompare(b.testCase || "");
  });
  return rows;
}

function summarizeStatuses(rows) {
  let passed = 0;
  let failed = 0;
  let skipped = 0;
  let flaky = 0;
  for (const r of rows) {
    switch (r.status) {
      case "Passed":
        passed++;
        break;
      case "Failed":
        failed++;
        break;
      case "Skipped":
        skipped++;
        break;
      case "Flaky":
        flaky++;
        break;
      default:
        break;
    }
  }
  const total = rows.length;
  return { total, passed, failed, skipped, flaky };
}

function buildSummarySheetAoA(reportFolderName, counts) {
  const generated = new Date().toISOString();
  return [
    ["Report folder", reportFolderName],
    ["Generated (UTC)", generated],
    [],
    ["Metric", "Count"],
    ["Total test cases", counts.total],
    ["Passed", counts.passed],
    ["Failed", counts.failed],
    ["Skipped", counts.skipped],
    ["Flaky", counts.flaky],
  ];
}

function writeXlsx(outPath, rows, summaryAoA) {
  const wb = XLSX.utils.book_new();
  const detailRows = rows.map((r, i) => ({
    "s.no": i + 1,
    module: stripAnsi(r.module),
    "test case id": stripAnsi(r.testCaseId),
    "test case": stripAnsi(r.testCase),
    status: stripAnsi(r.status),
    "failed reason": stripAnsi(r.failedReason),
  }));
  const wsDetails = XLSX.utils.json_to_sheet(detailRows);
  XLSX.utils.book_append_sheet(wb, wsDetails, "Details");
  const wsSummary = XLSX.utils.aoa_to_sheet(summaryAoA);
  XLSX.utils.book_append_sheet(wb, wsSummary, "Summary");
  XLSX.writeFile(wb, outPath);
}

async function main() {
  const reportDir = path.resolve(process.argv[2] || "");
  const outCsvArg = process.argv[3];
  const outCsv =
    outCsvArg || path.join(reportDir, "playwright-report-details.csv");
  const outXlsx = outCsvArg
    ? outCsvArg.replace(/\.csv$/i, "") + "-export.xlsx"
    : path.join(reportDir, "playwright-report-export.xlsx");

  if (!reportDir || !fs.existsSync(reportDir)) {
    console.error("Usage: node scripts/playwright-html-report-to-csv.js <report-folder> [output-details.csv]");
    console.error("Example: node scripts/playwright-html-report-to-csv.js reporter/playwright-reports-1774366613880");
    process.exit(1);
  }

  const indexPath = path.join(reportDir, "index.html");
  if (!fs.existsSync(indexPath)) {
    console.error(`Missing index.html in: ${reportDir}`);
    process.exit(1);
  }

  const tmpDir = path.join(
    reportDir,
    `.csv-extract-${process.pid}-${Date.now()}`
  );
  const tmpAbs = path.resolve(tmpDir);

  try {
    await extractEmbeddedReportZip(indexPath, tmpAbs);
    const testFiles = await loadTestFilesFromExtractedDir(tmpAbs);
    if (!testFiles.length) {
      console.error(
        "No per-file test JSON found after extract. Is this a valid Playwright HTML report?"
      );
      process.exit(1);
    }

    const rows = buildRows(testFiles);
    const header =
      "s.no,module,test case id,test case,status,failed reason\n";
    const lines = rows.map((r, i) =>
      [
        i + 1,
        csvEscape(r.module),
        csvEscape(r.testCaseId),
        csvEscape(r.testCase),
        csvEscape(r.status),
        csvEscape(r.failedReason),
      ].join(",")
    );

    await fs.promises.writeFile(outCsv, header + lines.join("\n"), "utf8");
    const counts = summarizeStatuses(rows);
    const folderName = path.basename(reportDir);
    writeXlsx(outXlsx, rows, buildSummarySheetAoA(folderName, counts));
    console.log(`Wrote ${rows.length} row(s) to ${outCsv}`);
    console.log(`Wrote workbook ${outXlsx} (Details + Summary sheets)`);
    console.log(
      `Summary: total=${counts.total}, passed=${counts.passed}, failed=${counts.failed}, skipped=${counts.skipped}, flaky=${counts.flaky}`
    );
  } finally {
    await fs.promises.rm(tmpAbs, { recursive: true, force: true }).catch(() => {});
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
