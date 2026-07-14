/*!
 * PolygonPatterns. SVG hatch/fill patterns for MapLibre GL JS polygons.
 *
 * Generates SVG patterns via textures.js (https://github.com/riccardoscalco/textures),
 * renders them to canvas, and registers them as MapLibre GL images for use
 * with `fill-pattern`.
 *
 * Usage:
 *   const patterns = new PolygonPatterns(map, { prewarmOnLoad: true });
 *   await patterns.ensure('lines-default', '#c65b2e');
 *   patterns.applyToLayer('my-polygon-layer');
 *
 *   // Or use expression helpers directly:
 *   map.addLayer({
 *     id: 'my-polygons',
 *     type: 'fill',
 *     source: 'my-source',
 *     paint: {
 *       'fill-pattern': patterns.buildFillPatternExpr(),
 *       'fill-opacity': patterns.buildFillOpacityExpr(0.8),
 *     },
 *   });
 */

import textures from "textures";
import { select } from "d3-selection";

const PATTERNS = [
  { id: "lines-default", factory: (c) => textures.lines().size(10).stroke(c) },
  { id: "lines-heavier", factory: (c) => textures.lines().size(10).heavier().stroke(c) },
  { id: "lines-lighter", factory: (c) => textures.lines().size(10).lighter().stroke(c) },
  { id: "lines-thicker", factory: (c) => textures.lines().size(10).thicker().stroke(c) },
  { id: "lines-thinner", factory: (c) => textures.lines().size(10).thinner().stroke(c) },
  {
    id: "lines-heavy-thin",
    factory: (c) => textures.lines().size(10).heavier(10).thinner(1.5).stroke(c),
  },
  { id: "lines-tiny", factory: (c) => textures.lines().size(2).strokeWidth(1).stroke(c) },
  { id: "lines-small", factory: (c) => textures.lines().size(4).strokeWidth(2).stroke(c) },
  {
    id: "lines-vertical-crisp",
    factory: (c) =>
      textures
        .lines()
        .size(10)
        .orientation("vertical")
        .strokeWidth(1)
        .shapeRendering("crispEdges")
        .stroke(c),
  },
  {
    id: "lines-steep",
    factory: (c) => textures.lines().size(10).orientation("3/8").stroke(c),
  },
  {
    id: "lines-crossed",
    factory: (c) => textures.lines().size(10).orientation("3/8", "7/8").stroke(c),
  },
  {
    id: "lines-grid-crisp",
    factory: (c) =>
      textures
        .lines()
        .orientation("vertical", "horizontal")
        .size(2)
        .strokeWidth(1)
        .shapeRendering("crispEdges")
        .stroke(c),
  },
  { id: "circles-default", factory: (c) => textures.circles().size(10).fill(c).stroke(c) },
  {
    id: "circles-heavier",
    factory: (c) => textures.circles().size(10).heavier().fill(c).stroke(c),
  },
  {
    id: "circles-lighter",
    factory: (c) => textures.circles().size(10).lighter().fill(c).stroke(c),
  },
  {
    id: "circles-thicker",
    factory: (c) => textures.circles().size(10).thicker().fill(c).stroke(c),
  },
  {
    id: "circles-thinner",
    factory: (c) => textures.circles().size(10).thinner().fill(c).stroke(c),
  },
  { id: "circles-size5", factory: (c) => textures.circles().size(3).fill(c).stroke(c) },
  {
    id: "circles-radius4",
    factory: (c) => textures.circles().size(10).radius(4).fill(c).stroke(c),
  },
  {
    id: "circles-radius4-thin",
    factory: (c) =>
      textures.circles().size(10).radius(4).fill("transparent").strokeWidth(2).stroke(c),
  },
  {
    id: "circles-small-fill",
    factory: (c) => textures.circles().size(5).radius(2).fill(c).stroke(c),
  },
  {
    id: "paths-hexagons",
    factory: (c) => textures.paths().d("hexagons").size(4).strokeWidth(2).stroke(c),
  },
  {
    id: "paths-crosses",
    factory: (c) => textures.paths().d("crosses").size(10).lighter().thicker().stroke(c),
  },
  {
    id: "paths-caps",
    factory: (c) => textures.paths().d("caps").size(10).lighter().thicker().stroke(c),
  },
  {
    id: "paths-woven",
    factory: (c) => textures.paths().d("woven").size(10).lighter().thicker().stroke(c),
  },
  { id: "paths-waves", factory: (c) => textures.paths().d("waves").size(10).thicker().stroke(c) },
  {
    id: "paths-nylon",
    factory: (c) =>
      textures.paths().d("nylon").size(10).lighter().shapeRendering("crispEdges").stroke(c),
  },
  { id: "paths-squares", factory: (c) => textures.paths().d("squares").size(10).stroke(c) },
];

const TILE_SIZES = {
  "lines-default": { w: 10, h: 10 },
  "lines-heavier": { w: 10, h: 10 },
  "lines-lighter": { w: 10, h: 10 },
  "lines-thicker": { w: 5, h: 5 },
  "lines-thinner": { w: 20, h: 20 },
  "lines-heavy-thin": { w: 30, h: 30 },
  "lines-tiny": { w: 2, h: 2 },
  "lines-small": { w: 4, h: 4 },
  "lines-vertical-crisp": { w: 10, h: 10 },
  "lines-steep": { w: 10, h: 10 },
  "lines-crossed": { w: 10, h: 10 },
  "lines-grid-crisp": { w: 2, h: 2 },
  "circles-default": { w: 10, h: 10 },
  "circles-heavier": { w: 10, h: 10 },
  "circles-lighter": { w: 10, h: 10 },
  "circles-thicker": { w: 5, h: 5 },
  "circles-thinner": { w: 20, h: 20 },
  "circles-size5": { w: 3, h: 3 },
  "circles-radius4": { w: 10, h: 10 },
  "circles-radius4-thin": { w: 10, h: 10 },
  "circles-small-fill": { w: 5, h: 5 },
  "paths-hexagons": { w: 12, h: 6.928 },
  "paths-crosses": { w: 10, h: 10 },
  "paths-caps": { w: 10, h: 10 },
  "paths-woven": { w: 10, h: 10 },
  "paths-waves": { w: 10, h: 10 },
  "paths-nylon": { w: 10, h: 10 },
  "paths-squares": { w: 10, h: 10 },
};

const PATTERN_SCALE = 4;

const DEFAULTS = {
  imagePrefix: "maplibre-pattern",
  dummyPatternId: "maplibre-pattern-dummy",
  prewarmOnLoad: true,
  prewarmColor: "#333333",
  patterns: PATTERNS,
  tileSizes: TILE_SIZES,
  propertyPrefix: "geoglify",
};

function normalizeColor(color) {
  return color.replace("#", "").toLowerCase();
}

function getPatternImageName(prefix, patternId, color) {
  return prefix + "-" + patternId + "-" + normalizeColor(color);
}

class PolygonPatterns {
  constructor(map, options = {}) {
    if (!map) throw new Error("PolygonPatterns: a MapLibre GL `map` instance is required");
    this.map = map;
    this.opts = Object.assign({}, DEFAULTS, options);
    this._cache = new Map();
    this._ready = false;

    this._setup = this._setup.bind(this);

    if (map.isStyleLoaded()) {
      this._setup();
    } else {
      map.once("load", this._setup);
    }
  }

  _setup() {
    this._addDummyPattern();
    if (this.opts.prewarmOnLoad) {
      this.prewarm(this.opts.prewarmColor);
    }
    this._ready = true;
  }

  _addDummyPattern() {
    const name = this.opts.dummyPatternId;
    if (this.map.hasImage(name)) return;

    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 1, 1);
    this.map.addImage(name, ctx.getImageData(0, 0, 1, 1), { pixelRatio: 1 });
  }

  async _generate(patternId, color) {
    const patternDef = this._getPatternById(patternId);
    if (!patternDef) throw new Error("Unknown pattern: " + patternId);

    const t = patternDef.factory(color);
    const tile = this.opts.tileSizes[patternId] || { w: 10, h: 10 };
    const name = this.getImageName(patternId, color);

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", tile.w);
    svg.setAttribute("height", tile.h);
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

    const sel = select(svg);
    sel.call(t);
    sel
      .append("rect")
      .attr("width", tile.w)
      .attr("height", tile.h)
      .attr("fill", "url(#" + t.id() + ")");

    const svgBlob = new Blob([svg.outerHTML], { type: "image/svg+xml" });
    const blobUrl = URL.createObjectURL(svgBlob);

    const img = await new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = blobUrl;
    });
    URL.revokeObjectURL(blobUrl);

    const canvas = document.createElement("canvas");
    canvas.width = Math.round(tile.w * PATTERN_SCALE);
    canvas.height = Math.round(tile.h * PATTERN_SCALE);
    const ctx = canvas.getContext("2d");
    ctx.scale(PATTERN_SCALE, PATTERN_SCALE);
    ctx.drawImage(img, 0, 0, tile.w, tile.h);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const options = { pixelRatio: PATTERN_SCALE };

    if (this.map.hasImage(name)) {
      this.map.updateImage(name, imageData, options);
    } else {
      this.map.addImage(name, imageData, options);
    }

    return name;
  }

  _cacheKey(patternId, color) {
    return patternId + "-" + normalizeColor(color);
  }

  getImageName(patternId, color) {
    return getPatternImageName(this.opts.imagePrefix, patternId, color);
  }

  _getPatternById(id) {
    return this.opts.patterns.find((p) => p.id === id);
  }

  randomPatternId() {
    const patterns = this.opts.patterns;
    return patterns[Math.floor(Math.random() * patterns.length)].id;
  }

  async ensure(patternId, color) {
    const key = this._cacheKey(patternId, color);
    const cached = this._cache.get(key);
    if (cached) return cached;

    const promise = this._generate(patternId, color).catch((err) => {
      this._cache.delete(key);
      throw err;
    });
    this._cache.set(key, promise);
    return promise;
  }

  async prewarm(color) {
    const c = color || this.opts.prewarmColor;
    try {
      await Promise.all(this.opts.patterns.map((p) => this.ensure(p.id, c)));
    } catch {
      // prewarm is opportunistic — failures are non-critical
    }
  }

  buildFillPatternExpr() {
    const prefix = this.opts.imagePrefix;
    const dummy = this.opts.dummyPatternId;
    const propPrefix = this.opts.propertyPrefix;

    return [
      "case",
      ["boolean", ["get", propPrefix + ":patternEnabled"], false],
      [
        "concat",
        prefix + "-",
        ["get", propPrefix + ":patternId"],
        "-",
        ["get", propPrefix + ":patternColor"],
      ],
      dummy,
    ];
  }

  buildFillOpacityExpr(fallbackOpacity) {
    const propPrefix = this.opts.propertyPrefix;

    return [
      "case",
      ["boolean", ["get", propPrefix + ":patternEnabled"], false],
      ["/", ["get", propPrefix + ":patternOpacity"], 100],
      ["boolean", ["feature-state", propPrefix + ":fillOpacity"], false],
      ["/", ["feature-state", propPrefix + ":fillOpacity"], 100],
      fallbackOpacity != null ? fallbackOpacity : 0.8,
    ];
  }

  applyToLayer(layerId, { opacity } = {}) {
    const layer = this.map.getLayer(layerId);
    if (!layer) throw new Error("Layer not found: " + layerId);

    this.map.setPaintProperty(layerId, "fill-pattern", this.buildFillPatternExpr());
    this.map.setPaintProperty(layerId, "fill-opacity", this.buildFillOpacityExpr(opacity));
  }

  setOptions(patch) {
    Object.assign(this.opts, patch);
    return this;
  }

  setPatterns(patterns) {
    this.opts.patterns = patterns;
    return this;
  }

  setTileSizes(sizes) {
    Object.assign(this.opts.tileSizes, sizes);
    return this;
  }

  destroy() {
    this._cache.clear();
    this._ready = false;
  }

  // ── Static: graph coloring ────────────────────────────────────────
  // Assigns distinct patterns to adjacent polygons so borders are
  // visually distinguishable. Ported from geoglify.com
  //
  //   features: [{ id, coordinates }]
  //     id          — unique identifier (string or number)
  //     coordinates — the geometry.coordinates array from a GeoJSON
  //                   Polygon or MultiPolygon feature
  //
  //   patternIds: string[]
  //
  //   Returns: [{ id, patternId }]
  //
  static colorize(features, patternIds) {
    var n = features.length;
    var k = patternIds.length;
    if (n === 0 || k === 0) return [];

    var PRECISION = 1e4;
    var edgeIndex = new Map();
    var processedPairs = new Set();
    var adj = Array.from({ length: n }, function () {
      return [];
    });

    function toRings(polygon) {
      return polygon.rings || [polygon.coordinates];
    }

    for (var i = 0; i < n; i++) {
      var rings = toRings(features[i]);
      for (var r = 0; r < rings.length; r++) {
        var coords = rings[r];
        for (var p = 0, q = coords.length - 1; p < coords.length; q = p++) {
          var x1 = Math.round(coords[p][0] * PRECISION);
          var y1 = Math.round(coords[p][1] * PRECISION);
          var x2 = Math.round(coords[q][0] * PRECISION);
          var y2 = Math.round(coords[q][1] * PRECISION);
          if (x1 === x2 && y1 === y2) continue;

          var ax, ay, bx, by;
          if (x1 < x2 || (x1 === x2 && y1 < y2)) {
            ax = x1;
            ay = y1;
            bx = x2;
            by = y2;
          } else {
            ax = x2;
            ay = y2;
            bx = x1;
            by = y1;
          }
          var key = ax + "," + ay + "|" + bx + "," + by;
          var indices = edgeIndex.get(key);
          if (indices) {
            if (indices[indices.length - 1] !== i) indices.push(i);
          } else {
            edgeIndex.set(key, [i]);
          }
        }
      }
    }

    for (var _i = 0, _arr = Array.from(edgeIndex.values()); _i < _arr.length; _i++) {
      var indices = _arr[_i];
      if (indices.length < 2) continue;
      for (var a = 0; a < indices.length; a++) {
        for (var b = a + 1; b < indices.length; b++) {
          var ii = indices[a];
          var jj = indices[b];
          var pairKey = ii < jj ? ii + "," + jj : jj + "," + ii;
          if (processedPairs.has(pairKey)) continue;
          processedPairs.add(pairKey);
          adj[ii].push(jj);
          adj[jj].push(ii);
        }
      }
    }

    var colors = new Int32Array(n).fill(-1);
    var avail = new Uint32Array(k);

    for (var i2 = 0; i2 < n; i2++) {
      var nb = adj[i2];
      var usedMask = 0;
      var usedArr = k <= 31 ? null : new Array(k).fill(false);
      for (var j = 0; j < nb.length; j++) {
        var c = colors[nb[j]];
        if (c >= 0) {
          if (k <= 31) usedMask |= 1 << c;
          else usedArr[c] = true;
        }
      }
      var availCount = 0;
      for (var c2 = 0; c2 < k; c2++) {
        if (k <= 31 ? !(usedMask & (1 << c2)) : !usedArr[c2]) {
          avail[availCount++] = c2;
        }
      }
      colors[i2] =
        availCount > 0 ? avail[(Math.random() * availCount) | 0] : (Math.random() * k) | 0;
    }

    var result = new Array(n);
    for (var i3 = 0; i3 < n; i3++) {
      result[i3] = { id: features[i3].id, patternId: patternIds[colors[i3]] };
    }
    return result;
  }
}

if (typeof maplibregl !== "undefined") {
  maplibregl.PolygonPatterns = PolygonPatterns;
}

export default PolygonPatterns;
