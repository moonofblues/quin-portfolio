// Turns a flat list of photos into rows for the Photo set page (ADR 0013).
// It is a plain function with no React in it, so it is easy to read and test.
//
// The rules, in order:
//   1. Photo #1 is always its own full-width "opener" row (unless `opener` is
//      false, see below).
//   2. After that, walk the list one photo at a time:
//        - landscape or square (width >= height)  -> a "full" row
//        - portrait followed by another portrait  -> one "pair" row
//        - portrait with no portrait next to it   -> a "solo" row
//
// Every entry keeps an `index`, so clicking a photo can open the viewer at the
// right place no matter which row it landed in. `offset` is added to every
// index: the gallery lays out the highlighted photos first and the rest after
// them, and the rest start counting where the highlights stop.
//
// `opener: false` is for the second group (the rest of the set). Only one photo
// on the page may be the opener, because it is the one loaded right away.

const isPortrait = (photo) => photo.height > photo.width;

export function layoutPhotos(photos, { opener = true, offset = 0 } = {}) {
  const items = photos.map((photo, i) => ({ photo, index: offset + i }));
  const rows = [];
  if (!items.length) return rows;

  let i = 0;
  if (opener) {
    rows.push({ kind: "opener", items: [items[0]] });
    i = 1;
  }

  while (i < items.length) {
    const current = items[i];
    const next = items[i + 1];

    if (!isPortrait(current.photo)) {
      rows.push({ kind: "full", items: [current] });
      i += 1;
    } else if (next && isPortrait(next.photo)) {
      rows.push({ kind: "pair", items: [current, next] });
      i += 2;
    } else {
      rows.push({ kind: "solo", items: [current] });
      i += 1;
    }
  }
  return rows;
}
