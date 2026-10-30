import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { JSDOM } from "jsdom";
import sharp from "sharp";
const dist = resolve(import.meta.dirname, "../dist");
const langs = ["en", "zh"];
const pages = [
  "",
  "practice",
  "chapters",
  "join",
  "partners",
  "governance",
  "resources",
];
const load = (lang, page) =>
  readFile(resolve(dist, lang, page, "index.html"), "utf8");
test("14 localized documents have one h1, correct language and reciprocal alternates", async () => {
  for (const lang of langs)
    for (const page of pages) {
      const text = await load(lang, page);
      assert.equal((text.match(/<h1\b/g) || []).length, 1);
      assert.ok(text.includes(`lang="${lang === "zh" ? "zh-CN" : "en"}"`));
      for (const other of langs)
        assert.ok(
          text.includes(
            `hreflang="${other === "zh" ? "zh-CN" : "en"}" href="https://createx.us/${other}/${page ? page + "/" : ""}"`,
          ),
        );
    }
});
test("every internal link, asset and fragment resolves to a real target", async () => {
  for (const lang of langs)
    for (const page of pages) {
      const html = await load(lang, page);
      for (const [, ref] of html.matchAll(/(?:href|src)="([^"<>]+)"/g)) {
        if (!ref.startsWith("/") && !ref.startsWith("#")) continue;
        const [pathWithQuery, fragment] = ref.split("#");
        const path = pathWithQuery.split("?")[0];
        let file = path
          ? resolve(dist, "." + path)
          : resolve(dist, lang, page, "index.html");
        if ((await stat(file)).isDirectory())
          file = resolve(file, "index.html");
        assert.ok((await stat(file)).isFile(), ref);
        if (fragment) {
          const target = await readFile(file, "utf8");
          assert.ok(
            target.includes(`id="${fragment}"`),
            `${lang}/${page}: missing ${ref}`,
          );
        }
      }
    }
});
test("public download templates are complete, localized and exclude signing drafts", async () => {
  for (const lang of langs)
    for (const slug of [
      "overview",
      "application",
      "chapter-checklist",
      "collaboration",
    ]) {
      const t = await readFile(
        resolve(dist, `downloads/createx-${slug}-${lang}.txt`),
        "utf8",
      );
      assert.ok(t.length > 200);
      assert.ok(!t.includes("[填写联系人]"));
      assert.ok(!t.includes("BEGIN PRIVATE KEY"));
      if (slug === "application")
        assert.ok(
          t.includes(lang === "zh" ? "尚未接入" : "not yet been connected"),
        );
    }
});
test("public site distinguishes proposals from issued rights and achieved scale", async () => {
  for (const lang of langs) {
    const home = await load(lang, "");
    assert.ok(
      home.includes(
        lang === "zh" ? "不是已经实现的规模" : "not our current footprint",
      ),
    );
    const governance = await load(lang, "governance");
    assert.ok(
      governance.includes(
        lang === "zh" ? "不证明已发行" : "does not establish issuance",
      ),
    );
    assert.ok(
      governance.includes(
        lang === "zh" ? "不当然形成母子公司" : "does not establish a parent",
      ),
    );
    const join = await load(lang, "join");
    assert.ok(
      join.includes(lang === "zh" ? "不向网站发送" : "No application is sent"),
    );
    assert.ok(!join.includes("mailto:"));
    assert.ok(!join.includes('action="http'));
  }
});
test("release directory contains only website assets and no private source material", async () => {
  const allowed = new Set([
    "index.html",
    "404.html",
    "_headers",
    "_redirects",
    "robots.txt",
    "sitemap.xml",
    "assets",
    "downloads",
    "data",
    "en",
    "zh",
  ]);
  for (const name of await readdir(dist)) assert.ok(allowed.has(name), name);
  async function walk(dir) {
    for (const e of await readdir(dir, { withFileTypes: true })) {
      const p = resolve(dir, e.name);
      if (e.isDirectory()) await walk(p);
      else {
        assert.ok(!/\.(docx|pdf|zip|env|pptx)$/.test(e.name), p);
        assert.ok(!/(secret|testdata|credential)/i.test(e.name));
      }
    }
  }
  await walk(dist);
  assert.ok(dirname(dist).endsWith("website"));
});
test("semantic headings, labels, IDs and page-specific descriptions are valid", async () => {
  for (const lang of langs) {
    const descriptions = new Set();
    for (const page of pages) {
      const dom = new JSDOM(await load(lang, page));
      const d = dom.window.document;
      const ids = [...d.querySelectorAll("[id]")].map((e) => e.id);
      assert.equal(
        ids.length,
        new Set(ids).size,
        `${lang}/${page} duplicate id`,
      );
      let previous = 0;
      for (const h of d.querySelectorAll("h1,h2,h3,h4,h5,h6")) {
        const level = Number(h.tagName[1]);
        assert.ok(
          level <= previous + 1,
          `${lang}/${page}: heading jump ${h.textContent}`,
        );
        previous = level;
      }
      for (const e of d.querySelectorAll("input,select,textarea"))
        assert.ok(d.querySelector(`label[for="${e.id}"]`));
      descriptions.add(d.querySelector("meta[name=description]").content);
      assert.equal(d.querySelectorAll("main").length, 1);
      dom.window.close();
    }
    assert.equal(
      descriptions.size,
      pages.length,
      "each page needs its own description",
    );
  }
  const image = await sharp(resolve(dist, "assets/social.png")).metadata();
  assert.equal(image.width, 1200);
  assert.equal(image.height, 630);
});
test("reading and action colors meet WCAG AA normal-text contrast", async () => {
  const css = await readFile(resolve(dist, "assets/styles.css"), "utf8");
  const token = (name) =>
    css.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`))[1].slice(1);
  const luminance = (hex) => {
    const rgb = hex
      .match(/\w\w/g)
      .map((v) => parseInt(v, 16) / 255)
      .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
  };
  for (const [fg, bg] of [
    [token("ink"), token("paper")],
    [token("muted"), token("paper")],
    [token("accent"), token("paper")],
    [token("white"), token("accent")],
    [token("ink"), token("wash")],
    [token("accent"), token("wash")],
    ["d4ebee", token("ink")],
  ]) {
    const values = [luminance(fg), luminance(bg)].sort((a, b) => b - a);
    const ratio = (values[0] + 0.05) / (values[1] + 0.05);
    assert.ok(ratio >= 4.5, `${fg}/${bg}: ${ratio}`);
  }
});
