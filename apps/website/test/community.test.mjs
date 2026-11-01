import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { JSDOM } from "jsdom";

// Synthetic fixtures only: these tests do not establish real community listings.
const dist = resolve(import.meta.dirname, "../dist");
const script = await readFile(resolve(dist, "assets/community.js"), "utf8");
async function setup(lang, responses) {
  const html = await readFile(
    resolve(dist, lang, "chapters/index.html"),
    "utf8",
  );
  const dom = new JSDOM(html, {
    url: `https://createx.us/${lang}/chapters/`,
    runScripts: "outside-only",
  });
  const calls = [];
  dom.window.fetch = async (url) => {
    calls.push(url);
    const response = responses.shift();
    if (response instanceof Error) throw response;
    assert.ok(response, "Unexpected request");
    return response;
  };
  dom.window.eval(script);
  await new Promise((done) => setImmediate(done));
  const d = dom.window.document;
  function search(city) {
    d.querySelector("#city-search").value = city;
    d.querySelector("[data-city-search]").dispatchEvent(
      new dom.window.Event("submit", { cancelable: true }),
    );
  }
  return { dom, d, calls, search };
}
const json = (communities) => ({
  ok: true,
  headers: { get: () => "application/json" },
  json: async () => ({ communities }),
});

test("non-JSON API falls back to empty snapshot without claiming an established city chapter", async () => {
  for (const lang of ["en", "zh"]) {
    const { dom, d, calls, search } = await setup(lang, [
      { ok: true, headers: { get: () => "text/html" } },
      json([]),
    ]);
    try {
      assert.deepEqual(calls, [
        "/api/public/communities",
        "/data/communities.json",
      ]);
      search("Shanghai");
      const results = d.querySelector("[data-community-results]");
      assert.equal(results.querySelectorAll(".community-card").length, 0);
      assert.ok(
        results.textContent.includes(
          lang === "zh" ? "尚无已核实" : "No verified",
        ),
      );
      const link = new URL(results.querySelector("a").href);
      assert.equal(link.pathname, `/${lang}/join/`);
      assert.equal(link.searchParams.get("city"), "Shanghai");
      assert.equal(link.searchParams.get("intent"), "chapter");
    } finally {
      dom.window.close();
    }
  }
});

test("synthetic listings require active, verified, HTTPS contact and render content as text", async () => {
  const fixture = {
    name: "<script>fixture</script>",
    name_en: "<script>fixture</script>",
    city: "Shanghai",
    status: "active",
    verified: true,
    contact_url: "https://example.test/contact",
  };
  const { dom, d, search } = await setup("en", [
    json([
      fixture,
      { ...fixture, verified: false },
      { ...fixture, status: "proposed" },
      { ...fixture, contact_url: "javascript:alert(1)" },
      { ...fixture, contact_url: "http://example.test/contact" },
    ]),
  ]);
  try {
    const results = d.querySelector("[data-community-results]");
    assert.equal(results.querySelectorAll(".community-card").length, 1);
    assert.equal(results.querySelectorAll("script").length, 0);
    assert.ok(results.textContent.includes("<script>fixture</script>"));
    assert.equal(results.querySelector("a").href, fixture.contact_url);
    search("Unlisted Test City");
    assert.equal(results.querySelectorAll(".community-card").length, 0);
  } finally {
    dom.window.close();
  }
});

test("missing map component preserves city search and repeated activation stays safe", async () => {
  const { dom, d, search } = await setup("en", [json([])]);
  try {
    const button = d.querySelector("[data-load-map]");
    button.click();
    button.click();
    assert.equal(d.querySelector("#community-map").hidden, false);
    assert.ok(
      d
        .querySelector("[data-map-status]")
        .textContent.includes("component is unavailable"),
    );
    search("Test & <City>");
    const results = d.querySelector("[data-community-results]");
    assert.equal(results.querySelectorAll("city").length, 0);
    assert.equal(
      new URL(results.querySelector("a").href).searchParams.get("city"),
      "Test & <City>",
    );
  } finally {
    dom.window.close();
  }
});

test("directory request failure reports unavailability without inventing communities", async () => {
  const { dom, d, calls, search } = await setup("zh", [
    new Error("offline fixture"),
  ]);
  try {
    assert.deepEqual(calls, ["/api/public/communities"]);
    assert.ok(
      d.querySelector("[data-map-status]").textContent.includes("暂时无法读取"),
    );
    search("北京");
    assert.equal(d.querySelectorAll(".community-card").length, 0);
    assert.ok(
      d
        .querySelector("[data-community-results]")
        .textContent.includes("尚无已核实"),
    );
  } finally {
    dom.window.close();
  }
});
