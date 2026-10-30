/* Optional GIS. No device location or public geocoding requests. */
const finder = document.querySelector("[data-community-finder]");
if (finder) {
  const zh = finder.dataset.lang === "zh";
  const results = finder.querySelector("[data-community-results]");
  const mapStatus = finder.querySelector("[data-map-status]");
  const cityInput = finder.querySelector("#city-search");
  const cities = [
    ["上海", "Shanghai", 31.2304, 121.4737],
    ["北京", "Beijing", 39.9042, 116.4074],
    ["广州", "Guangzhou", 23.1291, 113.2644],
    ["深圳", "Shenzhen", 22.5431, 114.0579],
    ["杭州", "Hangzhou", 30.2741, 120.1551],
    ["成都", "Chengdu", 30.5728, 104.0668],
    ["芝加哥", "Chicago", 41.8781, -87.6298],
    ["纽约", "New York", 40.7128, -74.006],
    ["旧金山", "San Francisco", 37.7749, -122.4194],
    ["伦敦", "London", 51.5074, -0.1278],
    ["新加坡", "Singapore", 1.3521, 103.8198],
  ];
  let communities = [],
    map,
    markerLayer,
    selectedCity = "";
  const L = window.L;
  const text = (tag, value) => {
    const e = document.createElement(tag);
    e.textContent = value;
    return e;
  };
  const safeURL = (value) => {
    try {
      const u = new URL(value);
      return u.protocol === "https:" ? u.href : null;
    } catch {
      return null;
    }
  };
  function render() {
    results.replaceChildren();
    const query = selectedCity.toLocaleLowerCase().trim();
    const city = cities.find((c) =>
      c.slice(0, 2).some((n) => query.includes(n.toLocaleLowerCase())),
    );
    const matches = communities.filter(
      (c) =>
        !query ||
        [c.city, c.name, c.name_en].some(
          (n) => n && n.toLocaleLowerCase().includes(query),
        ) ||
        (city &&
          [city[0], city[1]].some((n) =>
            (c.city || "").toLowerCase().includes(n.toLowerCase()),
          )),
    );
    if (matches.length) {
      results.append(
        text("h3", zh ? "已核实的开放社区" : "Verified open communities"),
      );
      for (const c of matches) {
        const card = document.createElement("article");
        card.className = "community-card";
        card.append(
          text("h3", zh ? c.name : c.name_en || c.name),
          text("p", c.city),
          text("p", c.summary || ""),
        );
        const href = safeURL(c.contact_url);
        if (href) {
          const a = text("a", zh ? "联系本地社区" : "Contact this community");
          a.href = href;
          a.className = "button primary";
          a.rel = "noopener noreferrer";
          card.append(a);
        }
        results.append(card);
      }
    } else {
      results.append(
        text(
          "h3",
          selectedCity
            ? `${selectedCity} · ${zh ? "尚无已核实的公开社区" : "No verified public community listed"}`
            : zh
              ? "先选择你的城市"
              : "Start with your city",
        ),
      );
      results.append(
        text(
          "p",
          zh
            ? "目前发布目录尚未确认可公开加入的社区。你可以准备筹建或参与意向，与已认识的组织者确认联系渠道；这不是报名成功或城市授权。"
            : "The published directory does not yet confirm a community you can join here. Prepare an interest note and confirm a channel with an organizer you know. This is not a successful registration or city authorization.",
        ),
      );
      const a = text(
        "a",
        zh ? "准备本地共建意向" : "Prepare a local interest note",
      );
      a.href = `/${zh ? "zh" : "en"}/join/?city=${encodeURIComponent(selectedCity)}&intent=chapter#application`;
      a.className = "button primary";
      results.append(a);
    }
    if (map && city) map.setView([city[2], city[3]], 9);
    if (map && !city && selectedCity)
      mapStatus.textContent = zh
        ? "此城市不在离线定位目录中；仍可填写意向，未猜测坐标。"
        : "This city is not in the offline location index. You can still prepare an interest note; coordinates were not guessed.";
    if (markerLayer) {
      markerLayer.clearLayers();
      for (const c of communities)
        if (Number.isFinite(c.lat) && Number.isFinite(c.lng)) {
          const label = text("span", `${c.name} · ${c.city}`);
          L.circleMarker([c.lat, c.lng], {
            radius: 8,
            color: "#005c7a",
            fillColor: "#009f9d",
            fillOpacity: 0.9,
          })
            .bindPopup(label)
            .addTo(markerLayer);
        }
    }
  }
  finder.querySelector("[data-city-search]").addEventListener("submit", (e) => {
    e.preventDefault();
    selectedCity = cityInput.value.trim().slice(0, 100);
    render();
  });
  finder.querySelector("[data-load-map]").addEventListener("click", () => {
    const area = finder.querySelector("#community-map");
    area.hidden = false;
    if (!map && L) {
      map = L.map(area, { scrollWheelZoom: false }).setView([25, 15], 2);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      })
        .on("tileerror", () => {
          mapStatus.textContent = zh
            ? "底图暂时无法加载，城市列表仍可使用。"
            : "Map tiles could not load. City search remains available.";
        })
        .addTo(map);
      markerLayer = L.layerGroup().addTo(map);
      render();
    }
    if (!L)
      mapStatus.textContent = zh
        ? "地图组件不可用，请使用上方城市查找。"
        : "The map component is unavailable. Use city search above.";
  });
  async function load() {
    try {
      let r = await fetch("/api/public/communities");
      if (!r.ok || !r.headers.get("content-type")?.includes("application/json"))
        r = await fetch("/data/communities.json");
      if (!r.ok) throw Error("directory");
      const data = await r.json();
      communities = (data.communities || []).filter(
        (c) =>
          c.status === "active" &&
          c.verified === true &&
          safeURL(c.contact_url),
      );
      render();
    } catch {
      render();
      mapStatus.textContent = zh
        ? "暂时无法读取最新目录，请稍后再试。"
        : "The directory is temporarily unavailable. Please try again later.";
    }
  }
  render();
  load();
}
