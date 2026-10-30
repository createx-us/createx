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
const logo =
  '<img class="brand-logo" src="/assets/createx-logo.webp" width="108" height="72" alt="CreateX">';
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
function heroArtwork(l: Language) {
  return `<div class="brand-artwork"><img src="/assets/createx-co-creation.webp" width="1536" height="1024" alt="${l === "zh" ? "概念插画：不同背景的人在城市开放空间一起制作社区原型" : "Concept illustration: people from different backgrounds build a community prototype together in an open city space"}" fetchpriority="high"><div class="artwork-caption"><span>${l === "zh" ? "城市共创 · 概念插画" : "Co-creation · concept illustration"}</span><span>${l === "zh" ? "每一种可能，都始于连接。" : "Every possibility begins with a connection."}</span></div></div>`;
}
function header(l: Language, p: Page) {
  const c = copy[l],
    other = l === "en" ? "zh" : "en";
  return `<a class="skip-link" href="#main">${c.skip}</a><header class="site-header"><div class="header-inner"><a class="brand" href="${url(l)}" aria-label="CreateX ${c.nav[0]}">${logo}</a><nav class="desktop-nav" aria-label="${l === "zh" ? "主导航" : "Main navigation"}">${(["practice", "chapters", "partners", "resources"] as Page[]).map((x) => `<a class="nav-link" href="${url(l, x)}"${x === p ? ' aria-current="page"' : ""}>${esc(c.nav[pages.indexOf(x)])}</a>`).join("")}</nav><div class="header-actions"><a class="language-switch" data-language-switch href="${url(other, p)}" lang="${copy[other].lang}" hreflang="${copy[other].lang}" aria-label="${l === "en" ? "切换为中文" : "Switch to English"}">${c.other}</a>${anchor(c.join, url(l, "join"), "button primary")}<button class="menu-toggle" data-menu-toggle aria-controls="mobile-nav" aria-expanded="false" aria-label="${c.menu}" data-open="${c.menu}" data-close="${c.close}">☰</button></div></div><nav class="mobile-nav" id="mobile-nav" hidden aria-label="${l === "zh" ? "手机导航" : "Mobile navigation"}">${pages.map((x, i) => `<a href="${url(l, x)}"${x === p ? ' aria-current="page"' : ""}>${esc(c.nav[i])}</a>`).join("")}</nav><noscript><nav class="nojs-nav container" aria-label="${l === "zh" ? "备用导航" : "Navigation without JavaScript"}">${pages.map((x, i) => `<a href="${url(l, x)}">${esc(c.nav[i])}</a>`).join("")}</nav></noscript></header>`;
}
function footer(l: Language) {
  const c = copy[l];
  return `<footer class="site-footer"><div class="container"><div class="footer-top"><div class="footer-brand"><a class="brand" href="${url(l)}" aria-label="CreateX">${logo}</a><p>${c.footerText}</p><p>${c.footerNote}</p></div><nav class="footer-links" aria-label="${l === "zh" ? "页脚导航" : "Footer navigation"}">${pages
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
    ["explore", "Find a community", "找到社区"],
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
  return `<section class="hero container" id="top"><div class="hero-copy"><p class="eyebrow">${c.eyebrow}</p><h1>${lines(c.title)}</h1><p>${c.description}</p><div class="hero-actions">${anchor(l === "zh" ? "找到本地社区" : "Find your local community", url(l, "chapters") + "#explore", "button primary")}${anchor(c.explore, url(l, "practice"))}</div><p class="hero-note">${c.heroNote}</p></div><figure class="hero-visual">${heroArtwork(l)}</figure></section><nav class="brand-path container" aria-label="${l === "zh" ? "探索 CreateX" : "Explore CreateX"}"><a href="#why"><span>01 / WHY</span><strong>${l === "zh" ? "为什么，一起创造" : "Why we create together"}</strong></a><a href="#practice"><span>02 / HOW</span><strong>${l === "zh" ? "从想法，走向实践" : "From ideas to practice"}</strong></a><a href="#cities"><span>03 / WHERE</span><strong>${l === "zh" ? "扎根本地，连接彼此" : "Local roots, shared learning"}</strong></a></nav>${section("why", heading(c.whyLabel, c.whyTitle) + `<div class="split"><p class="lead">${c.whyText}</p><div class="panel accent"><p class="eyebrow">INFORMATION × SPACE × RELATIONSHIP</p><h3>${l === "zh" ? "让知识、空间与关系，形成持续的创新现场。" : "Knowledge, space, and relationships—a place for possibility to take shape."}</h3><p>${c.heroNote}</p></div></div><div class="principles">${c.principles.map((r, i) => `<article class="principle"><span class="step-number">0${i + 1}</span><h3>${r[0]}</h3><p>${r[1]}</p></article>`).join("")}</div>`)}${section("practice", heading(c.howLabel, c.howTitle, c.howText) + `<div class="path">${c.homeSteps.map((r, i) => `<article class="path-step"><span class="step-number">0${i + 1}</span><h3>${r[0]}</h3><p>${r[1]}</p></article>`).join("")}</div>${anchor(c.explore, url(l, "practice"))}`)}${section("cities", heading(c.cityLabel, c.cityTitle, c.cityText) + `<div class="panel dark"><p class="eyebrow">${c.vision}</p><h2>${lines(c.visionTitle)}</h2><p>${c.visionNote}</p>${anchor(c.cityLink, url(l, "chapters"))}</div>`)}${section("roles", heading(c.rolesLabel, c.rolesTitle, c.rolesText) + roleList(l) + anchor(c.viewRoles, url(l, "join")))}${cta(l)}`;
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
function communityFinder(l: Language) {
  const zh = l === "zh";
  return section(
    "explore",
    `<div class="community-finder" data-community-finder data-lang="${l}"><p class="eyebrow">LOCAL COMMUNITY / GIS</p><h2>${zh ? "找到你的城市，一起回应真实问题。" : "Find your city. Work on a real challenge together."}</h2><p>${zh ? "搜索城市，查看已核实的开放社区。没有列出的城市也可以准备筹建意向；地理位置不代表社区已经成立。" : "Search a city for verified, open communities. If none is listed, prepare an interest note to help start one. A city location is not evidence of an established chapter."}</p><form class="city-search" data-city-search><label for="city-search">${zh ? "城市名称（中文或英文）" : "City name (Chinese or English)"}</label><div><input id="city-search" name="city" list="city-options" placeholder="${zh ? "例如：上海 / Chicago" : "e.g. Shanghai / Chicago"}" maxlength="100" required><button class="button primary" type="submit">${zh ? "查找社区" : "Find communities"}</button></div><datalist id="city-options"><option value="上海 / Shanghai"><option value="北京 / Beijing"><option value="广州 / Guangzhou"><option value="深圳 / Shenzhen"><option value="杭州 / Hangzhou"><option value="成都 / Chengdu"><option value="芝加哥 / Chicago"><option value="纽约 / New York"><option value="旧金山 / San Francisco"><option value="伦敦 / London"><option value="新加坡 / Singapore"></datalist></form><div class="community-results" data-community-results role="status" aria-live="polite"></div><div class="map-controls"><button class="button secondary" type="button" data-load-map>${zh ? "打开互动地图" : "Open interactive map"}</button><p class="privacy-note">${zh ? "地图按需加载 OpenStreetMap 底图，会连接外部地图服务；不请求或记录你的设备定位。列表查找无需地图。" : "The optional map loads OpenStreetMap tiles from an external service. We do not request or store device location. City search works without loading the map."}</p></div><div class="community-map" id="community-map" hidden aria-label="${zh ? "城市与社区地图" : "City and community map"}" tabindex="0"></div><p class="privacy-note" data-map-status></p><noscript><p>${zh ? "请启用 JavaScript 使用城市查找，或前往加入页下载意向模板。" : "Enable JavaScript for city search, or use the interest template on the join page."}</p></noscript></div>`,
  );
}
function chapters(l: Language) {
  const c = copy[l];
  return (
    pageHero(l, "chapters", c.chaptersTitle, c.chaptersIntro) +
    communityFinder(l) +
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
  return `<!doctype html><html lang="${c.lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="${esc(description)}"><meta name="theme-color" content="${brand.colors.paper}"><meta name="createx-version" content="${brand.version}"><title>${esc(title)}</title>${status404 ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${brand.origin}${url(l, p)}">${languages.map((x) => `<link rel="alternate" hreflang="${copy[x].lang}" href="${brand.origin}${url(x, p)}">`).join("")}<link rel="alternate" hreflang="x-default" href="${brand.origin}${url("en", p)}">`}<meta property="og:type" content="website"><meta property="og:site_name" content="CreateX"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${brand.origin}${url(l, p)}"><meta property="og:image" content="${brand.origin}/assets/social.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image"><link rel="icon" href="/assets/favicon.png" type="image/png"><link rel="stylesheet" href="/assets/styles.css?v=${brand.version}"><script src="/assets/app.js" defer></script>${p === "chapters" ? '<link rel="stylesheet" href="/assets/leaflet.css"><script src="/assets/leaflet.js" defer></script><script src="/assets/community.js" defer></script>' : ""}</head><body>${header(l, p)}<main id="main" tabindex="-1">${body}</main>${footer(l)}</body></html>`;
}
await rm(out, { recursive: true, force: true });
await mkdir(resolve(out, "assets"), { recursive: true });
await mkdir(resolve(out, "downloads"), { recursive: true });
await mkdir(resolve(out, "data"), { recursive: true });
await writeFile(
  resolve(out, "data/communities.json"),
  await readFile(resolve(root, "src/data/communities.json")),
);
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
  resolve(out, "assets/leaflet.js"),
  await readFile(resolve(root, "../../node_modules/leaflet/dist/leaflet.js")),
);
await writeFile(
  resolve(out, "assets/leaflet.css"),
  await readFile(resolve(root, "../../node_modules/leaflet/dist/leaflet.css")),
);
await writeFile(
  resolve(out, "assets/community.js"),
  await readFile(resolve(root, "src/community.js")),
);
await writeFile(
  resolve(out, "assets/tokens.css"),
  `:root{--brand-accent:${brand.colors.accent};--brand-paper:${brand.colors.paper};--brand-ink:${brand.colors.ink}}`,
);
await sharp(resolve(root, "src/assets/createx-co-creation.png"))
  .resize({ width: 1536, withoutEnlargement: true })
  .webp({ quality: 88 })
  .toFile(resolve(out, "assets/createx-co-creation.webp"));
const logoSource = resolve(
  root,
  "../../packages/brand/assets/createx-logo-original.png",
);
await sharp(logoSource)
  .trim()
  .webp({ quality: 92 })
  .toFile(resolve(out, "assets/createx-logo.webp"));
// Crop the actual X artwork for small browser tabs; no substitute mark is drawn.
await sharp(logoSource)
  .extract({ left: 775, top: 125, width: 635, height: 720 })
  .resize(128, 128, { fit: "contain", background: "#fafaf7" })
  .png()
  .toFile(resolve(out, "assets/favicon.png"));
const socialBackdrop = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#fafaf7"/><text x="64" y="148" font-size="46" fill="#005c7a" font-family="Arial" font-weight="bold">CreateX</text><text x="64" y="276" font-size="54" fill="#005c7a" font-family="Arial">Make the future.</text><text x="64" y="346" font-size="54" fill="#005c7a" font-family="Arial">Together.</text><text x="64" y="500" font-size="19" fill="#4f686e" font-family="Arial">REAL PROBLEMS. SHARED PRACTICE.</text></svg>`,
);
const socialLogo = await sharp(logoSource).resize(560, 374).png().toBuffer();
await sharp(socialBackdrop)
  .composite([{ input: socialLogo, left: 600, top: 130 }])
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
  `/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: DENY\n  Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data: https://tile.openstreetmap.org; form-action 'none'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n  X-CreateX-Version: ${brand.version}\n/assets/*\n  Cache-Control: public, max-age=3600\n/downloads/*\n  Content-Disposition: attachment\n`,
);
console.log(
  `Built ${languages.length * pages.length} localized pages, 8 public resources, and a custom 404 → ${out}`,
);
