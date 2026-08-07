/* ==========================================================================
   INNOVA HUB — render + interacciones
   Todo el contenido viene de data.js. Este archivo solo sabe cómo pintarlo.
   ========================================================================== */

/* ---------- Set de íconos (línea, minimal, un solo trazo) ---------- */
const ICON_PATHS = {
  cloud:
    '<path d="M7 18h10.5a4 4 0 0 0 .5-7.97A5.5 5.5 0 0 0 7.6 8.06 4.5 4.5 0 0 0 7 18Z"/>',
  lock:
    '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  search:
    '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  tool:
    '<path d="M14.7 6.3a4 4 0 0 1-5.1 5.1L5 16l3 3 4.6-4.6a4 4 0 0 1 5.1-5.1L21.1 6l-3-3-3.4 3.3Z"/>',
  route:
    '<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.4"/>',
  book:
    '<path d="M4.5 5.5A2.5 2.5 0 0 1 7 3h13v15H7a2.5 2.5 0 0 0-2.5 2.5v-15Z"/><path d="M4.5 20.5V18"/>',
  flask:
    '<path d="M9 3h6M10 3v5.7L4.6 18a2 2 0 0 0 1.8 3h11.2a2 2 0 0 0 1.8-3L14 8.7V3"/><path d="M7.5 14h9"/>',
  check:
    '<circle cx="12" cy="12" r="9"/><path d="m8 12.5 2.6 2.6L16 9.6"/>',
  chevron:
    '<path d="m6 9 6 6 6-6"/>',
  file:
    '<path d="M7 3.5h7l4 4v13H7v-17Z"/><path d="M14 3.5v4h4"/>',
  download:
    '<path d="M12 4v11m0 0 4-4m-4 4-4-4"/><path d="M5 19.5h14"/>',
  clock:
    '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/>',
};

function icon(name, cls) {
  const inner = ICON_PATHS[name] || "";
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" class="${cls || ""}">${inner}</svg>`;
}

/* ---------- Helpers ---------- */
const $ = (sel, ctx) => (ctx || document).querySelector(sel);
const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));
const el = (tag, cls, html) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
};

/* ==========================================================================
   MATERIALES
   ========================================================================== */
function materialItemHTML(m) {
  const isReady = m.status === "disponible";
  const badge = isReady
    ? `<span class="material-status material-status--ready">Disponible</span>`
    : `<span class="material-status material-status--pending">Próximamente</span>`;
  const action = isReady
    ? `<a class="material-download" href="${m.url}" download>${icon("download")}<span>Descargar</span></a>`
    : `<span class="material-download material-download--disabled">${icon("clock")}<span>Aún no cargado</span></span>`;
  return `
    <div class="material-item">
      <span class="material-file-icon">${icon("file")}</span>
      <div class="material-info">
        <div class="material-top-row">
          <b>${m.title}</b>
          ${badge}
        </div>
        <span class="material-type">${m.type}${m.description ? " · " + m.description : ""}</span>
      </div>
      ${action}
    </div>
  `;
}

function renderGeneralMaterials() {
  const grid = $("#generalMaterials");
  grid.innerHTML = "";
  GENERAL_MATERIALS.forEach((m) => {
    grid.insertAdjacentHTML("beforeend", materialItemHTML(m));
  });
}

function renderSupport() {
  $("#supportNote").textContent = SUPPORT.note;
  const btn = $("#supportEmailBtn");
  btn.href = `mailto:${SUPPORT.email}`;
  btn.textContent = SUPPORT.email;
}

/* ==========================================================================
   HERO
   ========================================================================== */
function renderHero() {
  $("#heroSubtitle").textContent = COURSE.subtitle;

  const badges = $("#heroBadges");
  badges.innerHTML = "";
  [COURSE.duration, COURSE.modality, COURSE.level].forEach((t, i) => {
    const b = el("span", "badge" + (i === 0 ? " badge--accent" : ""), t);
    badges.appendChild(b);
  });

  const strip = $("#statStrip");
  strip.innerHTML = "";
  COURSE.stats.forEach((s) => {
    const item = el(
      "div",
      "stat-item",
      `<div class="stat-value">${s.value}${s.suffix ? `<sup>${s.suffix}</sup>` : ""}</div>
       <div class="stat-label">${s.label}</div>`
    );
    strip.appendChild(item);
  });
}

/* ==========================================================================
   SOBRE EL CURSO
   ========================================================================== */
function renderAbout() {
  $("#generalObjective").textContent = COURSE.generalObjective;
  $("#audience").textContent = COURSE.audience;
  const list = $("#specificObjectives");
  list.innerHTML = "";
  COURSE.specificObjectives.forEach((o) => list.appendChild(el("li", "", o)));
}

/* ==========================================================================
   RUTA DE APRENDIZAJE (timeline + acordeón de unidades)
   ========================================================================== */
function renderTimeline() {
  const wrap = $("#timeline");
  wrap.innerHTML = "";
  UNITS.forEach((u) => {
    const node = el(
      "a",
      "timeline-node",
      `<div class="tn-icon">${icon(u.icon)}</div>
       <div class="tn-label">U${u.n} · ${u.hours}h</div>`
    );
    node.href = `#unit-${u.n}`;
    wrap.appendChild(node);
  });
}

function renderUnits() {
  const wrap = $("#unitsList");
  wrap.innerHTML = "";

  UNITS.forEach((u, idx) => {
    const card = el("div", "unit-card");
    card.id = `unit-${u.n}`;
    if (idx === 0) card.classList.add("is-open");

    const head = el(
      "button",
      "unit-head",
      `
      <span class="unit-num">${("0" + u.n).slice(-2)}</span>
      <span class="unit-icon">${icon(u.icon)}</span>
      <span class="unit-headline">
        <h3>${u.title}</h3>
        <p>${u.summary}</p>
      </span>
      <span class="unit-meta">
        <span class="badge">${u.hours} h</span>
        <span class="badge">${u.mode}</span>
      </span>
      <span class="unit-chevron">${icon("chevron")}</span>
    `
    );
    head.setAttribute("aria-expanded", idx === 0 ? "true" : "false");

    const body = el("div", "unit-body");
    const bodyInner = el("div", "unit-body-inner");
    const bodyContent = el("div", "unit-body-content");

    // Columna: objetivos + temas
    const colLeft = el("div", "unit-col");
    colLeft.appendChild(el("h4", "", "Objetivos de aprendizaje"));
    const objList = el("ul", "unit-obj-list");
    u.objectives.forEach((o) => objList.appendChild(el("li", "", o)));
    colLeft.appendChild(objList);

    if (u.topics && u.topics.length) {
      const topicsHeading = el("h4", "", "Temario");
      topicsHeading.style.marginTop = "22px";
      colLeft.appendChild(topicsHeading);
      u.topics.forEach((t) => {
        colLeft.appendChild(
          el("div", "topic-block", `<b>${t.title}</b><span>${t.body}</span>`)
        );
      });
    }

    // Columna: laboratorios
    const colRight = el("div", "unit-col");
    colRight.appendChild(el("h4", "", "Laboratorios"));
    u.labs.forEach((lab) => {
      const stepsHTML = lab.steps
        ? `<ol class="lab-steps">${lab.steps.map((s) => `<li>${s}</li>`).join("")}</ol>`
        : "";
      const toolsHTML = lab.tools
        ? `<div class="lab-tools">${lab.tools.map((t) => `<span>${t}</span>`).join("")}</div>`
        : "";
      colRight.appendChild(
        el(
          "div",
          "lab-card",
          `
        <div class="lab-title-row"><b>${lab.title}</b><span class="lab-time">${lab.time}</span></div>
        <p class="lab-objective">${lab.objective}</p>
        ${stepsHTML}
        ${toolsHTML}
      `
        )
      );
    });

    bodyContent.appendChild(colLeft);
    bodyContent.appendChild(colRight);
    bodyInner.appendChild(bodyContent);

    if (u.materials && u.materials.length) {
      const materialsBlock = el("div", "unit-materials");
      materialsBlock.appendChild(el("h4", "", "Materiales de la unidad"));
      const list = el("div", "unit-materials-list");
      u.materials.forEach((m) => list.insertAdjacentHTML("beforeend", materialItemHTML(m)));
      materialsBlock.appendChild(list);
      bodyInner.appendChild(materialsBlock);
    }

    body.appendChild(bodyInner);

    head.addEventListener("click", () => {
      const isOpen = card.classList.contains("is-open");
      card.classList.toggle("is-open", !isOpen);
      head.setAttribute("aria-expanded", String(!isOpen));
    });

    card.appendChild(head);
    card.appendChild(body);
    wrap.appendChild(card);
  });
}

/* ==========================================================================
   METODOLOGÍA — íconos de las tarjetas + stack de herramientas
   ========================================================================== */
function renderMethod() {
  $$(".method-icon").forEach((elm) => {
    elm.innerHTML = icon(elm.dataset.icon);
  });

  const grid = $("#toolsGrid");
  grid.innerHTML = "";
  TOOLS.forEach((t) => {
    grid.appendChild(
      el("div", "tool-chip", `<b>${t.name}</b><span>${t.group}</span>`)
    );
  });
}

/* ==========================================================================
   TABLAS COMPARATIVAS
   ========================================================================== */
function renderTable(mountId, data) {
  const mount = $(mountId);
  const theadCells = data.columns.map((c) => `<th>${c}</th>`).join("");
  const rows = data.rows
    .map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`)
    .join("");
  mount.innerHTML = `
    <table>
      <caption>${data.caption}</caption>
      <thead><tr>${theadCells}</tr></thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

/* ==========================================================================
   RECURSOS
   ========================================================================== */
function renderResources() {
  const grid = $("#resourcesGrid");
  grid.innerHTML = "";
  RESOURCES.forEach((group) => {
    const items = group.items.map((i) => `<li>${i}</li>`).join("");
    grid.appendChild(
      el("div", "resource-card", `<h3>${group.group}</h3><ul>${items}</ul>`)
    );
  });
}

/* ==========================================================================
   FAQ
   ========================================================================== */
function renderFAQ() {
  const wrap = $("#faqList");
  wrap.innerHTML = "";
  FAQS.forEach((f) => {
    const item = el("div", "faq-item");
    const q = el(
      "button",
      "faq-q",
      `<span>${f.q}</span><span class="faq-plus"></span>`
    );
    const a = el(
      "div",
      "faq-a",
      `<div class="faq-a-inner"><p>${f.a}</p></div>`
    );
    q.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");
      $$(".faq-item").forEach((i) => i.classList.remove("is-open"));
      item.classList.toggle("is-open", !isOpen);
    });
    item.appendChild(q);
    item.appendChild(a);
    wrap.appendChild(item);
  });
}

/* ==========================================================================
   Globo / red de nodos (elemento distintivo del hero)
   ========================================================================== */
function renderGlobe() {
  const svg = $("#globeSVG");
  const cx = 240, cy = 240, r = 170;
  const NS = "http://www.w3.org/2000/svg";

  const frag = document.createDocumentFragment();

  // círculo base
  const base = document.createElementNS(NS, "circle");
  base.setAttribute("cx", cx);
  base.setAttribute("cy", cy);
  base.setAttribute("r", r);
  base.setAttribute("fill", "none");
  base.setAttribute("stroke", "#D8E3E2");
  base.setAttribute("stroke-width", "1.4");
  frag.appendChild(base);

  // líneas de "meridianos" (elipses) para dar sensación de globo
  [0.98, 0.6, 0.22].forEach((rx) => {
    const ell = document.createElementNS(NS, "ellipse");
    ell.setAttribute("cx", cx);
    ell.setAttribute("cy", cy);
    ell.setAttribute("rx", r * rx);
    ell.setAttribute("ry", r);
    ell.setAttribute("fill", "none");
    ell.setAttribute("stroke", "#E2E9E8");
    ell.setAttribute("stroke-width", "1");
    frag.appendChild(ell);
  });
  const eq = document.createElementNS(NS, "ellipse");
  eq.setAttribute("cx", cx);
  eq.setAttribute("cy", cy);
  eq.setAttribute("rx", r);
  eq.setAttribute("ry", r * 0.32);
  eq.setAttribute("fill", "none");
  eq.setAttribute("stroke", "#E2E9E8");
  eq.setAttribute("stroke-width", "1");
  frag.appendChild(eq);

  // nodos distribuidos + arcos de conexión (representan "capacitación global")
  const nodes = [];
  const nodeCount = 8;
  for (let i = 0; i < nodeCount; i++) {
    const angle = (i / nodeCount) * Math.PI * 2 - Math.PI / 2;
    const rad = r * (0.62 + (i % 3) * 0.12);
    const x = cx + Math.cos(angle) * rad;
    const y = cy + Math.sin(angle) * rad * 0.55;
    nodes.push({ x, y });
  }

  // arcos entre nodos consecutivos (curva hacia el centro)
  nodes.forEach((n, i) => {
    const next = nodes[(i + 2) % nodes.length];
    const midX = (n.x + next.x) / 2;
    const midY = (n.y + next.y) / 2 - 26;
    const path = document.createElementNS(NS, "path");
    path.setAttribute("class", "globe-arc");
    path.setAttribute("d", `M${n.x},${n.y} Q${midX},${midY} ${next.x},${next.y}`);
    frag.appendChild(path);
  });

  // un par de arcos "pulso" animados en color ámbar
  [0, 3].forEach((startIdx) => {
    const n = nodes[startIdx];
    const next = nodes[(startIdx + 3) % nodes.length];
    const midX = (n.x + next.x) / 2;
    const midY = (n.y + next.y) / 2 - 26;
    const path = document.createElementNS(NS, "path");
    path.setAttribute("class", "globe-pulse");
    path.setAttribute("d", `M${n.x},${n.y} Q${midX},${midY} ${next.x},${next.y}`);
    path.setAttribute("stroke-dasharray", "6 14");
    frag.appendChild(path);
  });

  // puntos de nodo
  nodes.forEach((n, i) => {
    const dot = document.createElementNS(NS, "circle");
    dot.setAttribute("cx", n.x);
    dot.setAttribute("cy", n.y);
    dot.setAttribute("r", i % 3 === 0 ? 5 : 3.4);
    dot.setAttribute("class", i % 3 === 0 ? "globe-node globe-node--amber" : "globe-node");
    frag.appendChild(dot);
  });

  // isotipo Innova Hub al centro
  const img = document.createElementNS(NS, "image");
  img.setAttributeNS("http://www.w3.org/1999/xlink", "href", "../imagenes/Innova_Hub_isotipo.png");
  img.setAttribute("href", "../imagenes/Innova_Hub_isotipo.png");
  const logoSize = r * 0.62;
  img.setAttribute("x", cx - logoSize / 2);
  img.setAttribute("y", cy - logoSize / 2);
  img.setAttribute("width", logoSize);
  img.setAttribute("height", logoSize);
  frag.appendChild(img);

  svg.appendChild(frag);
}

/* ==========================================================================
   Interacciones varias: nav móvil, año, formulario
   ========================================================================== */
function bindMisc() {
  $("#year").textContent = new Date().getFullYear();

  const toggle = $("#navToggle");
  toggle.addEventListener("click", () => {
    const open = document.body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  $$(".main-nav a").forEach((a) =>
    a.addEventListener("click", () => document.body.classList.remove("nav-open"))
  );
}

/* ==========================================================================
   Init
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  renderHero();
  renderAbout();
  renderTimeline();
  renderUnits();
  renderGeneralMaterials();
  renderMethod();
  renderTable("#frameworksTable", FRAMEWORKS_COMPARISON);
  renderTable("#networkTable", NETWORK_COMPARISON);
  renderResources();
  renderFAQ();
  renderSupport();
  renderGlobe();
  bindMisc();
});