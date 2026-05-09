/**
 * Run failed tests from playwright-report-export.xlsx (sheet "Details").
 * Each failed row is resolved by Module + "Test case id" to a spec file.
 * One Playwright run per spec file: tests in that file are filtered with -g
 * (regex alternation) so multiple report rows for the same file all run.
 *
 * Usage:
 *   node scripts/run-failed-from-xlsx.js <path-to-export.xlsx>
 *   node scripts/run-failed-from-xlsx.js <path-to-export.xlsx> --dry-run
 *   node scripts/run-failed-from-xlsx.js <path-to-export.xlsx> --by-file
 *       (single npx playwright test … run; specs from Module + Test case id only, no -g)
 */

const { spawnSync } = require("child_process");
const fs = require("fs");
const glob = require("glob");
const XLSX = require("xlsx");

function escapeRegex(s) {
  return String(s || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function findSpec(module, testCaseId) {
  const mod = String(module || "").replace(/\\/g, "/");
  const id = String(testCaseId || "").trim();
  const patterns = [
    `tests/${mod}/${id}_*.spec.ts`,
    `tests/${mod}/${id}.spec.ts`,
    `tests/${mod}/**/${id}_*.spec.ts`,
  ];
  for (const pat of patterns) {
    const hits = glob.sync(pat, { cwd: process.cwd(), nodir: true });
    if (hits.length) return hits[0].replace(/\\/g, "/");
  }
  return null;
}

function normalizeTitle(t) {
  return String(t || "")
    .replace(/^a_|^b_/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Report titles that do not match test() strings; grep is a Playwright regex. */
const TITLE_ALIASES = [
  {
    re: /^Creating user seperate Admin and Learner group$/i,
    grep: "Creating user with seperate Admin and Learner groups",
  },
  {
    re: /^Creating user with seperate Admin and Learner group$/i,
    grep: "Creating user and Verifying created groups",
  },
];

function titleToGrep(title) {
  const n = normalizeTitle(title);
  for (const { re, grep } of TITLE_ALIASES) {
    if (re.test(n)) return grep;
  }
  return escapeRegex(n);
}

function main() {
  const dryRun = process.argv.includes("--dry-run");
  const byFile = process.argv.includes("--by-file");
  const args = process.argv.slice(2).filter((a) => a !== "--dry-run" && a !== "--by-file");
  const xlsxPath = args[0];
  if (!xlsxPath || !fs.existsSync(xlsxPath)) {
    console.error("Usage: node scripts/run-failed-from-xlsx.js <playwright-report-export.xlsx> [--dry-run]");
    process.exit(1);
  }

  const wb = XLSX.readFile(xlsxPath);
  const sheet = wb.Sheets["Details"];
  if (!sheet) {
    console.error('Sheet "Details" not found.');
    process.exit(1);
  }
  const rows = XLSX.utils.sheet_to_json(sheet);
  const failed = rows.filter((r) => String(r.Status || "").toLowerCase() === "failed");

  /** @type {Map<string, Set<string>>} */
  const fileToGreps = new Map();
  const missing = [];

  for (const r of failed) {
    const spec = findSpec(r.Module, r["Test case id"]);
    if (!spec) {
      missing.push(`${r.Module} | ${r["Test case id"]}`);
      continue;
    }
    const title = normalizeTitle(r["Test case"]);
    if (!fileToGreps.has(spec)) fileToGreps.set(spec, new Set());
    if (title) fileToGreps.get(spec).add(titleToGrep(title));
    else fileToGreps.get(spec).add(".*");
  }

  if (missing.length) {
    console.error("Could not resolve spec for:");
    missing.forEach((m) => console.error("  ", m));
    process.exit(1);
  }

  const base = ["playwright", "test", "--config=playwright.config.ts"];
  const files = [...fileToGreps.keys()];

  console.error(`Failed rows in report: ${failed.length}`);
  if (byFile) {
    console.error(`Unique spec files (resolved by Module + Test case id): ${files.length}`);
    if (dryRun) {
      console.log("npx", [...base, ...files].join(" "));
      return;
    }
    const r = spawnSync("npx", [...base, ...files], {
      stdio: "inherit",
      shell: true,
      cwd: process.cwd(),
      env: process.env,
    });
    process.exit(r.status ?? 1);
  }

  console.error(`Playwright invocations (one per spec file, with -g from report titles): ${fileToGreps.size}`);

  if (dryRun) {
    for (const [file, greps] of fileToGreps) {
      const parts = [...greps];
      const pattern = parts.length === 1 ? parts[0] : parts.join("|");
      const g = pattern === ".*" ? [] : ["-g", pattern];
      console.log("npx", [...base, file, ...g].join(" "));
    }
    return;
  }

  let lastStatus = 0;
  for (const [file, greps] of fileToGreps) {
    const parts = [...greps];
    const pattern = parts.length === 1 ? parts[0] : parts.join("|");
    const g = pattern === ".*" ? [] : ["-g", pattern];
    const r = spawnSync("npx", [...base, file, ...g], {
      stdio: "inherit",
      shell: true,
      cwd: process.cwd(),
      env: process.env,
    });
    if (r.status !== 0) lastStatus = r.status ?? 1;
  }
  process.exit(lastStatus);
}

main();
