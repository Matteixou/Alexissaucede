// Generates the resized WebP variants referenced by srcset in the components.
// Run after adding or replacing a photo in public/: npm run images
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'

const PUB = path.resolve('public')

async function variant(src, dest, width) {
  const out = path.join(PUB, dest)
  if (fs.existsSync(out) && fs.statSync(out).mtimeMs > fs.statSync(src).mtimeMs) return
  await sharp(src).resize({ width, withoutEnlargement: true }).webp({ quality: 76, effort: 6 }).toFile(out)
  console.log(`${dest}  ${(fs.statSync(out).size / 1024).toFixed(0)} KB`)
}

const tDir = path.join(PUB, 'Transformation')
const ids = [...new Set(fs.readdirSync(tDir).map(f => f.match(/^(\d+)\.(png|webp)$/)?.[1]).filter(Boolean))]
for (const id of ids) {
  const png = path.join(tDir, `${id}.png`)
  const src = fs.existsSync(png) ? png : path.join(tDir, `${id}.webp`)
  for (const w of [400, 800]) await variant(src, `Transformation/${id}-${w}.webp`, w)
}

for (const w of [480, 800]) await variant(path.join(PUB, 'alexis-v2.jpeg'), `alexis-v2-${w}.webp`, w)

for (const n of [1, 2, 3, 4]) {
  for (const w of [640, 960]) await variant(path.join(PUB, `banner ${n}.png`), `banner-${n}-${w}.webp`, w)
}

await variant(path.join(PUB, 'logoalexissaucede.jpg'), 'logo-112.webp', 112)
