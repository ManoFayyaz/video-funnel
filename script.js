/* =========================================================
   1. TOOLS LIST
   name: label under the logo
   logo: path to the logo image. Leave "" to show a gold letter badge.
   The icons in /logos are original generic icons drawn in code.
   To use a client-supplied logo, drop the file into /logos and
   change the path here.
   ========================================================= */
const TOOLS = [
  { name: "Premiere Pro",    logo: "logos/timeline.svg" },
  { name: "After Effects",   logo: "logos/motion.svg" },
  { name: "DaVinci Resolve", logo: "logos/colour.svg" },
  { name: "CapCut",          logo: "logos/cut.svg" },
  { name: "Photoshop",       logo: "logos/layers.svg" },
  { name: "Final Cut Pro",   logo: "logos/clapper.svg" }
];  // Replace with the exact editing tools the manager lists if different

/* =========================================================
   2. CRYPTO ADDRESS lives in index.html (id="addr").
   The Copy button below reads whatever is written there.
   ========================================================= */

/* ---- Hero headline: wrap each word so it can rise in one by one ---- */
const title = document.getElementById("heroTitle");
title.innerHTML = title.textContent.trim().split(" ")
  .map((word, n) => `<span class="w" style="--n:${n}">${word}</span> `).join("");

/* ---- Build tool tiles ---- */
const grid = document.getElementById("toolGrid");
TOOLS.forEach((t, i) => {
  const visual = t.logo
    ? `<img class="tool-logo" src="${t.logo}" alt="${t.name} logo" style="--i:${i}">`
    : `<div class="tool-logo tool-badge" style="--i:${i}">${t.name.charAt(0)}</div>`;
  grid.insertAdjacentHTML("beforeend",
    `<div class="tool" style="--i:${i}">${visual}<span class="tool-name">${t.name}</span></div>`);
});

/* ---- Logos pop in one by one when the section scrolls into view ---- */
const toolObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    document.querySelectorAll(".tool").forEach(el => el.classList.add("show"));
    toolObserver.disconnect();            // play once only
  }
}, { threshold: 0.25 });
toolObserver.observe(grid);

/* ---- Payment steps: gold line fills as you scroll, dots light up ---- */
const steps = document.getElementById("steps");
function updateSteps() {
  const r = steps.getBoundingClientRect();
  const progress = (innerHeight * 0.6 - r.top) / r.height;      // 0 to 1
  const pct = Math.max(0, Math.min(1, progress)) * 100;
  steps.style.setProperty("--fill", pct + "%");
  steps.querySelectorAll("li").forEach((li, i, all) => {
    li.classList.toggle("on", pct >= (i / all.length) * 100 + 2);
  });
}
addEventListener("scroll", updateSteps, { passive: true });
updateSteps();

/* ---- Copy button ---- */
const copyBtn = document.getElementById("copyBtn");
copyBtn.addEventListener("click", async () => {
  const text = document.getElementById("addr").textContent.trim();
  try { await navigator.clipboard.writeText(text); copyBtn.textContent = "Copied"; }
  catch { copyBtn.textContent = "Press Ctrl+C"; }
  setTimeout(() => (copyBtn.textContent = "Copy"), 2000);
});

/* ---- Receipt email card: ticks check off one by one when visible ---- */
const mail = document.getElementById("mail");
mail.querySelectorAll(".tick").forEach((t, k) => t.style.setProperty("--k", k));
new IntersectionObserver((e, o) => {
  if (e[0].isIntersecting) { mail.classList.add("show"); o.disconnect(); }
}, { threshold: 0.4 }).observe(mail);
