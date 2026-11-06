// Builds src/data/asia-map.json (SVG country paths) from world-atlas countries-50m.json
// Usage: node scripts/build-asia-map.mjs <path-to-countries-50m.json>
import fs from 'node:fs';
const topo = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const [sx, sy] = topo.transform.scale, [tx, ty] = topo.transform.translate;
const arcs = topo.arcs.map((a) => { let x = 0, y = 0; return a.map(([dx, dy]) => { x += dx; y += dy; return [x * sx + tx, y * sy + ty]; }); });
const ring = (idx) => idx.flatMap((i) => (i >= 0 ? arcs[i] : [...arcs[~i]].reverse()));
const LON0 = 67, LON1 = 107, LAT0 = -1, LAT1 = 37, K = 26, C = Math.cos(20 * Math.PI / 180);
const px = (lon, lat) => [(lon - LON0) * K * C, (LAT1 - lat) * K];
const W = Math.round((LON1 - LON0) * K * C), H = Math.round((LAT1 - LAT0) * K);
const f = (n) => Math.round(n * 10) / 10;
const countries = [];
for (const g of topo.objects.countries.geometries) {
  const polys = g.type === 'Polygon' ? [g.arcs] : g.type === 'MultiPolygon' ? g.arcs : [];
  let d = '', hit = false;
  for (const poly of polys) for (const r of poly) {
    const pts = ring(r);
    if (!pts.some(([lo, la]) => lo > LON0 - 3 && lo < LON1 + 3 && la > LAT0 - 3 && la < LAT1 + 3)) continue;
    hit = true;
    let last = null;
    const out = [];
    for (const [lo, la] of pts) { const [x, y] = px(lo, la); const p = `${f(x)} ${f(y)}`; if (p !== last) out.push(p); last = p; }
    if (out.length > 2) d += 'M' + out.join('L') + 'Z';
  }
  if (hit && d) countries.push({ name: g.properties.name, d });
}
const cities = {
  PBH: ['Paro', 89.42, 27.40], DEL: ['Delhi', 77.10, 28.56], KTM: ['Kathmandu', 85.36, 27.70], BOM: ['Mumbai', 72.87, 19.09],
  CCU: ['Kolkata', 88.45, 22.65], IXB: ['Bagdogra', 88.33, 26.68], GAU: ['Guwahati', 91.59, 26.10], DAC: ['Dhaka', 90.41, 23.84],
  GAY: ['Gaya (Bodhgaya)', 84.95, 24.74], BKK: ['Bangkok', 100.75, 13.69], SIN: ['Singapore', 103.99, 1.36],
};
const pts = Object.fromEntries(Object.entries(cities).map(([c, [n, lo, la]]) => { const [x, y] = px(lo, la); return [c, { name: n, x: f(x), y: f(y) }]; }));
fs.writeFileSync('src/data/asia-map.json', JSON.stringify({ width: W, height: H, countries, cities: pts }));
console.log(W, H, countries.length, 'countries', fs.statSync('src/data/asia-map.json').size, 'bytes');
