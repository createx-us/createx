/* Progressive enhancement only. No network requests, cookies, or local storage. */
const menuButton = document.querySelector("[data-menu-toggle]");
const mobileNav = document.getElementById("mobile-nav");
function closeMenu(restoreFocus = false) {
  if (!menuButton || !mobileNav) return;
  mobileNav.hidden = true;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute(
    "aria-label",
    menuButton.getAttribute("data-open") || "Menu",
  );
  menuButton.textContent = "☰";
  if (restoreFocus) menuButton.focus();
}
menuButton?.addEventListener("click", () => {
  if (!mobileNav) return;
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  mobileNav.hidden = isOpen;
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute(
    "aria-label",
    menuButton.getAttribute(isOpen ? "data-open" : "data-close") || "Menu",
  );
  menuButton.textContent = isOpen ? "☰" : "×";
});
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuButton?.getAttribute("aria-expanded") === "true"
  )
    closeMenu(true);
});
mobileNav?.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});
window.matchMedia("(min-width: 901px)").addEventListener("change", (event) => {
  if (event.matches) closeMenu();
});
for (const link of document.querySelectorAll("[data-language-switch]")) {
  const destination = link.getAttribute("href");
  const update = () => {
    link.setAttribute("href", destination + window.location.hash);
  };
  update();
  window.addEventListener("hashchange", update);
}
const form = document.querySelector("[data-application]");
if (form) {
  const status = form.querySelector('[role="status"]');
  const result = form.querySelector(".draft-result");
  let draftURL = null;
  function clearDraft() {
    if (draftURL) URL.revokeObjectURL(draftURL);
    draftURL = null;
    result.replaceChildren();
    status.textContent = "";
  }
  form.addEventListener("input", clearDraft);
  window.addEventListener("pagehide", clearDraft);
  for (const choice of document.querySelectorAll("[data-role-key]")) {
    choice.addEventListener("click", () => {
      clearDraft();
      form.elements.namedItem("role").value = choice.dataset.roleKey;
    });
  }
  form.addEventListener(
    "invalid",
    () => {
      status.textContent = form.dataset.error;
    },
    true,
  );
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    for (const name of ["city", "time", "challenge"]) {
      if (!String(data.get(name) || "").trim()) {
        status.textContent = form.dataset.error;
        form.elements.namedItem(name).focus();
        return;
      }
    }
    const entries = [
      "CreateX — " +
        (form.dataset.language === "zh"
          ? "加入意向草稿（尚未发送）"
          : "Interest draft (not sent)"),
      "",
    ];
    for (const control of form.querySelectorAll("input, select, textarea")) {
      const label =
        form.querySelector('label[for="' + control.id + '"]')?.textContent ||
        control.name;
      const value =
        control.tagName === "SELECT"
          ? control.options[control.selectedIndex].text
          : control.value.trim();
      entries.push(label + ":", value || "—", "");
    }
    entries.push(form.querySelector(".privacy-note").textContent);
    const blob = new Blob(["\uFEFF" + entries.join("\n")], {
      type: "text/plain;charset=utf-8",
    });
    clearDraft();
    draftURL = URL.createObjectURL(blob);
    const download = document.createElement("a");
    download.href = draftURL;
    download.download = "createx-interest-" + form.dataset.language + ".txt";
    download.className = "button primary";
    download.textContent = form.dataset.save;
    result.append(download);
    status.textContent = form.dataset.success;
  });
  form.addEventListener("reset", clearDraft);
  form.querySelector("fieldset").disabled = false;
  form.querySelector('[type="submit"]').disabled = false;
}

// A shared FAQ fragment opens the answer, including after a language switch.
function revealFragment() {
  const target = document.getElementById(window.location.hash.slice(1));
  if (target?.tagName === "DETAILS") target.open = true;
}
revealFragment();
window.addEventListener("hashchange", revealFragment);

// A GIS interest handoff prefills only the local draft; it is never sent silently.
if (form) {
  const params = new URLSearchParams(window.location.search);
  const city = params.get("city");
  if (city) form.elements.namedItem("city").value = city.slice(0, 100);
  if (params.get("intent") === "chapter")
    form.elements.namedItem("role").value = "2";
}
