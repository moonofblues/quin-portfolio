import sharp from "sharp";
import { readdirSync, statSync } from "fs";
import { join, extname, basename } from "path";

const ASSETS_DIR = new URL("../src/assets", import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1");
const MAX_WIDTH = 1600;
const WEBP_QUALITY = 80;

function walk(dir) {
  const entries = readdirSync(dir);
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...walk(full));
    } else if (extname(entry).toLowerCase() === ".png") {
      files.push(full);
    }
  }
  return files;
}

const pngs = walk(ASSETS_DIR);

for (const src of pngs) {
  const dest = src.replace(/\.png$/i, ".webp");
  const meta = await sharp(src).metadata();
  const kb = (statSync(src).size / 1024).toFixed(0);
  await sharp(src)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(dest);
  const newKb = (statSync(dest).size / 1024).toFixed(0);
  console.log(`${basename(src)}: ${kb} kB → ${newKb} kB (${Math.round((1 - newKb/kb)*100)}% smaller)`);
}

console.log(`\nDone. Converted ${pngs.length} files.`);
