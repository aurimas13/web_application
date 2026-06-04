import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pub = resolve(__dirname, '..', 'public');

// LinkedIn Featured recommended dimensions:
//   landscape 1200x627, square 1200x1200
const targets = [
  { svg: 'linkedin-featured.svg', png: 'linkedin-featured.png', w: 1200, h: 627 },
  { svg: 'linkedin-featured-square.svg', png: 'linkedin-featured-square.png', w: 1200, h: 1200 },
  { svg: 'linkedin-featured-icon.svg', png: 'linkedin-featured-icon.png', w: 1200, h: 627 },
  { svg: 'linkedin-featured-icon-square.svg', png: 'linkedin-featured-icon-square.png', w: 1200, h: 1200 },
];

console.log('Rendered:');
for (const { svg, png, w, h } of targets) {
  const buf = readFileSync(resolve(pub, svg));
  await sharp(buf, { density: 300 })
    .resize(w, h, { fit: 'fill' })
    .png({ quality: 95, compressionLevel: 9 })
    .toFile(resolve(pub, png));
  console.log(`  public/${png} (${w}x${h})`);
}
