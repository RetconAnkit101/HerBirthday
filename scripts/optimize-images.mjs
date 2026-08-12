import { mkdir, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const SRC_DIR = path.resolve('assets')
const OUT_DIR = path.resolve('public/photos')

/** Original filename (without extension) -> slug used by the app. */
const SLUGS = {
  'First slide of bday': 'hero',
  'Cutest Bday girl': 'cutest',
  'Prettiest bday girl': 'prettiest',
  'Sassiest boy': 'sassiest-boy',
  'Sassiest girl for sassiest boy': 'sassiest-girl',
  'want to be together': 'together',
  'Me asking her for date': 'date-ask',
  'when she says yes and date confirm': 'date-confirmed',
  IMG_2669: 'us-1',
  IMG_2672: 'us-2',
  IMG_2676: 'us-3',
  IMG_2817: 'us-4',
  IMG_2842: 'us-5',
}

const MAX_EDGE = 1600
const QUALITY = 74

await mkdir(OUT_DIR, { recursive: true })

const files = (await readdir(SRC_DIR)).filter((f) => /\.(jpe?g|png)$/i.test(f))
const manifest = {}

for (const file of files) {
  const base = path.basename(file, path.extname(file))
  const slug = SLUGS[base]
  if (!slug) {
    console.warn(`skipped (no slug): ${file}`)
    continue
  }

  const input = sharp(path.join(SRC_DIR, file)).rotate()
  const { width = 0, height = 0 } = await input.metadata()

  const pipeline = input
    .clone()
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: QUALITY })

  const { info } = await pipeline.toBuffer({ resolveWithObject: true })
  await pipeline.toFile(path.join(OUT_DIR, `${slug}.webp`))

  manifest[slug] = { width: info.width, height: info.height, source: file }
  console.log(`${file} (${width}x${height}) -> ${slug}.webp (${info.width}x${info.height})`)
}

await writeFile(path.join(OUT_DIR, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`)
console.log(`\n${Object.keys(manifest).length} images written to public/photos`)
