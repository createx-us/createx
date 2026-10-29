import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createHash } from "node:crypto";

const origin = process.argv[2] || "https://createx.us";
const reportPath = process.argv[3] || "docs/operations/live-verification.json";
const sha = (bytes) => createHash("sha256").update(bytes).digest("hex");
const checks = [];
async function check(path, expected, localFile, extra) {
  try {
    const response = await fetch(origin + path, {
      redirect: "manual",
      signal: AbortSignal.timeout(20000),
    });
    const body = Buffer.from(await response.arrayBuffer());
    const row = {
      path,
      status: response.status,
      expected,
      ok: response.status === expected,
      version: response.headers.get("x-createx-version"),
      location: response.headers.get("location"),
    };
    if (localFile) {
      row.sameBytes =
        sha(body) ===
        sha(await readFile(resolve("apps/website/dist", localFile)));
      row.ok &&= row.sameBytes;
    }
    if (extra) row.ok &&= extra(response, body);
    checks.push(row);
  } catch (error) {
    checks.push({ path, ok: false, error: error.message });
  }
}
await check("/", 302, null, (r) => r.headers.get("location") === "/en/");
for (const lang of ["en", "zh"])
  for (const page of [
    "",
    "practice",
    "chapters",
    "join",
    "partners",
    "governance",
    "resources",
  ]) {
    const path = `/${lang}/${page ? page + "/" : ""}`;
    await check(
      path,
      200,
      `${lang}/${page ? page + "/" : ""}index.html`,
      (r, b) =>
        r.headers.get("x-content-type-options") === "nosniff" &&
        r.headers
          .get("content-security-policy")
          ?.includes("form-action 'none'") &&
        b.includes(Buffer.from(`lang="${lang === "zh" ? "zh-CN" : "en"}"`)),
    );
  }
for (const lang of ["en", "zh"])
  for (const slug of [
    "overview",
    "application",
    "chapter-checklist",
    "collaboration",
  ])
    await check(
      `/downloads/createx-${slug}-${lang}.txt`,
      200,
      `downloads/createx-${slug}-${lang}.txt`,
      (r) => r.headers.get("content-disposition")?.includes("attachment"),
    );
await check(
  "/en/practice",
  307,
  null,
  (r) => r.headers.get("location") === "/en/practice/",
);
await check("/missing-verification-path", 404, "404.html");
await check("/zh/missing-verification-path", 404, "404.html");
await check("/sitemap.xml", 200, "sitemap.xml");
await check("/assets/app.js", 200, "assets/app.js");
const report = {
  origin,
  checkedAt: new Date().toISOString(),
  strictTLS: true,
  passed: checks.filter((x) => x.ok).length,
  total: checks.length,
  checks,
};
await writeFile(reportPath, JSON.stringify(report, null, 2) + "\n");
console.log(
  JSON.stringify(
    {
      origin,
      passed: report.passed,
      total: report.total,
      failures: checks.filter((x) => !x.ok),
    },
    null,
    2,
  ),
);
if (report.passed !== report.total) process.exitCode = 1;
