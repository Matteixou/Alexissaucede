import sharp from 'sharp'
import { readdirSync, statSync } from 'fs'
import { join, extname, basename } from 'path'

const dirs = ['public', 'public/Transformation']
const exts = ['.png', '.jpg', '.jpeg']

for (const dir of dirs) {
  const files = readdirSync(dir).filter(f => exts.includes(extname(f).toLowerCase()))
  for (const file of files) {
    const src = join(dir, file)
    const dest = join(dir, basename(file, extname(file)) + '.webp')
    await sharp(src).webp({ quality: 82 }).toFile(dest)
    const before = Math.round(statSync(src).size / 1024)
    const after  = Math.round(statSync(dest).size / 1024)
    console.log(`${file}: ${before}KB → ${after}KB (-${Math.round((1 - after / before) * 100)}%)`)
  }
}
