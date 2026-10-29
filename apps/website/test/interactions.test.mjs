import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { JSDOM } from "jsdom";
const dist = resolve(import.meta.dirname, "../dist");
const script = await readFile(resolve(dist, "assets/app.js"), "utf8");
async function setup(lang = "en", page = "join", hash = "") {
  const html = await readFile(resolve(dist, lang, page, "index.html"), "utf8");
  const dom = new JSDOM(html, {
    url: `https://createx.us/${lang}/${page}/` + hash,
    runScripts: "outside-only",
  });
  const { window: w } = dom;
  const blobs = new Map();
  let serial = 0;
  w.matchMedia = () => ({ addEventListener() {} });
  w.Blob = Blob;
  w.URL.createObjectURL = (blob) => {
    const id = "blob:createx-" + ++serial;
    blobs.set(id, blob);
    return id;
  };
  w.URL.revokeObjectURL = (id) => blobs.delete(id);
  w.eval(script);
  return { dom, w, d: w.document, blobs };
}
test("role selection, whitespace rejection, local draft content, edit invalidation and reset", async () => {
  for (const lang of ["en", "zh"]) {
    const { dom, w, d, blobs } = await setup(lang);
    const form = d.querySelector("form");
    const status = d.querySelector("[role=status]");
    assert.equal(form.querySelector("fieldset").disabled, false);
    d.querySelector('[data-role-key="2"]').click();
    assert.equal(d.querySelector("#role").value, "2");
    const set = (id, value) => {
      d.getElementById(id).value = value;
    };
    set("city", "   ");
    set("time", "3 hours/week");
    set("challenge", "A bounded public service prototype");
    form.dispatchEvent(new w.Event("submit", { cancelable: true }));
    assert.equal(blobs.size, 0);
    assert.equal(status.textContent, form.dataset.error);
    set("city", "Test City / UTC");
    set("evidence", "<script>literal text only</script>");
    form.dispatchEvent(new w.Event("submit", { cancelable: true }));
    assert.equal(blobs.size, 1);
    const a = d.querySelector(".draft-result a");
    assert.ok(a);
    assert.equal(a.download, `createx-interest-${lang}.txt`);
    const text = await blobs.get(a.href).text();
    assert.ok(
      text.includes(lang === "en" ? "City chapter lead" : "城市社区创始人"),
    );
    assert.ok(text.includes("Test City / UTC"));
    assert.ok(text.includes("<script>literal text only</script>"));
    assert.ok(text.includes(lang === "en" ? "not sent" : "尚未发送"));
    assert.equal(d.querySelectorAll(".draft-result script").length, 0);
    assert.equal(status.textContent, form.dataset.success);
    d.querySelector("#city").dispatchEvent(
      new w.Event("input", { bubbles: true }),
    );
    assert.equal(blobs.size, 0);
    assert.equal(d.querySelector(".draft-result a"), null);
    form.reset();
    assert.equal(d.querySelector("#city").value, "");
    assert.equal(status.textContent, "");
    dom.window.close();
  }
});
test("mobile menu keyboard state and focus return", async () => {
  const { dom, w, d } = await setup();
  const toggle = d.querySelector("[data-menu-toggle]");
  const nav = d.getElementById("mobile-nav");
  assert.equal(nav.hidden, true);
  toggle.click();
  assert.equal(nav.hidden, false);
  assert.equal(toggle.getAttribute("aria-expanded"), "true");
  d.dispatchEvent(
    new w.KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
  );
  assert.equal(nav.hidden, true);
  assert.equal(d.activeElement, toggle);
  toggle.click();
  nav.querySelector("a").click();
  assert.equal(nav.hidden, true);
  dom.window.close();
});
test("language switch preserves page and a shared chapter fragment", async () => {
  const { dom, w, d } = await setup("en", "chapters", "#pilot");
  const link = d.querySelector("[data-language-switch]");
  assert.equal(link.getAttribute("href"), "/zh/chapters/#pilot");
  w.location.hash = "#checklist";
  w.dispatchEvent(new w.Event("hashchange"));
  assert.equal(link.getAttribute("href"), "/zh/chapters/#checklist");
  dom.window.close();
});
test("without enhancement, disabled form and plain-template fallback are present", async () => {
  const html = await readFile(resolve(dist, "en/join/index.html"), "utf8");
  const dom = new JSDOM(html);
  const d = dom.window.document;
  assert.equal(d.querySelector("fieldset").disabled, true);
  assert.equal(d.querySelector("[type=submit]").disabled, true);
  assert.ok(
    d.querySelector("noscript nav").getAttribute("aria-label") ===
      "Navigation without JavaScript",
  );
  assert.ok(
    d.querySelector("a[download]").href.includes("createx-application-en.txt"),
  );
  dom.window.close();
});
test("shared FAQ fragment reveals the corresponding answer", async () => {
  const { dom, d } = await setup("zh", "resources", "#faq-5");
  assert.equal(d.getElementById("faq-5").open, true);
  assert.equal(d.getElementById("faq-4").open, false);
  dom.window.close();
});
