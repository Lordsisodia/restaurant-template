#!/usr/bin/env node
/**
 * Catalog images under the workspace's Images directory.
 * - Collects file metadata (size, dimensions, mime, orientation)
 * - Heuristically suggests categories and placements
 * - Emits JSON, CSV, and an HTML gallery for review
 */

import { execFileSync, execSync } from 'node:child_process';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const IMAGES_DIR = path.join(ROOT, 'Images');
const OUT_DIR = path.join(IMAGES_DIR, '_catalog');

const exts = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.heic']);

function existsSyncSafe(p) {
  try { execSync(`test -e ${JSON.stringify(p)}`); return true; } catch { return false; }
}

function which(cmd) {
  try { return execSync(`command -v ${cmd}`, { stdio: ['ignore','pipe','ignore'] }).toString().trim(); } catch { return null; }
}

const HAS_IDENTIFY = !!which('identify');
const HAS_SIPS = !!which('sips');

function statSizeBytes(p) {
  // mac: stat -f%z, linux: stat -c%s
  try { return parseInt(execSync(`stat -f%z ${JSON.stringify(p)}`).toString(), 10); } catch {}
  try { return parseInt(execSync(`stat -c%s ${JSON.stringify(p)}`).toString(), 10); } catch {}
  // fallback
  try { return parseInt(execSync(`wc -c < ${JSON.stringify(p)}`).toString(), 10); } catch {}
  return null;
}

function mimeFromExt(p) {
  const ext = path.extname(p).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.png') return 'image/png';
  if (ext === '.webp') return 'image/webp';
  if (ext === '.gif') return 'image/gif';
  if (ext === '.heic') return 'image/heic';
  return 'application/octet-stream';
}

function parseFileForDims(p) {
  try {
    const out = execSync(`file ${JSON.stringify(p)}`, { stdio: ['ignore','pipe','ignore'] }).toString();
    const m = out.match(/(\d{2,5})\s?[x×]\s?(\d{2,5})/);
    if (m) return { width: parseInt(m[1]), height: parseInt(m[2]) };
  } catch {}
  return null;
}

function getDimensions(p) {
  // Try ImageMagick identify
  if (HAS_IDENTIFY) {
    try {
      const out = execFileSync('identify', ['-ping', '-format', '%w %h', p], { stdio: ['ignore','pipe','ignore'] }).toString();
      const [w, h] = out.trim().split(/\s+/).map(Number);
      if (Number.isFinite(w) && Number.isFinite(h)) return { width: w, height: h };
    } catch {}
  }
  // Try macOS sips
  if (HAS_SIPS) {
    try {
      const out = execFileSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', p], { stdio: ['ignore','pipe','ignore'] }).toString();
      const wm = out.match(/pixelWidth:\s*(\d+)/);
      const hm = out.match(/pixelHeight:\s*(\d+)/);
      if (wm && hm) return { width: parseInt(wm[1], 10), height: parseInt(hm[1], 10) };
    } catch {}
  }
  // Fallback: parse `file` output
  return parseFileForDims(p);
}

async function walk(dir, acc = []) {
  const ents = await fs.readdir(dir, { withFileTypes: true });
  for (const e of ents) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === '_catalog') continue; // skip our output
      await walk(p, acc);
    } else if (e.isFile()) {
      const ext = path.extname(e.name).toLowerCase();
      if (exts.has(ext)) acc.push(p);
    }
  }
  return acc;
}

function orientationOf(w, h) {
  if (!w || !h) return 'unknown';
  const r = w / h;
  if (r > 1.3) return 'landscape';
  if (r < 0.77) return 'portrait';
  return 'square-ish';
}

function heroCandidate(w, h) {
  if (!w || !h) return false;
  return w >= 1920 && w / h >= 1.5;
}

const KEYWORDS = {
  map: [/\bmap[s]?\b/i, /google\s*maps/i, /staticmap/i],
  menu: [/\bmenu\b/i],
  logo: [/\blogo\b/i, /brand/i],
  hours: [/\bhours\b/i, /open/i, /closed/i, /sign/i],
  exterior: [/exterior/i, /outside/i, /storefront/i, /front\b/i],
  interior: [/interior/i, /inside\b/i, /bar\b/i, /seating/i, /table\b/i],
  food: [/food/i, /dish/i, /coffee/i, /latte/i, /espresso/i, /burger/i, /salad/i, /drink/i, /beverage/i, /dessert/i, /pastry/i],
  people: [/people/i, /staff/i, /chef/i],
};

function suggestCategory(filePath) {
  const base = path.basename(filePath);
  const lower = base.toLowerCase();
  const hits = [];
  for (const [k, pats] of Object.entries(KEYWORDS)) {
    if (pats.some(rx => rx.test(base))) hits.push(k);
  }
  if (hits.includes('logo')) return 'logo/branding';
  if (hits.includes('map')) return 'map-screenshot';
  if (hits.includes('menu')) return 'menu-screenshot';
  if (hits.includes('hours')) return 'signage-hours';
  if (hits.includes('food')) return 'food-drink';
  if (hits.includes('exterior')) return 'exterior';
  if (hits.includes('interior')) return 'interior';
  if (hits.includes('people')) return 'people/staff';
  // Saved pages often named "Screenshot ..." — content unknown
  if (/^screenshot\b/i.test(base)) return 'uncertain';
  return 'uncertain';
}

function placementSuggestions(meta) {
  const placements = [];
  if (heroCandidate(meta.width, meta.height)) placements.push('home-hero');
  if ((meta.width || 0) >= 1200) placements.push('gallery');
  if (meta.suggestedCategory === 'map-screenshot') placements.push('contact/location-section');
  if (meta.suggestedCategory === 'menu-screenshot' || meta.suggestedCategory === 'food-drink') placements.push('menu-page');
  if (meta.suggestedCategory === 'logo/branding') placements.push('header/footer/og-image');
  return placements;
}

function fmtBytes(n) {
  if (!Number.isFinite(n)) return '';
  const u = ['B','KB','MB','GB'];
  let i = 0; let v = n;
  while (v >= 1024 && i < u.length - 1) { v /= 1024; i++; }
  return `${v.toFixed(1)} ${u[i]}`;
}

async function main() {
  if (!existsSyncSafe(IMAGES_DIR)) {
    console.error(`Images directory not found at ${IMAGES_DIR}`);
    process.exit(1);
  }
  await fs.mkdir(OUT_DIR, { recursive: true });

  const files = await walk(IMAGES_DIR);
  files.sort();

  const rows = [];
  for (const f of files) {
    const size = statSizeBytes(f);
    const dim = getDimensions(f) || { width: null, height: null };
    const orientation = orientationOf(dim.width, dim.height);
    const suggestedCategory = suggestCategory(f);
    const meta = {
      path: path.relative(ROOT, f),
      file: path.basename(f),
      sizeBytes: size,
      size: fmtBytes(size),
      mime: mimeFromExt(f),
      width: dim.width,
      height: dim.height,
      orientation,
      suggestedCategory,
    };
    meta.placementSuggestions = placementSuggestions(meta);
    rows.push(meta);
  }

  // Write JSON
  const jsonPath = path.join(OUT_DIR, 'catalog.json');
  await fs.writeFile(jsonPath, JSON.stringify(rows, null, 2), 'utf8');

  // Write CSV
  const csvHead = ['path','file','sizeBytes','size','mime','width','height','orientation','suggestedCategory','placementSuggestions'];
  const csv = [csvHead.join(',')].concat(rows.map(r => [
    r.path,
    r.file,
    r.sizeBytes ?? '',
    r.size ?? '',
    r.mime ?? '',
    r.width ?? '',
    r.height ?? '',
    r.orientation ?? '',
    r.suggestedCategory ?? '',
    (r.placementSuggestions||[]).join('|'),
  ].map(v => String(v).replaceAll('"','""')).map(v => /[",\n]/.test(v) ? `"${v}"` : v).join(','))).join('\n');
  await fs.writeFile(path.join(OUT_DIR, 'catalog.csv'), csv + '\n', 'utf8');

  // Write HTML
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Images Catalog</title>
  <style>
    body { font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; margin: 16px; }
    header { display:flex; gap:12px; align-items:center; flex-wrap:wrap; }
    .grid { display:grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 14px; margin-top: 16px; }
    .card { border: 1px solid #ddd; border-radius: 8px; overflow:hidden; background:#fff; display:flex; flex-direction:column; }
    .thumb { aspect-ratio: 4/3; object-fit: cover; width: 100%; background:#f6f6f6; }
    .meta { padding: 8px 10px; font-size: 12px; color:#333; }
    .meta b { font-weight: 600; }
    .badge { display:inline-block; padding:2px 6px; border-radius: 999px; background:#f1f1f1; margin-right:6px; }
    .controls { display:flex; gap:8px; flex-wrap:wrap; align-items:center; }
    .footer { margin-top:20px; font-size:12px; color:#555; }
    input[type="search"], select { padding:6px 8px; font-size:14px; }
    button { padding:8px 12px; font-size:14px; cursor:pointer; }
    .sticky { position: sticky; top: 0; background: #fff; padding: 8px 0; z-index: 1; border-bottom: 1px solid #eee; }
  </style>
  <script>
    let DATA = [];
    async function init() {
      const res = await fetch('catalog.json?_=' + Date.now());
      DATA = await res.json();
      renderCards(DATA);
      populateFilters(DATA);
    }
    function populateFilters(rows){
      const cats = Array.from(new Set(rows.map(r => r.suggestedCategory))).sort();
      const sel = document.getElementById('filter-category');
      sel.innerHTML = '<option value="">All categories</option>' + cats.map(function(c){ return '<option>' + c + '</option>'; }).join('');
    }
    function matches(r, q, cat) {
      if (cat && r.suggestedCategory !== cat) return false;
      if (!q) return true;
      q = q.toLowerCase();
      return r.file.toLowerCase().includes(q) || r.path.toLowerCase().includes(q);
    }
    function renderCards(rows) {
      const q = document.getElementById('search').value.trim();
      const cat = document.getElementById('filter-category').value;
      const grid = document.getElementById('grid');
      grid.innerHTML = rows.filter(function(r){ return matches(r,q,cat); }).map(function(r){
        return (
          '<div class="card" data-path="' + r.path + '">' +
          '  <img class="thumb" src="' + thumbPath(r.path) + '" alt="' + r.file.replace(/"/g,'&quot;') + '" loading="lazy" onerror="this.style.display=\'none\'" />' +
          '  <div class="meta">' +
          '    <div><b>' + r.file + '</b></div>' +
          '    <div>' + (r.width || '?') + '×' + (r.height || '?') + ' • ' + r.orientation + ' • ' + (r.size || '') + '</div>' +
          '    <div>cat: <span class="badge">' + r.suggestedCategory + '</span></div>' +
          '    <div>placements: ' + (r.placementSuggestions||[]).map(function(p){ return '<span class="badge">' + p + '</span>'; }).join('') + '</div>' +
          '    <div style="margin-top:6px;">' +
          '      <label>Update category: <select onchange="updateCat(\'' + r.path.replace(/'/g,"\\'") + '\', this.value)">' +
          catOptions(r.suggestedCategory) +
          '      </select></label>' +
          '    </div>' +
          '  </div>' +
          '</div>'
        );
      }).join('');
    }
    function thumbPath(p){
      // Use the original image path relative to this HTML file
      const levelsUp = (location.pathname.split('/').length - 2) - (p.split('/').length - 1);
      // If catalog lives in Images/_catalog and p starts with Images/, strip prefix
      return p.startsWith('Images/') ? '../' + p.slice('Images/'.length) : p;
    }
    const CATEGORIES = [
      'interior','exterior','food-drink','menu-screenshot','map-screenshot','logo/branding','signage-hours','people/staff','uncertain'
    ];
    function catOptions(current){
      return CATEGORIES.map(function(c){ return '<option value="' + c + '" ' + (c===current?'selected':'') + '>' + c + '</option>'; }).join('');
    }
    function updateCat(p, c){
      const it = DATA.find(r => r.path === p);
      if (it) { it.suggestedCategory = c; it._edited = true; }
    }
    function exportJSON(){
      const blob = new Blob([JSON.stringify(DATA, null, 2)], {type:'application/json'});
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'catalog.edited.json';
      a.click();
      URL.revokeObjectURL(a.href);
    }
    function onFilterChange(){ renderCards(DATA); }
    window.addEventListener('DOMContentLoaded', init);
  </script>
  </head>
  <body>
    <header class="sticky">
      <div class="controls">
        <input id="search" type="search" placeholder="Search filename/path" oninput="onFilterChange()" />
        <select id="filter-category" onchange="onFilterChange()"></select>
        <button onclick="exportJSON()">Export JSON</button>
      </div>
    </header>
    <div id="grid" class="grid"></div>
    <div class="footer">Open this file locally in a browser. Use the per-card dropdown to adjust categories, then click Export JSON to save your edits.</div>
  </body>
</html>`;

  await fs.writeFile(path.join(OUT_DIR, 'index.html'), html, 'utf8');

  // README with quick instructions
  const readme = `# Images Catalog

Generated ${new Date().toISOString()}

Files:
- catalog.json — metadata and auto-suggested categories
- catalog.csv — spreadsheet-friendly export
- index.html — open locally to browse, tweak categories, and export an edited JSON

Notes:
- Suggestions are filename-based. Please eyeball and adjust in the HTML.
- Avoid publishing raw Google Maps screenshots or third-party photos without permission.
`;
  await fs.writeFile(path.join(OUT_DIR, 'README.md'), readme, 'utf8');

  console.log(`Catalog written to: ${path.relative(ROOT, OUT_DIR)}`);
}

main().catch(err => { console.error(err); process.exit(1); });
