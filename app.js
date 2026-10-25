(() => {
  "use strict";

  const GUIDES = window.GUIDES;
  const PRESETS = window.PRESETS;
  const MEASURES = window.MEASURES;
  const RACES = window.RACES;
  const GUIDE = Object.fromEntries(GUIDES.map((g) => [g.id, g]));
  // Supervisor races (ids D2, D4, …) get their own section and a district number for the address lookup.
  const supDistrict = (id) => (/^D\d+$/.test(id) ? Number(id.slice(1)) : null);
  const ITEMS = [
    ...MEASURES.map((m) => ({ ...m, kind: "measure" })),
    ...RACES.map((r) => ({ ...r, kind: "race", section: supDistrict(r.id) ? "supervisors" : "races", district: supDistrict(r.id) })),
  ];
  const ITEM = Object.fromEntries(ITEMS.map((i) => [i.id, i]));
  const SECTIONS = [
    { id: "local", title: "San Francisco Measures", blurb: "Local propositions A–J" },
    { id: "regional", title: "Regional Measure", blurb: "Bay Area transit funding" },
    { id: "supervisors", title: "Board of Supervisors", blurb: "Districts 2, 4, 6, 8, and 10 elect a supervisor this year" },
    { id: "races", title: "Other Local Races", blurb: "School boards, BART, and citywide offices" },
    { id: "state", title: "California Propositions", blurb: "Statewide measures (fewer local guides cover these)" },
  ];
  const ORDER = SECTIONS.flatMap((s) => ITEMS.filter((i) => i.section === s.id).map((i) => i.id));
  const POS_LABEL = { yes: "Yes", no: "No", neutral: "No position" };
  const POS_SHORT = { yes: "Y", no: "N", neutral: "–" };
  const ABBR = { spur: "SP", growsf: "GR", lwv: "LW", chron: "CH", sfbg: "BG", chamber: "CC", sda: "SD", gop: "R", green: "GN", dsa: "DS", sfdems: "D", yimby: "YI" };

  // ---------------------------------------------------------------- state
  const STORE_KEY = "sfvote-2026-11";
  const state = load();

  function load() {
    let s = {};
    try { s = JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { /* ignore */ }
    return {
      hidden: new Set(s.hidden || []),
      presets: s.presets || [],
      votes: s.votes || {},
      compare: s.compare || {},
      view: s.view || "position",
      district: s.district || null, // the voter's supervisor district from the address lookup (the address itself is never stored)
      allDistricts: !!s.allDistricts,
    };
  }
  function save() {
    localStorage.setItem(STORE_KEY, JSON.stringify({
      hidden: [...state.hidden], presets: state.presets, votes: state.votes, compare: state.compare, view: state.view,
      district: state.district, allDistricts: state.allDistricts,
    }));
    updateNavCount();
  }

  const activeGuides = () => GUIDES.filter((g) => !state.hidden.has(g.id));

  // ---------------------------------------------------------------- utils
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const lastName = (n) => n.replace(/\s*\(.*?\)\s*/g, " ").replace(/".*?"/g, "").trim().split(/\s+/).filter((w) => !/^(Jr\.?|III|II|,)$/.test(w.replace(/,$/, ""))).pop().replace(/,$/, "");
  const itemLabel = (i) => (i.kind === "race" ? i.title : (i.section === "state" ? `Prop ${i.id}` : i.id === "RTM" ? "RTM" : `Prop ${i.id}`));
  const badgeText = (i) => (i.kind === "race" ? i.id.replace("SFUSD", "SchBd").replace("CCSF-P", "CCSF*").replace("ASSESSOR", "Assr").replace("BART8", "BART") : i.id);
  const pagerLabel = (i) => (i.kind === "race" ? i.title : `${itemLabel(i)}: ${i.nickname}`);
  const ext = (url, text) => `<a class="src" href="${esc(url)}" target="_blank" rel="noopener">${esc(text)} ↗</a>`;

  function tally(m) {
    const t = { yes: 0, no: 0, neutral: 0, covered: 0 };
    for (const g of activeGuides()) {
      const p = m.positions[g.id];
      if (p) { t[p.p]++; t.covered++; }
    }
    return t;
  }

  function candidateCounts(r) {
    const counts = {};
    for (const g of activeGuides()) {
      const p = r.positions[g.id];
      if (!p) continue;
      for (const c of p.picks || []) counts[c] = (counts[c] || 0) + 1;
    }
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }

  function myVote(id) { return state.votes[id]; }
  function hasVote(id) {
    const v = state.votes[id];
    return Array.isArray(v) ? v.length > 0 : !!v;
  }

  function agrees(item, gid) {
    const v = state.votes[item.id];
    const p = item.positions[gid];
    if (!p || !v) return null;
    if (item.kind === "measure") {
      if (v === "neutral" || p.p === "neutral") return null;
      return v === p.p;
    }
    if (!v.length || !(p.picks || []).length) return null;
    return v.some((c) => p.picks.includes(c));
  }

  function agreement(gid) {
    let match = 0, total = 0;
    for (const i of ITEMS) {
      const a = agrees(i, gid);
      if (a === null) continue;
      total++; if (a) match++;
    }
    return { match, total, pct: total ? Math.round((100 * match) / total) : null };
  }

  function updateNavCount() {
    const n = ITEMS.filter((i) => hasVote(i.id)).length;
    $("#nav-count").textContent = n ? n : "";
  }

  // ---------------------------------------------------------------- shared bits
  function presetGuides(p) { return p.guides || GUIDES.map((g) => g.id); }

  const PRESET = Object.fromEntries(PRESETS.map((p) => [p.id, p]));
  const unionGuides = (ids) => new Set(ids.flatMap((id) => presetGuides(PRESET[id])));
  const sameSet = (a, b) => a.size === b.size && [...a].every((x) => b.has(x));

  // The perspectives currently in effect. Uses the saved multi-selection if it
  // still matches the visible guides; otherwise falls back to a single exact
  // match. An empty list means the user has a custom guide selection.
  function selectedPresets() {
    const active = new Set(activeGuides().map((g) => g.id));
    const saved = state.presets.filter((id) => PRESET[id]);
    if (saved.length && sameSet(unionGuides(saved), active)) return saved;
    const one = PRESETS.find((p) => sameSet(new Set(presetGuides(p)), active));
    return one ? [one.id] : [];
  }

  function applyPresets(ids) {
    state.presets = ids;
    const keep = unionGuides(ids);
    state.hidden = new Set(GUIDES.map((g) => g.id).filter((id) => !keep.has(id)));
  }

  function togglePreset(id) {
    let sel = selectedPresets().filter((x) => x !== "all");
    if (id === "all") sel = ["all"];
    else sel = sel.includes(id) ? sel.filter((x) => x !== id) : [...sel, id];
    applyPresets(sel.length ? sel : ["all"]);
  }

  function filterSummary() {
    const sel = selectedPresets();
    const n = activeGuides().length;
    const label = !sel.length ? " · Custom" : sel[0] === "all" ? "" : ` · ${sel.map((id) => PRESET[id].label).join(" + ")}`;
    return `Showing ${n} of ${GUIDES.length} guides${label}`;
  }

  function guideToggles() {
    const sel = selectedPresets();
    const desc = !sel.length ? "Your own selection."
      : sel.length === 1 ? esc(PRESET[sel[0]].desc)
      : `Combining ${sel.map((id) => `<b>${esc(PRESET[id].label)}</b>`).join(" + ")}.`;
    return `<div class="filter">
      <div class="filter-row">
        <span class="label">Perspective</span>
        <div class="presets" role="group" aria-label="Perspectives (select one or more)">${PRESETS.map((x) => `<button class="preset ${sel.includes(x.id) ? "on" : ""}" data-preset="${x.id}" aria-pressed="${sel.includes(x.id)}" title="${esc(x.desc)}">${x.id !== "all" && sel.includes(x.id) ? "✓ " : ""}${esc(x.label)}</button>`).join("")}
          ${!sel.length ? `<span class="preset on custom">Custom</span>` : ""}
          <span class="muted small">Select one or more</span></div>
      </div>
      <div class="filter-row">
        <span class="label">Guides</span>
        <div class="chips">${GUIDES.map((g) => `<span class="chip ${state.hidden.has(g.id) ? "off" : ""}" title="${esc(g.name)} · ${esc(g.kind)}">
          <label><input type="checkbox" data-toggle-guide="${g.id}" ${state.hidden.has(g.id) ? "" : "checked"}> ${esc(g.short)}</label>
          <button class="only" data-only-guide="${g.id}" title="Show only ${esc(g.name)}">only</button></span>`).join("")}
          <button class="btn ghost small" data-no-guides>Clear</button></div>
      </div>
      <p class="filter-desc">${desc} <span class="muted">Showing ${activeGuides().length} of ${GUIDES.length} guides. Groupings are approximate. The filter applies to tallies, the grid, and your agreement scores, and it's saved in this browser.</span></p>
    </div>`;
  }

  function compactFilter() {
    return `<details class="filter-compact"><summary>${filterSummary()} <span class="muted">· change</span></summary>${guideToggles()}</details>`;
  }

  function noGuidesNotice() {
    return activeGuides().length ? "" : `<div class="note">No guides are selected. Pick a perspective or check some guides above.</div>`;
  }

  function reasonCard(item, gid, opts = {}) {
    const g = GUIDE[gid];
    const p = item.positions[gid];
    if (!p) {
      return `<div class="reason ${opts.border ? "neutral" : ""}">
        <div class="reason-head"><span class="reason-guide">${esc(g.name)}</span></div>
        <p class="empty">Did not cover this ${item.kind === "race" ? "race" : "measure"}.</p>
        ${ext(g.url, "Guide")}
      </div>`;
    }
    const a = agrees(item, gid);
    let pos;
    if (item.kind === "measure") {
      pos = `<span class="pill ${p.p}">${POS_LABEL[p.p]}</span>`;
    } else {
      pos = (p.picks || []).length
        ? p.picks.map((c, i) => `<span class="pill pick">${item.rcv && p.picks.length > 1 ? `#${i + 1} ` : ""}${esc(c)}</span>`).join(" ")
        : `<span class="pill neutral">No endorsement</span>`;
      if ((p.against || []).length) pos += " " + p.against.map((c) => `<span class="pill no" style="text-transform:none;letter-spacing:0">Against ${esc(lastName(c))}</span>`).join(" ");
    }
    const border = opts.border ? (item.kind === "measure" ? p.p : (p.picks || []).length ? "pick" : "neutral") : "";
    return `<article class="reason ${border} ${a === true ? "agree" : ""}">
      <div class="reason-head">
        <div><span class="reason-guide">${esc(g.name)}</span><div class="reason-kind">${esc(g.kind)}</div></div>
        ${opts.showPos !== false ? `<div style="text-align:right">${pos}</div>` : ""}
      </div>
      ${p.s ? `<p>${esc(p.s)}</p>` : `<p class="empty">Position only — this guide didn't publish reasoning.</p>`}
      ${p.q ? `<blockquote>“${esc(p.q)}”</blockquote>` : ""}
      ${ext(p.u || g.url, p.s ? `Read ${g.short}'s full reasoning` : `${g.short} endorsement page`)}
      ${a === true ? `<div class="small muted" style="margin-top:6px">✓ Matches your pick</div>` : ""}
    </article>`;
  }

  function onlyPositionLine(item, gids) {
    if (!gids.length) return "";
    return `<div class="only-pos">Also: ${gids.map((id) => `<a href="${esc(item.positions[id].u || GUIDE[id].url)}" target="_blank" rel="noopener">${esc(GUIDE[id].short)}</a>`).join(", ")} <span>(position only, no published reasoning)</span></div>`;
  }

  function hiddenLine(m, k) {
    const hid = GUIDES.filter((g) => state.hidden.has(g.id) && m.positions[g.id] && m.positions[g.id].p === k);
    if (!hid.length) return "";
    return `<div class="hidden-line">+ ${hid.length} hidden guide${hid.length === 1 ? "" : "s"} on this side: ${hid.map((g) => esc(g.short)).join(", ")} · <button class="linkish" data-preset="all">show all guides</button></div>`;
  }

  function splitBar(t) {
    const total = t.yes + t.no + t.neutral || 1;
    return `<div class="split-bar" title="${t.yes} yes · ${t.no} no · ${t.neutral} no position">
      <span class="y" style="width:${(100 * t.yes) / total}%"></span><span class="u" style="width:${(100 * t.neutral) / total}%"></span><span class="n" style="width:${(100 * t.no) / total}%"></span></div>`;
  }

  // ---------------------------------------------------------------- views
  function viewBallot() {
    const days = Math.ceil((new Date("2026-11-03T20:00:00-08:00") - new Date()) / 86400000);
    const when = days > 1 ? `<span class="countdown">${days} days</span> until Election Day` : days === 1 ? `<span class="countdown">Tomorrow</span> is Election Day` : days === 0 ? `<span class="countdown">Today</span> is Election Day — polls close at 8 p.m.` : "Election Day has passed";
    let html = `<section class="hero">
      <div>
        <h1>See what every major guide recommends — and why.</h1>
        <p class="lede">${GUIDES.length} San Francisco voter guides, from SPUR and GrowSF to the League of Women Voters, the Chronicle, the Bay Guardian, and the major parties, lined up side by side. Open any measure to compare their reasoning, then click through to the original source.</p>
      </div>
      <div class="hero-side">
        <div>${when} · Tuesday, Nov 3</div>
        <ol>
          <li>Pick a measure or race below.</li>
          <li>Read the arguments for and against, or compare two guides directly.</li>
          <li>Record your choice. <a href="#/mine">My ballot</a> shows which guides you agree with most.</li>
        </ol>
      </div>
    </section>
    ${guideToggles()}
    ${noGuidesNotice()}`;

    for (const sec of SECTIONS) {
      const items = ITEMS.filter((i) => i.section === sec.id);
      const isRaces = sec.id === "races" || sec.id === "supervisors";
      const key = isRaces ? `<span class="muted small">${esc(sec.blurb)}</span>`
        : `<div class="dots votes key" aria-hidden="true">${activeGuides().map((g) => `<span class="dot key" title="${esc(g.name)}">${ABBR[g.id]}</span>`).join("")}</div>`;
      // Each section is its own container so its sticky header releases when the section ends.
      html += `<section class="ballot-section"><div class="section-head"><div><h2>${esc(sec.title)}</h2>${!isRaces ? `<span class="muted small">${esc(sec.blurb)} · hover a square to see the guide</span>` : ""}</div>${key}</div>`;
      if (sec.id === "supervisors") html += districtCallout();
      html += `<div class="item-list">`;
      for (const i of items) {
        if (sec.id === "supervisors" && state.district && !state.allDistricts && i.district !== state.district) continue;
        html += i.kind === "measure" ? measureRow(i) : raceRow(i);
      }
      html += `</div></section>`;
    }
    return html;
  }

  // ---------------------------------------------------------------- district lookup
  const ON_BALLOT = RACES.map((r) => supDistrict(r.id)).filter(Boolean);
  const lookup = { busy: false, error: "", matched: "", address: "" }; // address lives only in memory, to refill the field after an error

  function districtCallout() {
    const d = state.district;
    if (!d) {
      return `<form class="district-callout" data-district-form>
        <div class="dc-text"><strong>Which district am I?</strong> Enter your San Francisco address to see only your supervisor race.</div>
        <div class="dc-row">
          <input name="address" type="text" autocomplete="street-address" placeholder="e.g. 1 Dr Carlton B Goodlett Pl" aria-label="Your San Francisco street address" value="${esc(lookup.address)}" required ${lookup.busy ? "disabled" : ""}>
          <button class="btn primary" type="submit" ${lookup.busy ? "disabled" : ""}>${lookup.busy ? "Looking up…" : "Find my district"}</button>
        </div>
        ${lookup.error ? `<div class="dc-error">${esc(lookup.error)}</div>` : ""}
        <div class="dc-note">Your address is sent to the U.S. Census Bureau's address lookup (or OpenStreetMap if that fails) to find its location, then matched to the official district map in your browser. Only the district number is saved here. Near a district boundary, confirm with the <a href="https://www.sf.gov/departments/department-elections" target="_blank" rel="noopener">Department of Elections</a>.</div>
      </form>`;
    }
    const onBallot = ON_BALLOT.includes(d);
    return `<div class="district-callout found">
      <div class="dc-text"><strong>You're in Supervisor District ${d}.</strong>
        ${onBallot ? (state.allDistricts ? "Showing every district's race." : "Showing only your supervisor race.")
          : `District ${d} doesn't elect a supervisor this year, so there's no supervisor race on your ballot. Everything else on this page still applies to you.`}
        ${lookup.matched ? `<span class="muted small">Matched address: ${esc(lookup.matched)}</span>` : ""}</div>
      <div class="dc-actions">
        <button class="btn" data-all-districts>${state.allDistricts ? "Show only my district" : "Show all districts"}</button>
        <button class="btn ghost" data-change-district>Change address</button>
      </div>
    </div>`;
  }

  // Geocode with the Census Bureau (JSONP, since it sends no CORS headers), falling back to Nominatim.
  function censusGeocode(address) {
    return new Promise((resolve, reject) => {
      const cb = `__census${Date.now()}`;
      const script = document.createElement("script");
      const done = () => { delete window[cb]; script.remove(); clearTimeout(timer); };
      const timer = setTimeout(() => { done(); reject(new Error("timeout")); }, 10000);
      window[cb] = (data) => {
        done();
        const m = data && data.result && data.result.addressMatches && data.result.addressMatches[0];
        resolve(m ? { lat: m.coordinates.y, lon: m.coordinates.x, matched: m.matchedAddress } : null);
      };
      script.onerror = () => { done(); reject(new Error("network")); };
      script.src = `https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?benchmark=Public_AR_Current&format=jsonp&callback=${cb}&address=${encodeURIComponent(address)}`;
      document.head.appendChild(script);
    });
  }

  async function nominatimGeocode(address) {
    const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=us&bounded=1&viewbox=-122.53,37.84,-122.35,37.70&q=${encodeURIComponent(address)}`;
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    const [m] = await res.json();
    return m ? { lat: Number(m.lat), lon: Number(m.lon), matched: m.display_name } : null;
  }

  let districtsLoaded;
  function loadDistricts() {
    districtsLoaded = districtsLoaded || new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "districts.js";
      script.onload = () => resolve(window.SF_DISTRICTS);
      script.onerror = () => { districtsLoaded = null; reject(new Error("districts")); };
      document.head.appendChild(script);
    });
    return districtsLoaded;
  }

  // Even-odd ray casting across all of a district's rings (handles holes and multi-part districts).
  function inRings(lon, lat, rings) {
    let inside = false;
    for (const ring of rings) {
      for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
        const [xi, yi] = ring[i], [xj, yj] = ring[j];
        if ((yi > lat) !== (yj > lat) && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) inside = !inside;
      }
    }
    return inside;
  }

  async function findDistrict(raw) {
    // Add the city only when the person didn't give one (a comma or ZIP code usually means they did).
    const address = /,|san francisco|\bsf\b|\b9\d{4}\b/i.test(raw) ? raw : `${raw}, San Francisco, CA`;
    lookup.busy = true; lookup.error = ""; lookup.address = raw; rerender();
    try {
      const [districts, place] = await Promise.all([
        loadDistricts(),
        censusGeocode(address).catch(() => null).then((p) => p || nominatimGeocode(address).catch(() => null)),
      ]);
      if (!place) throw new Error("We couldn't find that address. Try the street number and name, e.g. \"123 Main St\".");
      const hit = districts.find((d) => inRings(place.lon, place.lat, d.rings));
      if (!hit) throw new Error("That address doesn't appear to be in San Francisco.");
      state.district = hit.d; state.allDistricts = false; lookup.matched = place.matched || ""; lookup.address = "";
      save();
    } catch (err) {
      lookup.error = err.message === "districts" ? "Couldn't load the district map. Check your connection and try again." : err.message;
    }
    lookup.busy = false;
    rerender();
  }

  function measureRow(m) {
    const t = tally(m);
    const v = myVote(m.id);
    const dots = activeGuides().map((g) => {
      const p = m.positions[g.id];
      const cls = p ? p.p : "none";
      return `<span class="dot ${cls}" title="${esc(g.name)}: ${p ? POS_LABEL[p.p] : "not covered"}">${p ? POS_SHORT[p.p] : ""}</span>`;
    }).join("");
    return `<a class="item-row" href="#/item/${m.id}">
      <div class="item-badge ${m.id.length > 2 ? "long" : ""}">${esc(m.id)}</div>
      <div class="item-main">
        <div class="item-title">${esc(m.nickname)}</div>
        <div class="item-sub">${esc(m.title)} · ${esc(m.type)}</div>
      </div>
      <div class="item-side">
        <div class="dots votes" aria-label="Guide positions">${dots}</div>
        <div class="tally"><b class="y">${t.yes} yes</b> · <b class="n">${t.no} no</b>${t.neutral ? ` · ${t.neutral} neutral` : ""}${v ? ` · <span class="my-tag">You: ${POS_LABEL[v]}</span>` : ""}</div>
      </div>
    </a>`;
  }

  function raceRow(r) {
    const counts = candidateCounts(r).slice(0, 4);
    const v = myVote(r.id) || [];
    return `<a class="item-row" href="#/item/${r.id}">
      <div class="item-badge long">${esc(badgeText(r))}</div>
      <div class="item-main">
        <div class="item-title">${esc(r.title)}</div>
        <div class="item-sub">${r.candidates.length} candidate${r.candidates.length > 1 ? "s" : ""}${r.seats > 1 ? ` · vote for ${r.seats}` : ""}${r.rcv && r.candidates.length > 1 ? " · ranked choice" : ""}</div>
      </div>
      <div class="item-side">
        <div class="dots">${counts.map(([c, n]) => `<span class="pill pick">${esc(lastName(c))} · ${n}</span>`).join("") || `<span class="muted small">No endorsements from shown guides</span>`}</div>
        ${v.length ? `<div class="tally"><span class="my-tag">You: ${v.map((c) => esc(lastName(c))).join(", ")}</span></div>` : ""}
      </div>
    </a>`;
  }

  function viewItem(id) {
    const item = ITEM[id];
    if (!item) return `<p>Not found. <a href="#/">Back to the ballot</a></p>`;
    const idx = ORDER.indexOf(id);
    const prev = ITEM[ORDER[idx - 1]], next = ITEM[ORDER[idx + 1]];
    const sec = SECTIONS.find((s) => s.id === item.section);
    const head = `<div class="crumbs"><a href="#/">← Back to the full ballot</a><span>${esc(sec.title)} · ${idx + 1} of ${ORDER.length}</span></div>`;
    const body = item.kind === "measure" ? measureDetail(item) : raceDetail(item);
    const pager = `<nav class="pager">
      ${prev ? `<a href="#/item/${prev.id}">← Previous<strong>${esc(pagerLabel(prev))}</strong></a>` : ""}
      ${next ? `<a class="next" href="#/item/${next.id}">Next →<strong>${esc(pagerLabel(next))}</strong></a>` : ""}
    </nav>`;
    return head + compactFilter() + noGuidesNotice() + body + pager;
  }

  function defaultCompare(item) {
    if (state.compare[item.id]) return state.compare[item.id].filter((g) => GUIDE[g]);
    const withReason = activeGuides().filter((g) => item.positions[g.id] && item.positions[g.id].s);
    if (item.kind === "measure") {
      const y = withReason.find((g) => item.positions[g.id].p === "yes");
      const n = withReason.find((g) => item.positions[g.id].p === "no");
      const picks = [y, n].filter(Boolean).map((g) => g.id);
      for (const g of withReason) if (picks.length < 2 && !picks.includes(g.id)) picks.push(g.id);
      return picks;
    }
    const seen = new Set(); const picks = [];
    for (const g of withReason) {
      const first = (item.positions[g.id].picks || [])[0] || "none";
      if (!seen.has(first)) { seen.add(first); picks.push(g.id); }
      if (picks.length === 3) break;
    }
    return picks;
  }

  function viewTabs(item) {
    const pos = item.kind === "measure" ? "By position" : "By candidate";
    return `<div class="view-tabs">
      <span class="label">View:</span>
      <div class="seg">
        <button class="${state.view === "position" ? "on plain" : ""}" data-view="position">${pos}</button>
        <button class="${state.view === "compare" ? "on plain" : ""}" data-view="compare">Compare guides side by side</button>
      </div>
    </div>`;
  }

  function compareView(item) {
    const sel = defaultCompare(item);
    const chips = GUIDES.map((g) => {
      const p = item.positions[g.id];
      const tag = !p ? " (n/a)" : item.kind === "measure" ? ` · ${POS_SHORT[p.p]}` : "";
      return `<label class="chip ${sel.includes(g.id) ? "" : "off"}"><input type="checkbox" data-compare="${g.id}" ${sel.includes(g.id) ? "checked" : ""}> ${esc(g.short)}${tag}</label>`;
    }).join("");
    return `<p class="muted small" style="margin:0 0 8px">Pick two or more guides to read their reasoning next to each other.</p>
      <div class="compare-pickers">${chips}</div>
      ${sel.length ? `<div class="compare-grid">${sel.map((gid) => reasonCard(item, gid, { border: true })).join("")}</div>` : `<p class="empty">Select guides above.</p>`}`;
  }

  function measureDetail(m) {
    const t = tally(m);
    const v = myVote(m.id);
    let html = `<div class="detail-head">
      <div class="detail-badge ${m.id.length > 2 ? "long" : ""}">${esc(m.id)}</div>
      <div>
        <div class="kicker">${esc(m.section === "state" ? "California Proposition" : m.section === "regional" ? "Regional Measure" : "San Francisco Proposition")} · ${esc(m.type)}</div>
        <h1>${esc(m.nickname)}</h1>
        <div class="muted">${esc(m.title)}</div>
      </div>
    </div>
    <div class="what-box">
      <h3>What it does</h3>
      <p>${esc(m.what)}</p>
      <div class="what-meta">
        <span>Description adapted from ${ext(m.whatSource.url, m.whatSource.label)}</span>
        ${(m.docs || []).map((d) => ext(d.url, `Official ${d.label.toLowerCase()}`)).join("")}
      </div>
    </div>
    <div class="vote-bar">
      <span class="q">How are you voting?</span>
      <div class="seg" role="group" aria-label="Your vote">
        ${["yes", "no", "neutral"].map((k) => `<button data-vote="${k}" class="${v === k ? "on " + k : ""}">${k === "neutral" ? "Undecided" : POS_LABEL[k]}</button>`).join("")}
      </div>
      <span class="muted small" style="margin-left:auto;display:flex;align-items:center;gap:10px">${splitBar(t)} ${t.yes} yes · ${t.no} no · ${t.neutral} neutral · ${activeGuides().length - t.covered} silent</span>
    </div>
    ${viewTabs(m)}`;

    if (state.view === "compare") return html + compareView(m);

    const groups = ["yes", "no", "neutral"].map((k) => {
      const gids = activeGuides().filter((g) => m.positions[g.id] && m.positions[g.id].p === k).map((g) => g.id);
      return { k, withR: gids.filter((id) => m.positions[id].s), only: gids.filter((id) => !m.positions[id].s), n: gids.length };
    }).filter((g) => g.k !== "neutral" || g.n);
    html += `<div class="cols n${groups.length}">` + groups.map((g) => `<section>
      <div class="col-head ${g.k}"><span>${g.k === "yes" ? "Arguments for YES" : g.k === "no" ? "Arguments for NO" : "Neutral / no position"}</span><span class="count">${g.n} guide${g.n === 1 ? "" : "s"}</span></div>
      <div class="col-body">
        ${g.withR.map((id) => reasonCard(m, id, { showPos: false })).join("") || (g.n ? "" : `<div class="empty">No guide shown recommends ${g.k.toUpperCase()}.</div>`)}
        ${onlyPositionLine(m, g.only)}
        ${hiddenLine(m, g.k)}
      </div></section>`).join("") + `</div>`;
    const silent = activeGuides().filter((g) => !m.positions[g.id]);
    if (silent.length) html += `<p class="muted small" style="margin-top:12px">Not covered by: ${silent.map((g) => esc(g.name)).join(", ")}.</p>`;
    return html;
  }

  function raceDetail(r) {
    const v = myVote(r.id) || [];
    const ag = activeGuides();
    let html = `<div class="detail-head">
      <div class="detail-badge long">${esc(badgeText(r))}</div>
      <div>
        <div class="kicker">Local race${r.seats > 1 ? ` · Vote for ${r.seats}` : ""}${r.rcv && r.candidates.length > 1 ? " · Ranked-choice voting" : ""}</div>
        <h1>${esc(r.title)}</h1>
        <div class="muted">${r.candidates.length} candidate${r.candidates.length > 1 ? "s" : ""} on the ballot</div>
      </div>
    </div>
    ${r.note ? `<div class="note">${esc(r.note)}</div>` : ""}
    <div class="what-box">
      <h3>Candidates · who endorses them</h3>
      <div class="cand-list">
        ${r.candidates.map((c) => {
          const pro = ag.filter((g) => r.positions[g.id] && (r.positions[g.id].picks || []).includes(c));
          const con = ag.filter((g) => r.positions[g.id] && (r.positions[g.id].against || []).includes(c));
          const mine = v.includes(c);
          return `<div class="cand ${mine ? "mine" : ""}">
            <div>
              <div class="cand-name">${esc(c)}${mine && r.rcv && v.length > 1 ? ` <span class="pill pick">Your #${v.indexOf(c) + 1}</span>` : ""}</div>
              <div class="cand-endorse">
                ${pro.map((g) => { const ps = r.positions[g.id].picks; const rank = r.rcv && ps.length > 1 ? ` #${ps.indexOf(c) + 1}` : ""; return `<span class="pill pick">${esc(g.short)}${rank}</span>`; }).join("")}
                ${con.map((g) => `<span class="pill no">${esc(g.short)} opposes</span>`).join("")}
                ${!pro.length && !con.length ? `<span class="muted small">No endorsements from the guides shown</span>` : ""}
              </div>
            </div>
            <div class="seg"><button data-pick="${esc(c)}" class="${mine ? "on plain" : ""}">${mine ? "✓ My pick" : "Pick"}</button></div>
          </div>`;
        }).join("")}
      </div>
      <div class="what-meta"><span>${r.rcv && r.candidates.length > 1 ? "Ranked choice: pick candidates in the order you'd rank them (up to 10)." : r.seats > 1 ? `Pick up to ${r.seats}.` : ""}</span><a href="https://www.sf.gov/candidates-november-3-2026-general-election" target="_blank" rel="noopener">Official candidate list ↗</a></div>
    </div>
    ${viewTabs(r)}`;

    if (state.view === "compare") return html + compareView(r);

    // Group guides by their first pick.
    const groups = new Map();
    const none = [];
    for (const g of ag) {
      const p = r.positions[g.id];
      if (!p) continue;
      const first = (p.picks || [])[0];
      if (!first) { none.push(g.id); continue; }
      if (!groups.has(first)) groups.set(first, []);
      groups.get(first).push(g.id);
    }
    const cols = [...groups.entries()].sort((a, b) => b[1].length - a[1].length);
    if (!cols.length && !none.length) return html + `<p class="empty">None of the guides shown cover this race.</p>`;
    const n = Math.min(3, cols.length + (none.length ? 1 : 0));
    html += `<div class="cols n${n}">`;
    for (const [cand, gids] of cols) {
      html += `<section><div class="col-head pick"><span>${r.seats > 1 ? "Slate led by " : ""}${esc(cand)}</span><span class="count">${gids.length} guide${gids.length === 1 ? "" : "s"}</span></div>
        <div class="col-body">${gids.filter((id) => r.positions[id].s).map((id) => reasonCard(r, id)).join("")}${onlyPositionLine(r, gids.filter((id) => !r.positions[id].s))}</div></section>`;
    }
    if (none.length) {
      html += `<section><div class="col-head neutral"><span>No endorsement</span><span class="count">${none.length}</span></div>
        <div class="col-body">${none.map((id) => reasonCard(r, id)).join("")}</div></section>`;
    }
    html += `</div>`;
    return html;
  }

  function viewMatrix() {
    const ag = activeGuides();
    const anyVotes = ITEMS.some((i) => hasVote(i.id));
    let html = `<h1>Every guide, every item</h1>
      <p class="lede">Each cell is a guide's recommendation. Click a cell to read that guide's reasoning, or a row name to open the full comparison.</p>
      ${guideToggles()}
      ${noGuidesNotice()}
      <div class="legend"><span><span class="dot yes">Y</span> Yes</span><span><span class="dot no">N</span> No</span><span><span class="dot neutral">–</span> Neutral / no position</span><span><span class="dot none"></span> Not covered</span>${anyVotes ? `<span>Outlined cells match your pick</span>` : ""}</div>
      <div class="matrix-wrap"><table class="matrix"><thead><tr><th class="rowhead">Measure / race</th>${anyVotes ? `<th class="me">You</th>` : ""}${ag.map((g) => `<th title="${esc(g.name)}"><a href="${esc(g.url)}" target="_blank" rel="noopener" style="text-decoration:none">${esc(g.short)}</a></th>`).join("")}</tr></thead><tbody>`;
    for (const sec of SECTIONS) {
      html += `<tr class="group"><th colspan="${ag.length + 1 + (anyVotes ? 1 : 0)}">${esc(sec.title)}</th></tr>`;
      for (const i of ITEMS.filter((x) => x.section === sec.id)) {
        html += `<tr><th><a href="#/item/${i.id}"><span class="id">${esc(i.kind === "race" ? badgeText(i) : i.id)}</span> ${esc(i.nickname || i.title)}</a></th>`;
        if (anyVotes) {
          const v = myVote(i.id);
          if (i.kind === "measure") html += v ? `<td class="me ${v}"><button data-cell="${i.id}|">${POS_SHORT[v]}</button></td>` : `<td class="me none">·</td>`;
          else html += v && v.length ? `<td class="me pick"><button>${v.map((c) => esc(lastName(c))).join(", ")}</button></td>` : `<td class="me none">·</td>`;
        }
        for (const g of ag) {
          const p = i.positions[g.id];
          const a = agrees(i, g.id) === true ? " agree" : "";
          if (!p) { html += `<td class="none">·</td>`; continue; }
          if (i.kind === "measure") html += `<td class="${p.p}${a}"><button data-cell="${i.id}|${g.id}" title="${esc(g.name)}: ${POS_LABEL[p.p]}">${POS_SHORT[p.p]}</button></td>`;
          else {
            const picks = p.picks || [];
            html += `<td class="${picks.length ? "pick" : "neutral"}${a}"><button data-cell="${i.id}|${g.id}" title="${esc(g.name)}">${picks.length ? picks.map((c) => esc(lastName(c))).join(", ") : "–"}</button></td>`;
          }
        }
        html += `</tr>`;
      }
    }
    html += `</tbody>`;
    if (anyVotes) {
      html += `<tfoot><tr><th>Agreement with you</th><td class="me"></td>${ag.map((g) => { const a = agreement(g.id); return `<td title="${a.match} of ${a.total}">${a.pct === null ? "–" : a.pct + "%"}</td>`; }).join("")}</tr></tfoot>`;
    }
    html += `</table></div>`;
    return html;
  }

  function viewGuides() {
    const anyVotes = ITEMS.some((i) => hasVote(i.id));
    return `<h1>The guides</h1>
      <p class="lede">Who's making these recommendations, and how much reasoning each one publishes. Choose a perspective or pick guides individually; your choice applies across the whole site.</p>
      ${guideToggles()}
      <div class="guide-grid">${GUIDES.map((g) => {
        const covered = ITEMS.filter((i) => i.positions[g.id]).length;
        const reasoned = ITEMS.filter((i) => i.positions[g.id] && i.positions[g.id].s).length;
        const a = agreement(g.id);
        return `<div class="guide-card">
          <div class="kind">${esc(g.kind)}</div>
          <h3>${esc(g.name)}</h3>
          <p>${esc(g.blurb)}</p>
          <div class="guide-stats"><span>Covers <b>${covered}</b> of ${ITEMS.length}</span><span>Reasoning on <b>${reasoned}</b></span><span>${esc(g.depth)}</span></div>
          ${anyVotes ? `<div><div class="small muted" style="margin-bottom:4px">Agrees with you: <b style="color:var(--ink)">${a.pct === null ? "—" : `${a.pct}%`}</b> ${a.total ? `(${a.match} of ${a.total})` : ""}</div><div class="meter"><span style="width:${a.pct || 0}%"></span></div></div>` : ""}
          <div class="guide-foot">
            <label class="chip ${state.hidden.has(g.id) ? "off" : ""}"><input type="checkbox" data-toggle-guide="${g.id}" ${state.hidden.has(g.id) ? "" : "checked"}> Show</label>
            <a class="btn" href="${esc(g.url)}" target="_blank" rel="noopener">Original guide ↗</a>
          </div>
        </div>`;
      }).join("")}</div>
      <p class="muted small" style="margin-top:22px">Coverage gaps: the Chronicle hadn't yet endorsed for Board of Education or the uncontested races, the SF Chamber's candidate endorsements are only in a PDF, and DSA SF is limited to items whose wording we could verify. Check those sources directly.</p>`;
  }

  function viewMine() {
    const voted = ORDER.map((id) => ITEM[id]).filter((i) => hasVote(i.id));
    if (!voted.length) {
      return `<div class="card cta"><h1>Your ballot is empty</h1><p class="lede" style="margin:10px auto 20px">Open a measure or race, read the arguments, and record your choice. Your picks are saved in this browser, and this page will show which guides you agree with most.</p><a class="btn primary" href="#/item/${ORDER[0]}">Start with Prop ${ORDER[0]} →</a></div>`;
    }
    const ag = activeGuides();
    const ranked = ag.map((g) => ({ g, a: agreement(g.id) })).filter((x) => x.a.total).sort((x, y) => y.a.pct - x.a.pct || y.a.total - x.a.total);
    const remaining = ORDER.filter((id) => !hasVote(id));
    return `<h1>My ballot</h1>
      <p class="lede">${voted.length} of ${ORDER.length} decided. Print this page and take it with you; you can bring notes into the voting booth.</p>
      <div class="toolbar"><button class="btn primary" data-print>Print</button><button class="btn" data-share>Copy share link</button><button class="btn ghost" data-clear>Clear all</button>
      ${remaining.length ? `<a class="btn ghost" href="#/item/${remaining[0]}">Next undecided: ${esc(itemLabel(ITEM[remaining[0]]))} →</a>` : ""}</div>
      <div class="mine-grid">
        <div class="card"><ul class="mine-list">${voted.map((i) => {
          const v = myVote(i.id);
          const with_ = ag.filter((g) => agrees(i, g.id) === true).map((g) => g.short);
          const against = ag.filter((g) => agrees(i, g.id) === false).map((g) => g.short);
          const choice = i.kind === "measure" ? `<span class="pill ${v}">${v === "neutral" ? "Undecided" : POS_LABEL[v]}</span>` : v.map((c, n) => `<span class="pill pick">${i.rcv && v.length > 1 ? `#${n + 1} ` : ""}${esc(c)}</span>`).join(" ");
          return `<li><span class="id">${esc(i.kind === "race" ? badgeText(i) : i.id)}</span>
            <div><a href="#/item/${i.id}">${esc(i.nickname || i.title)}</a>
              <div class="who">${with_.length ? `Same as: ${with_.join(", ")}` : ""}${with_.length && against.length ? " · " : ""}${against.length ? `Differs from: ${against.join(", ")}` : ""}</div></div>
            <div style="text-align:right">${choice}</div></li>`;
        }).join("")}</ul></div>
        <div class="card"><h2>Guides you agree with</h2>
          <p class="muted small" style="margin:4px 0 0">Share of your decided items where the guide took the same side (neutral positions are left out). ${filterSummary()} · <a href="#/guides">change</a></p>
          <ol class="rank">${ranked.map(({ g, a }) => `<li><div class="top"><span><b>${esc(g.name)}</b></span><span>${a.pct}% <span class="muted">(${a.match}/${a.total})</span></span></div><div class="meter"><span style="width:${a.pct}%"></span></div></li>`).join("") || `<li class="muted">Decide on a yes/no measure to see agreement.</li>`}</ol>
        </div>
      </div>`;
  }

  // ---------------------------------------------------------------- modal
  function openCell(itemId, gid) {
    const item = ITEM[itemId];
    if (!item || !gid) return;
    $("#modal-body").innerHTML = `<div class="kicker">${esc(itemLabel(item))}</div><h2 id="modal-title">${esc(item.nickname || item.title)}</h2>
      ${reasonCard(item, gid)}
      <div style="margin-top:16px;display:flex;gap:8px;flex-wrap:wrap"><a class="btn primary" href="#/item/${item.id}" data-close>Compare all guides on this →</a></div>`;
    $("#modal").hidden = false;
    $(".modal-x").focus();
  }
  function closeModal() { $("#modal").hidden = true; }

  // ---------------------------------------------------------------- router
  function route() {
    const h = location.hash.replace(/^#\/?/, "");
    const [path, query] = h.split("?");
    const parts = path.split("/").filter(Boolean);
    if (query && query.startsWith("v=")) importShare(query.slice(2));
    let html, nav = "ballot";
    if (parts[0] === "item") { html = viewItem(decodeURIComponent(parts[1] || "")); nav = ""; }
    else if (parts[0] === "matrix") { html = viewMatrix(); nav = "matrix"; }
    else if (parts[0] === "guides") { html = viewGuides(); nav = "guides"; }
    else if (parts[0] === "mine") { html = viewMine(); nav = "mine"; }
    else html = viewBallot();
    $("#app").innerHTML = html;
    $$(".nav a").forEach((a) => a.classList.toggle("active", a.dataset.nav === nav));
    const t = parts[0] === "item" && ITEM[parts[1]] ? `${itemLabel(ITEM[parts[1]])}: ${ITEM[parts[1]].nickname || ITEM[parts[1]].title} — ` : "";
    document.title = `${t}SF Ballot Compare — November 3, 2026`;
  }

  function rerender(keepFilterOpen) {
    const y = window.scrollY;
    const wasOpen = keepFilterOpen && $(".filter-compact") && $(".filter-compact").open;
    route();
    if (wasOpen) $(".filter-compact").open = true;
    window.scrollTo(0, y);
  }

  function importShare(code) {
    try {
      const votes = JSON.parse(decodeURIComponent(escape(atob(code))));
      if (votes && typeof votes === "object" && confirm("Load the ballot picks from this shared link? This replaces your current picks.")) {
        state.votes = votes; save();
      }
    } catch (e) { /* ignore bad links */ }
    history.replaceState(null, "", "#/mine");
  }

  // ---------------------------------------------------------------- events
  document.addEventListener("submit", (e) => {
    const form = e.target.closest("[data-district-form]");
    if (!form) return;
    e.preventDefault();
    const address = form.address.value.trim();
    if (address && !lookup.busy) findDistrict(address);
  });

  document.addEventListener("change", (e) => {
    const t = e.target;
    if (t.dataset.toggleGuide) {
      t.checked ? state.hidden.delete(t.dataset.toggleGuide) : state.hidden.add(t.dataset.toggleGuide);
      save(); rerender(true);
    } else if (t.dataset.compare) {
      const id = location.hash.split("/")[2];
      const item = ITEM[id];
      const cur = new Set(defaultCompare(item));
      t.checked ? cur.add(t.dataset.compare) : cur.delete(t.dataset.compare);
      state.compare[id] = GUIDES.map((g) => g.id).filter((g) => cur.has(g));
      save(); rerender();
    }
  });

  document.addEventListener("click", (e) => {
    const t = e.target.closest("button, a, [data-close]");
    if (!t) return;
    if (t.hasAttribute("data-close")) { closeModal(); return; }
    const id = location.hash.split("/")[2];
    if (t.dataset.preset) {
      togglePreset(t.dataset.preset);
      save(); rerender(true);
    } else if (t.dataset.onlyGuide) {
      state.hidden = new Set(GUIDES.map((g) => g.id).filter((id) => id !== t.dataset.onlyGuide));
      save(); rerender(true);
    } else if (t.dataset.noGuides !== undefined) {
      state.hidden = new Set(GUIDES.map((g) => g.id));
      save(); rerender(true);
    }
    else if (t.dataset.vote) {
      state.votes[id] = state.votes[id] === t.dataset.vote ? undefined : t.dataset.vote;
      if (!state.votes[id]) delete state.votes[id];
      save(); rerender();
    } else if (t.dataset.pick !== undefined) {
      const r = ITEM[id];
      let v = [...(state.votes[id] || [])];
      const c = t.dataset.pick;
      if (v.includes(c)) v = v.filter((x) => x !== c);
      else {
        const max = r.rcv ? 10 : r.seats;
        if (v.length >= max) v = r.seats === 1 && !r.rcv ? [] : v.slice(0, max - 1);
        v.push(c);
      }
      if (v.length) state.votes[id] = v; else delete state.votes[id];
      save(); rerender();
    } else if (t.hasAttribute("data-all-districts")) {
      state.allDistricts = !state.allDistricts; save(); rerender();
    } else if (t.hasAttribute("data-change-district")) {
      state.district = null; state.allDistricts = false; lookup.matched = ""; lookup.error = ""; lookup.address = ""; save(); rerender();
      $("[data-district-form] input")?.focus();
    } else if (t.dataset.view) { state.view = t.dataset.view; save(); rerender(); }
    else if (t.dataset.cell) { const [i, g] = t.dataset.cell.split("|"); openCell(i, g); }
    else if (t.hasAttribute("data-print")) window.print();
    else if (t.hasAttribute("data-clear")) { if (confirm("Clear all your picks?")) { state.votes = {}; save(); rerender(); } }
    else if (t.hasAttribute("data-share")) {
      const code = btoa(unescape(encodeURIComponent(JSON.stringify(state.votes))));
      const url = `${location.origin}${location.pathname}#/mine?v=${code}`;
      (navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject()).then(
        () => { t.textContent = "Link copied ✓"; },
        () => prompt("Copy this link:", url),
      );
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
    if (e.target.matches("input, textarea") || e.metaKey || e.ctrlKey || e.altKey) return;
    const parts = location.hash.split("/");
    if (parts[1] !== "item" || !$("#modal").hidden) return;
    const idx = ORDER.indexOf(parts[2]);
    if (e.key === "ArrowRight" && ORDER[idx + 1]) location.hash = `#/item/${ORDER[idx + 1]}`;
    if (e.key === "ArrowLeft" && idx > 0) location.hash = `#/item/${ORDER[idx - 1]}`;
  });

  window.addEventListener("hashchange", () => { closeModal(); route(); window.scrollTo(0, 0); });

  $("#collected").textContent = new Date(window.ELECTION.collected + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  // Keep sticky section headers just below the site header, whose height changes on narrow screens.
  const setHeaderHeight = () => document.documentElement.style.setProperty("--header-h", `${$(".site-header").offsetHeight}px`);
  new ResizeObserver(setHeaderHeight).observe($(".site-header"));
  setHeaderHeight();
  updateNavCount();
  route();
})();
