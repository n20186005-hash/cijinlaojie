// 產生響應式 WebP 版本並記錄尺寸，供 <Pic> 元件使用。
// 來源：public/images/*.jpg -> public/images/<name>-800.webp / -1600.webp
import sharp from 'sharp';
import { readdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const IMG_DIR = path.join(ROOT, 'public', 'images');
const META_OUT = path.join(ROOT, 'src', 'data', 'image-meta.json');
const WIDTHS = [800, 1600];

const files = (await readdir(IMG_DIR)).filter((f) => /\.jpe?g$/i.test(f));
const meta = {};

for (const file of files) {
  const slug = file.replace(/\.jpe?g$/i, '');
  const src = path.join(IMG_DIR, file);
  const img = sharp(src);
  const { width, height } = await img.metadata();
  // 以 1600 寬為基準記錄顯示尺寸（維持比例）
  const displayW = Math.min(width, 1600);
  const displayH = Math.round((displayW / width) * height);
  meta[slug] = { w: displayW, h: displayH, ratio: +(width / height).toFixed(4) };

  for (const w of WIDTHS) {
    if (width < w && w !== WIDTHS[0]) continue; // 不放大
    const out = path.join(IMG_DIR, `${slug}-${w}.webp`);
    await sharp(src)
      .resize({ width: Math.min(w, width), withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(out);
    process.stdout.write(`  ${slug}-${w}.webp\n`);
  }
}

await writeFile(META_OUT, JSON.stringify(meta, null, 2));
console.log(`\nWrote ${Object.keys(meta).length} entries -> ${path.relative(ROOT, META_OUT)}`);
