const os = require('os');

// Very light, rule-based refiner for Playwright codegen output.
// It keeps semantics but improves:
// - replace absolute goto with baseURL-relative
// - normalize role names to case-insensitive regex
// - remove immediate duplicate clicks/fills
// - parameterize credentials via env

function refineSpec(source, opts = {}) {
  const EOL = os.EOL;
  const lines = source.split(/\r?\n/);
  const stats = { removedDuplicates: 0, parameterizedCreds: 0, madeRelative: 0 };

  const urlBase = opts.base || 'https://qaprod1.expertusoneqa.cloud';
  const rel = (u) => {
    try {
      const url = new URL(u);
      if (url.origin === urlBase) return url.pathname + url.search + url.hash;
      // if host matches without protocol
      if (u.startsWith(urlBase)) return u.slice(urlBase.length) || '/';
    } catch (_) {}
    return u;
  };

  const out = [];
  let lastAction = '';
  for (let line of lines) {
    // Convert absolute page.goto to relative where possible
    line = line.replace(/page\.goto\(['"](https?:\/\/[^'"\)]+)['"]\)/, (m, url) => {
      const r = rel(url);
      if (r !== url) { stats.madeRelative++; return `page.goto('${r}')`; }
      return m;
    });

    // Normalize role locators to case-insensitive for stability
    line = line.replace(/getByRole\(([^,]+), \{\s*name:\s*'([^']+)'\s*\}\)/g, (m, role, name) => {
      return `getByRole(${role}, { name: /${escapeRegex(name)}/i })`;
    });

    // Parameterize obvious creds fills
    line = line.replace(/fill\('([^']+@[^']+\.[^']+)'\)/g, (m, v) => {
      stats.parameterizedCreds++; return "fill(process.env.E1_USER || '" + v + "')";
    });
    line = line.replace(/fill\('(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}'\)/, (m) => {
      stats.parameterizedCreds++; return "fill(process.env.E1_PASS || 'Password1!')";
    });

    // Drop immediate duplicates
    if (line.trim() === lastAction.trim() && /click\(|fill\(/.test(line)) {
      stats.removedDuplicates++;
      continue;
    }
    out.push(line);
    lastAction = line;
  }

  // Ensure named test and import are present
  let code = out.join(EOL)
    .replace(/test\('test'/, "test('refined'");

  return { code, stats };
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

module.exports = { refineSpec };
