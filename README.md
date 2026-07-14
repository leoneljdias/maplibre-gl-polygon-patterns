# maplibre-gl-polygon-patterns

SVG hatch/fill patterns for MapLibre GL JS polygons using `fill-pattern`. Built on [textures.js](https://github.com/riccardoscalco/textures).

[![npm](https://img.shields.io/npm/v/@leoneljdias/maplibre-gl-polygon-patterns)](https://www.npmjs.com/package/@leoneljdias/maplibre-gl-polygon-patterns)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@leoneljdias/maplibre-gl-polygon-patterns)](https://bundlephobia.com/package/@leoneljdias/maplibre-gl-polygon-patterns)

![demo](https://raw.githubusercontent.com/leoneljdias/maplibre-gl-polygon-patterns/main/demo/screenshot.png)

[Demo](https://leoneljdias.github.io/maplibre-gl-polygon-patterns/demo/) · [npm](https://www.npmjs.com/package/@leoneljdias/maplibre-gl-polygon-patterns)

---

## Install

```bash
npm install @leoneljdias/maplibre-gl-polygon-patterns
```

Or via CDN (ESM):

```html
<script type="module">
  import PolygonPatterns from "https://unpkg.com/@leoneljdias/maplibre-gl-polygon-patterns/dist/index.js";
</script>
```

Or via CDN (UMD):

```html
<script src="https://unpkg.com/@leoneljdias/maplibre-gl-polygon-patterns/dist/index.umd.js"></script>
<script>
  const patterns = new PolygonPatterns(map, options);
</script>
```

## Usage

```js
import PolygonPatterns from "@leoneljdias/maplibre-gl-polygon-patterns";

const patterns = new PolygonPatterns(map, {
  prewarmOnLoad: true,
  prewarmColor: "#333333",
});

// Generate and register a pattern image, then use it in a layer
await patterns.ensure("lines-crossed", "#c65b2e");

map.addLayer({
  id: "polygons",
  type: "fill",
  source: "my-source",
  paint: {
    "fill-pattern": patterns.buildFillPatternExpr(),
    "fill-opacity": patterns.buildFillOpacityExpr(0.8),
  },
});
```

Pattern images are rendered as SVG via [textures.js](https://github.com/riccardoscalco/textures), rasterised to
canvas at 4× resolution, and registered with `map.addImage()` for use with
MapLibre's native `fill-paint` paint property. Only unique pattern+colour
combinations are generated — duplicates reuse the cached image.

## Random mode

Assign a random pattern + colour to every polygon in a dataset. Works with the
built-in graph coloring to ensure adjacent polygons (sharing an edge) get
different patterns:

```js
import PolygonPatterns from "@leoneljdias/maplibre-gl-polygon-patterns";

const patterns = new PolygonPatterns(map, { prewarmOnLoad: false });

// 1. Pick colours and pattern IDs
const COLORS = ["#2563eb", "#dc2626", "#16a34a"];
const PATTERN_IDS = ["lines-crossed", "circles-default", "paths-hexagons"];

// 2. (Optional) Colourise: adjacent polygons get different patterns
const assignment = PolygonPatterns.colorize(
  features.map((f) => ({ id: f.id, coordinates: f.geometry.coordinates })),
  PATTERN_IDS,
);

// 3. Set geoglify:* properties on each feature
features.forEach((f) => {
  const pid = assignment.find((a) => a.id === f.id).patternId;
  f.properties["geoglify:patternEnabled"] = true;
  f.properties["geoglify:patternId"] = pid;
  f.properties["geoglify:patternColor"] = "#2563eb";
  f.properties["geoglify:patternOpacity"] = 80;
});

// 4. Generate & register only the pattern+colour combos you need
await Promise.all(
  [...new Set(features.map((f) => f.properties["geoglify:patternId"]))].map((pid) =>
    patterns.ensure(pid, "#2563eb"),
  ),
);

// 5. Use the built-in expressions in your layers
map.addLayer({
  id: "polygons",
  type: "fill",
  source: "my-source",
  paint: {
    "fill-pattern": patterns.buildFillPatternExpr(),
    "fill-opacity": patterns.buildFillOpacityExpr(0.85),
  },
});
```

See the [demo](https://leoneljdias.github.io/maplibre-gl-polygon-patterns/demo/)
for a complete working example with world countries.

## Options

| Option           | Default                    | Description                                                  |
| ---------------- | -------------------------- | ------------------------------------------------------------ |
| `imagePrefix`    | `"maplibre-pattern"`       | Prefix for image names registered in the map                 |
| `dummyPatternId` | `"maplibre-pattern-dummy"` | 1×1 transparent fallback image for non-pattern features      |
| `prewarmOnLoad`  | `true`                     | Generate all patterns with `prewarmColor` on setup           |
| `prewarmColor`   | `"#333333"`                | Colour used during prewarm                                   |
| `propertyPrefix` | `"geoglify"`               | Prefix for feature properties (`:patternEnabled`, etc.)      |
| `patterns`       | `[…]`                      | Array of `{ id, factory }` pattern definitions (28 built-in) |
| `tileSizes`      | `{…}`                      | SVG viewport dimensions per pattern id                       |

## API

- **`ensure(patternId, color)`** — Generate and register a pattern image; returns the image name
- **`prewarm(color)`** — Generate all patterns with a given colour
- **`applyToLayer(layerId, opts)`** — Apply `fill-pattern` and `fill-opacity` expressions to an existing layer
- **`buildFillPatternExpr()`** — Returns a MapLibre paint expression for `fill-pattern`
- **`buildFillOpacityExpr(fallback)`** — Returns a MapLibre paint expression for `fill-opacity`
- **`getImageName(patternId, color)`** — Resolve the image name registered in the map
- **`randomPatternId()`** — Return a random pattern id
- **`setOptions(patch)`** — Update options after construction
- **`setPatterns(patterns)`** — Replace pattern definitions
- **`setTileSizes(sizes)`** — Replace tile size definitions
- **`destroy()`** — Clean up internal state

### Static

- **`PolygonPatterns.colorize(features, patternIds)`** — Assign distinct patterns to adjacent polygons (graph coloring). `features` is an array of `{ id, coordinates }` where `coordinates` is the `geometry.coordinates` from GeoJSON. Returns `[{ id, patternId }]`. Ported from [geoglify.com](https://geoglify.com).

## Contributing

Any contributions to this project are more than welcome. Feel free to reach us and we will gladly include any improvements or ideas that you may have. Please, fork this repository, make any changes and submit a Pull Request and we will get in touch!

## License

MIT

by [Leonel Dias](https://leoneljdias.github.io/)
