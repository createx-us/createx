import sharp from "sharp";
import { mkdir, readFile, writeFile, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { brand } from "../../../packages/brand/src/index.ts";
import { copy, languages, pages, type Language, type Page } from "./content.ts";

const root = fileURLToPath(new URL("../", import.meta.url));
const out = resolve(root, "dist");
const esc = (s: string) =>
  s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
const lines = (s: string) => esc(s).replaceAll("\n", "<br>");
const url = (l: Language, p: Page = "") => `/${l}/${p ? p + "/" : ""}`;
const icon =
  '<svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true"><path d="M5 5l22 22M27 5L5 27M16 1v30M1 16h30" stroke="currentColor" stroke-width="3"/></svg>';
const arrow = '<span aria-hidden="true">↗</span>';
const anchor = (label: string, href: string, cls = "text-link") =>
  `<a class="${cls}" href="${href}"${href.startsWith("/downloads/") ? " download" : ""}>${esc(label)} ${arrow}</a>`;
const list = (items: readonly string[]) =>
  `<ul class="check-list">${items.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`;
const cards = (items: readonly (readonly string[])[], cls = "three-column") =>
  `<div class="${cls}">${items.map((r, i) => `<article class="principle"><span class="step-number">${String(i + 1).padStart(2, "0")}</span><h3>${esc(r[0])}</h3><p>${esc(r[1])}</p>${r[2] ? `<p>${esc(r[2])}</p>` : ""}</article>`).join("")}</div>`;
const heading = (label: string, title: string, intro = "") =>
  `<p class="eyebrow">${esc(label)}</p><div class="section-heading"><h2>${lines(title)}</h2></div>${intro ? `<p class="section-intro">${esc(intro)}</p>` : ""}`;
const section = (id: string, html: string) =>
  `<section id="${id}" class="section container">${html}</section>`;
function cityMap(l: Language) {
  return `<svg class="city-map" viewBox="0 0 580 500" role="img" aria-labelledby="map-title-${l} map-desc-${l}"><title id="map-title-${l}">${l === "zh" ? "城市共创网络概念图" : "A concept for a city-based collaboration network"}</title><desc id="map-desc-${l}">${esc(copy[l].mapNote)}</desc><defs><pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="#d2d2c7" stroke-width=".65"/></pattern><marker id="arrowhead" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0 0l5 2.5L0 5" fill="none" stroke="#bc3b1c"/></marker></defs><rect x="18" y="20" width="544" height="448" fill="url(#grid)"/><g stroke="#c1c4b7" fill="none"><ellipse cx="290" cy="250" rx="235" ry="172"/><ellipse cx="290" cy="250" rx="167" ry="235" transform="rotate(43 290 250)"/><path d="M97 147L290 102L478 200L402 386L177 382Z" stroke-dasharray="4 7"/></g><g stroke="#1b201c" fill="#e6e7dc" stroke-width="1.4"><path d="M114 228l68-34 67 34-67 34Z"/><path d="M114 228v63l68 34v-63M249 228v63l-67 34"/><path d="M327 165l68-34 68 34-68 34Z"/><path d="M327 165v74l68 34v-74M463 165v74l-68 34"/><path d="M275 328l68-34 68 34-68 34Z"/><path d="M275 328v49l68 34v-49M411 328v49l-68 34"/></g><g stroke="#7b8471" stroke-width="1"><path d="M137 251v20m21-10v20m46-10v20m20-30v20M350 189v22m22-12v22m45-11v22m23-33v22M298 351v13m22-2v13m45-2v13m22-24v13"/></g><g stroke="#bc3b1c" stroke-width="2" fill="none" marker-end="url(#arrowhead)"><path d="M235 206Q267 148 326 163"/><path d="M424 275Q428 313 403 327"/><path d="M273 362Q211 386 180 331"/></g><g fill="#bc3b1c"><circle cx="98" cy="147" r="5"/><circle cx="290" cy="102" r="5"/><circle cx="478" cy="200" r="5"/><circle cx="177" cy="382" r="5"/><circle cx="402" cy="386" r="5"/><circle cx="78" cy="314" r="3"/><circle cx="463" cy="350" r="3"/></g><g font-family="monospace" font-size="10" letter-spacing="1" fill="#586153"><text x="47" y="67">LOCAL ROOTS / SHARED LEARNING</text><text x="132" y="181">${l === "zh" ? "真实问题" : "REAL NEEDS"}</text><text x="350" y="115">${l === "zh" ? "共同创造" : "CO-CREATION"}</text><text x="300" y="440">${l === "zh" ? "可复用成果" : "SHARED OUTCOMES"}</text><text x="43" y="465">FIG. 01 — NETWORK AS A PRACTICE</text></g></svg>`;
}
function header(l: Language, p: Page) {
  const c = copy[l],
    other = l === "en" ? "zh" : "en";
  return `<a class="skip-link" href="#main">${c.skip}</a><header class="site-header"><div class="header-inner"><a class="brand" href="${url(l)}" aria-label="CreateX ${c.nav[0]}"><span class="brand-mark">${icon}</span>CreateX</a><nav class="desktop-nav" aria-label="${l === "zh" ? "主导航" : "Main navigation"}">${(["practice", "chapters", "partners", "resources"] as Page[]).map((x) => `<a class="nav-link" href="${url(l, x)}"${x === p ? ' aria-current="page"' : ""}>${esc(c.nav[pages.indexOf(x)])}</a>`).join("")}</nav><div class="header-actions"><a class="language-switch" data-language-switch href="${url(other, p)}" lang="${copy[other].lang}" hreflang="${copy[other].lang}" aria-label="${l === "en" ? "切换为中文" : "Switch to English"}">${c.other}</a>${anchor(c.join, url(l, "join"), "button primary")}<button class="menu-toggle" data-menu-toggle aria-controls="mobile-nav" aria-expanded="false" aria-label="${c.menu}" data-open="${c.menu}" data-close="${c.close}">☰</button></div></div><nav class="mobile-nav" id="mobile-nav" hidden aria-label="${l === "zh" ? "手机导航" : "Mobile navigation"}">${pages.map((x, i) => `<a href="${url(l, x)}"${x === p ? ' aria-current="page"' : ""}>${esc(c.nav[i])}</a>`).join("")}</nav><noscript><nav class="nojs-nav container" aria-label="${l === "zh" ? "备用导航" : "Navigation without JavaScript"}">${pages.map((x, i) => `<a href="${url(l, x)}">${esc(c.nav[i])}</a>`).join("")}</nav></noscript></header>`;
}
function footer(l: Language) {
  const c = copy[l];
  return `<footer class="site-footer"><div class="container"><div class="footer-top"><div class="footer-brand"><a class="brand" href="${url(l)}"><span class="brand-mark">${icon}</span>CreateX</a><p>${c.footerText}</p><p>${c.footerNote}</p></div><nav class="footer-links" aria-label="${l === "zh" ? "页脚导航" : "Footer navigation"}">${pages
    .slice(1)
    .map((p, i) => `<a href="${url(l, p)}">${esc(c.nav[i + 1])}</a>`)
    .join(
      "",
    )}</nav></div><div class="footer-bottom"><span>${c.rights}<br>${c.status}</span><span>${brand.version}<br>© 2026 CreateX</span></div></div></footer>`;
}
function cta(l: Language) {
  const c = copy[l];
  return `<section class="statement" id="start"><div class="container statement-inner"><div><p class="eyebrow">CREATE X / TOGETHER</p><h2 class="statement-title">${lines(c.ctaTitle)}</h2></div><div><p class="statement-note">${c.ctaText}</p>${anchor(c.join, url(l, "join"), "button primary")}</div></div></section>`;
}
const sections: Record<
  Exclude<Page, "">,
  readonly (readonly [string, string, string])[]
> = {
  practice: [
    ["workshop", "Workshop OS", "工作坊路径"],
    ["project", "Action learning", "行动学习"],
    ["outcomes", "Outcomes", "成果验收"],
  ],
  chapters: [
    ["roles", "The team", "职能分工"],
    ["pilot", "90-day pilot", "90天试点"],
    ["checklist", "Before starting", "启动检查"],
  ],
  join: [
    ["roles", "Choose a role", "选择角色"],
    ["application", "Prepare a draft", "准备草稿"],
  ],
  partners: [
    ["collaborate", "Ways to collaborate", "合作方式"],
    ["sponsor", "Sponsorship", "赞助边界"],
    ["brief", "The brief", "需求简表"],
  ],
  governance: [
    ["structure", "Structure", "治理结构"],
    ["process", "Process", "治理流程"],
    ["contribution", "Contribution", "贡献证据"],
    ["mechanisms", "CTX & CRED", "机制提案"],
    ["ecosystem", "Ecosystem", "生态关系"],
  ],
  resources: [
    ["downloads", "Downloads", "资料下载"],
    ["faq", "Questions", "常见问题"],
  ],
};
function pageHero(l: Language, p: Page, title: string, description: string) {
  const toc = p ? sections[p] : [];
  return `<section class="page-hero container"><p class="eyebrow">CREATE X / ${esc(copy[l].nav[pages.indexOf(p)])}</p><h1 class="page-title">${lines(title)}</h1><p class="page-description">${esc(description)}</p></section><nav class="page-sections container" aria-label="${l === "zh" ? "本页章节" : "On this page"}">${toc.map((r) => `<a href="#${r[0]}">${l === "zh" ? r[2] : r[1]}</a>`).join("")}</nav>`;
}
function roleList(l: Language, full = false) {
  const c = copy[l];
  return `<div class="role-list">${c.roles.map((r, i) => `<article class="role-row" id="role-${i}"><span class="role-number">0${i + 1}</span><div class="role-copy"><h3>${esc(r[0])}</h3><p>${esc(r[1])}</p>${full ? `<p><strong>${c.firstTask}：</strong>${esc(r[2])}</p>` : ""}</div><a class="role-action" ${full ? `data-role-key="${i}"` : ""} href="${full ? "#application" : url(l, "join") + "#role-" + i}" aria-label="${esc(c.prepare + " — " + r[0])}">↗</a></article>`).join("")}</div>`;
}
function home(l: Language) {
  const c = copy[l];
  return `<section class="hero container" id="top"><div class="hero-copy"><p class="eyebrow">${c.eyebrow}</p><h1>${lines(c.title)}</h1><p>${c.description}</p><div class="hero-actions">${anchor(c.join, url(l, "join"), "button primary")}${anchor(c.explore, url(l, "practice"))}</div><p class="hero-note">${c.heroNote}</p></div><figure class="hero-visual">${cityMap(l)}<figcaption class="hero-caption"><span>${c.mapCaption}</span><span>${c.mapNote}</span></figcaption></figure></section>${section("why", heading(c.whyLabel, c.whyTitle) + `<div class="split"><p class="lead">${c.whyText}</p><div class="panel accent"><p class="eyebrow">INFORMATION × SPACE × RELATIONSHIP</p><h3>${l === "zh" ? "让知识、空间与关系，形成持续的创新现场。" : "Knowledge, space, and relationships—a place for possibility to take shape."}</h3><p>${c.heroNote}</p></div></div><div class="principles">${c.principles.map((r, i) => `<article class="principle"><span class="step-number">0${i + 1}</span><h3>${r[0]}</h3><p>${r[1]}</p></article>`).join("")}</div>`)}${section("practice", heading(c.howLabel, c.howTitle, c.howText) + `<div class="path">${c.homeSteps.map((r, i) => `<article class="path-step"><span class="step-number">0${i + 1}</span><h3>${r[0]}</h3><p>${r[1]}</p></article>`).join("")}</div>${anchor(c.explore, url(l, "practice"))}`)}${section("cities", heading(c.cityLabel, c.cityTitle, c.cityText) + `<div class="panel dark"><p class="eyebrow">${c.vision}</p><h2>${lines(c.visionTitle)}</h2><p>${c.visionNote}</p>${anchor(c.cityLink, url(l, "chapters"))}</div>`)}${section("roles", heading(c.rolesLabel, c.rolesTitle, c.rolesText) + roleList(l) + anchor(c.viewRoles, url(l, "join")))}${cta(l)}`;
}
function practice(l: Language) {
  const c = copy[l];
  return (
    pageHero(l, "practice", c.practiceTitle, c.practiceIntro) +
    section(
      "workshop",
      heading("WORKSHOP OS", c.howTitle) +
        `<div class="role-list">${c.workshopSteps.map((r, i) => `<article class="role-row"><span class="role-number">0${i + 1}</span><div class="role-copy"><h3>${r[0]}</h3><p>${r[1]}</p><p><small>${r[2]}</small></p></div></article>`).join("")}</div>`,
    ) +
    section(
      "project",
      heading("ACTION LEARNING", c.projectTitle, c.projectText) +
        cards(c.projectStages, "path"),
    ) +
    section(
      "outcomes",
      `<div class="split"><h2>${c.doneTitle}</h2><p class="lead">${c.doneText}</p></div>`,
    ) +
    cta(l)
  );
}
function chapters(l: Language) {
  const c = copy[l];
  return (
    pageHero(l, "chapters", c.chaptersTitle, c.chaptersIntro) +
    section(
      "roles",
      heading(
        "CITY CHAPTER",
        l === "zh"
          ? "先建立一个能交付的小团队。"
          : "Start with a small team that can deliver.",
      ) +
        cards(c.chapterFunctions) +
        `<p class="privacy-note">${c.chapterFunctionsNote}</p>`,
    ) +
    section(
      "pilot",
      heading("CITY CHAPTER / PILOT", c.launchTitle, c.launchIntro) +
        `<div class="timeline">${c.launch.map((r) => `<article class="timeline-item"><span class="tag">${r[0]}</span><h3>${r[1]}</h3><p>${r[2]}</p><p><small>${r[3]}</small></p></article>`).join("")}</div>`,
    ) +
    section(
      "checklist",
      `<div class="split"><h2>${c.startupTitle}</h2>${list(c.startup)}</div><aside class="boundary"><h3>${c.autonomyTitle}</h3><p>${c.autonomyText}</p></aside>`,
    ) +
    cta(l)
  );
}
function join(l: Language) {
  const c = copy[l];
  const input = (
    key: "city" | "time" | "challenge" | "evidence" | "support",
    required = false,
    multi = false,
  ) =>
    `<div class="field${multi ? " full" : ""}"><label for="${key}">${c.fields[key]}${required ? ` <small>(${c.required})</small>` : ""}</label>${multi ? `<textarea rows="4" maxlength="1500"` : `<input type="text" maxlength="120"`} id="${key}" name="${key}" placeholder="${c.placeholders[key]}"${required ? " required" : ""}>${multi ? "</textarea>" : ""}</div>`;
  return (
    pageHero(l, "join", c.joinTitle, c.joinIntro) +
    section(
      "roles",
      heading("PEOPLE / CREATE X", c.rolesTitle) + roleList(l, true),
    ) +
    section(
      "application",
      `<div class="panel"><h2>${c.formTitle}</h2><p id="form-scope">${c.formIntro}</p><form aria-describedby="form-scope" class="application-form" data-application data-language="${l}" data-save="${esc(c.draftSave)}" data-success="${esc(c.formSuccess)}" data-error="${esc(c.formError)}"><fieldset class="form-grid" disabled><legend class="sr-only">${c.prepare}</legend><div class="field full"><label for="role">${c.fields.role}</label><select id="role" name="role">${c.roles.map((r, i) => `<option value="${i}">${esc(r[0])}</option>`).join("")}</select></div>${input("city", true)}${input("time", true)}${input("challenge", true, true)}${input("evidence", false, true)}${input("support", false, true)}</fieldset><p class="privacy-note">${c.privacy}</p><div class="form-actions"><button class="button primary" type="submit" disabled>${c.download} <span aria-hidden="true">↓</span></button><button class="button secondary" type="reset">${c.reset}</button></div><p class="form-status" role="status" aria-live="polite"></p><div class="draft-result"></div></form><p class="privacy-note">${c.fallback} <a download href="/downloads/createx-application-${l}.txt">${c.template}</a></p><noscript><p>${c.fallback} <a href="/downloads/createx-application-${l}.txt" download>${c.template}</a></p></noscript></div><aside class="boundary">${c.joinBoundary}</aside>`,
    )
  );
}
function partners(l: Language) {
  const c = copy[l];
  return (
    pageHero(l, "partners", c.partnersTitle, c.partnersIntro) +
    section(
      "collaborate",
      heading(
        "PARTNERSHIPS",
        l === "zh"
          ? "从共同目标，选择合作方式。"
          : "Choose a way to work toward a shared goal.",
      ) + cards(c.partnerTypes, "two-column"),
    ) +
    section(
      "sponsor",
      `<div class="split"><h2>${lines(c.sponsorTitle)}</h2><p class="lead">${c.sponsorText}</p></div>`,
    ) +
    section(
      "brief",
      `<div class="split"><div><h2>${c.partnerChecklistTitle}</h2>${anchor(c.resourceDownload, `/downloads/createx-collaboration-${l}.txt`)}</div>${list(c.partnerChecklist)}</div>`,
    ) +
    cta(l)
  );
}
function governance(l: Language) {
  const c = copy[l];
  return (
    pageHero(l, "governance", c.governanceTitle, c.governanceIntro) +
    section(
      "structure",
      heading(
        "GOVERNANCE / V1.2",
        l === "zh"
          ? "渐进式治理的三层设计。"
          : "Three layers of a gradual governance design.",
      ) +
        cards(c.governanceLayers) +
        `<aside class="boundary">${c.governanceState}</aside>`,
    ) +
    section(
      "process",
      `<h2>${c.governanceProcess}</h2><p class="section-intro">${c.governanceProcessText}</p>`,
    ) +
    section(
      "contribution",
      `<div class="split"><h2>${c.contributionTitle}</h2><p class="lead">${c.contributionText}</p></div>`,
    ) +
    section(
      "mechanisms",
      `<div class="panel accent"><p class="eyebrow">DESIGN PROPOSAL / V1.2</p><h2>${c.tokenTitle}</h2><p>${c.tokenText}</p></div>`,
    ) +
    section(
      "ecosystem",
      `<div class="split"><h2>${lines(c.ecosystemTitle)}</h2><p class="lead">${c.ecosystemText}</p></div>`,
    ) +
    cta(l)
  );
}
const resourceSlugs = [
  "overview",
  "application",
  "chapter-checklist",
  "collaboration",
];
function resources(l: Language) {
  const c = copy[l];
  return (
    pageHero(l, "resources", c.resourcesTitle, c.resourcesIntro) +
    section(
      "downloads",
      `<h2>${l === "zh" ? "公开资料与模板" : "Public notes & templates"}</h2><div class="resource-list">${c.resources.map((r, i) => `<a class="resource-row" download href="/downloads/createx-${resourceSlugs[i]}-${l}.txt"><div><span class="eyebrow">${c.resourceFormat} / ${c.resourceDownload}</span><h3>${r[0]}</h3><p>${r[1]}</p></div><span class="download-icon" aria-hidden="true">↓</span></a>`).join("")}</div><p class="privacy-note">${c.sourceNote}</p>`,
    ) +
    section(
      "faq",
      `<h2>${c.faqTitle}</h2><div class="faq">${c.faq.map((r, i) => `<details id="faq-${i}"><summary>${r[0]}</summary><p>${r[1]}</p></details>`).join("")}</div>`,
    ) +
    cta(l)
  );
}
const renderers: Record<Page, (l: Language) => string> = {
  "": home,
  practice,
  chapters,
  join,
  partners,
  governance,
  resources,
};
function html(l: Language, p: Page, body: string, status404 = false) {
  const c = copy[l];
  const title = status404
    ? "404 · CreateX"
    : p
      ? `${c.nav[pages.indexOf(p)]} · CreateX`
      : `CreateX — ${c.title.replace("\n", " ")}`;
  const descriptions: Record<Page, string> = {
    "": c.description,
    practice: c.practiceIntro,
    chapters: c.chaptersIntro,
    join: c.joinIntro,
    partners: c.partnersIntro,
    governance: c.governanceIntro,
    resources: c.resourcesIntro,
  };
  const description = descriptions[p];
  return `<!doctype html><html lang="${c.lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="${esc(description)}"><meta name="theme-color" content="${brand.colors.paper}"><meta name="createx-version" content="${brand.version}"><title>${esc(title)}</title>${status404 ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${brand.origin}${url(l, p)}">${languages.map((x) => `<link rel="alternate" hreflang="${copy[x].lang}" href="${brand.origin}${url(x, p)}">`).join("")}<link rel="alternate" hreflang="x-default" href="${brand.origin}${url("en", p)}">`}<meta property="og:type" content="website"><meta property="og:site_name" content="CreateX"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${brand.origin}${url(l, p)}"><meta property="og:image" content="${brand.origin}/assets/social.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image"><link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/assets/styles.css"><script src="/assets/app.js" defer></script></head><body>${header(l, p)}<main id="main" tabindex="-1">${body}</main>${footer(l)}</body></html>`;
}
await rm(out, { recursive: true, force: true });
await mkdir(resolve(out, "assets"), { recursive: true });
await mkdir(resolve(out, "downloads"), { recursive: true });
for (const l of languages)
  for (const p of pages) {
    const dir = resolve(out, l, p);
    await mkdir(dir, { recursive: true });
    await writeFile(resolve(dir, "index.html"), html(l, p, renderers[p](l)));
  }
await writeFile(resolve(out, "index.html"), html("en", "", home("en")));
for (const [src, dest] of [
  ["styles.css", "assets/styles.css"],
  ["app.js", "assets/app.js"],
] as const)
  await writeFile(
    resolve(out, dest),
    await readFile(resolve(root, "src", src), "utf8"),
  );
await writeFile(
  resolve(out, "assets/tokens.css"),
  `:root{--brand-accent:${brand.colors.accent};--brand-paper:${brand.colors.paper};--brand-ink:${brand.colors.ink}}`,
);
await writeFile(
  resolve(out, "assets/favicon.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="4" fill="#1b201c"/><path d="M10 10l20 20M30 10L10 30M20 5v30M5 20h30" stroke="#e3542a" stroke-width="3"/></svg>`,
);
await writeFile(
  resolve(out, "assets/social.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#f4f1e9"/><text x="70" y="110" font-size="46" fill="#bc3b1c" font-family="Arial">CreateX</text><text x="70" y="310" font-size="102" fill="#1b201c" font-family="Arial">Make the future.</text><text x="70" y="425" font-size="102" fill="#bc3b1c" font-family="Arial">Together.</text><text x="75" y="550" font-size="23" fill="#585f55" font-family="Arial">REAL PROBLEMS / COLLECTIVE PRACTICE / LOCAL ROOTS</text></svg>`,
);
await sharp(resolve(out, "assets/social.svg"))
  .png()
  .toFile(resolve(out, "assets/social.png"));
for (const l of languages) {
  const c = copy[l];
  const text = [
    `${c.resources[0][0]}\n\n${c.description}\n\n${c.whyText}\n\n${c.homeSteps.map((r) => r.join(" — ")).join("\n")}\n\n${c.visionTitle}\n${c.visionNote}\n\n${c.tokenText}\n\n${c.ecosystemText}\n\n${c.sourceNote}`,
    `${c.resources[1][0]}\n\n${c.formIntro}\n\n${Object.values(c.fields)
      .map((x) => x + ": ____________________")
      .join("\n\n")}\n\n${c.joinBoundary}\n\n${c.privacy}`,
    `${c.resources[2][0]}\n\n${c.launchIntro}\n\n${c.chapterFunctions.map((r) => r.join(": ")).join("\n")}\n\n${c.startup.map((x) => "[ ] " + x).join("\n")}\n\n${c.launch.map((r) => r.join("\n")).join("\n\n")}\n\n${c.autonomyText}`,
    `${c.resources[3][0]}\n\n${c.partnersIntro}\n\n${c.partnerChecklist.map((x) => x + ": ____________________").join("\n\n")}\n\n${c.sponsorText}\n\n${c.joinBoundary}`,
  ];
  for (let i = 0; i < resourceSlugs.length; i++)
    await writeFile(
      resolve(out, `downloads/createx-${resourceSlugs[i]}-${l}.txt`),
      text[i] + "\n",
    );
}
const notFound = copy.en;
await writeFile(
  resolve(out, "404.html"),
  html(
    "en",
    "",
    `<section class="not-found container"><p class="eyebrow">CREATE X / 404</p><h1>404</h1><h2>${notFound.notFoundTitle}</h2><p>${notFound.notFoundText}</p>${anchor(notFound.home, url("en"), "button primary")}${anchor(copy.zh.home, url("zh"), "button secondary")}</section>`,
    true,
  ),
);
await writeFile(
  resolve(out, "robots.txt"),
  `User-agent: *\nAllow: /\nSitemap: ${brand.origin}/sitemap.xml\n`,
);
await writeFile(
  resolve(out, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${languages.flatMap((l) => pages.map((p) => `<url><loc>${brand.origin}${url(l, p)}</loc></url>`)).join("")}</urlset>`,
);
await writeFile(resolve(out, "_redirects"), "/ /en/ 302\n");
await writeFile(
  resolve(out, "_headers"),
  `/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: DENY\n  Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; form-action 'none'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n  X-CreateX-Version: ${brand.version}\n/assets/*\n  Cache-Control: public, max-age=3600\n/downloads/*\n  Content-Disposition: attachment\n`,
);
console.log(
  `Built ${languages.length * pages.length} localized pages, 8 public resources, and a custom 404 → ${out}`,
);
