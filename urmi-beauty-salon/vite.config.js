import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const srcAssetsDir = path.resolve(__dirname, 'src/assets')

const MIME_TYPES = {
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
}

// Serves src/assets at the /assets/ URL root so content.js paths like
// /assets/videos/hero-video.mp4 work without duplicating media into public/.
function assetsFromSrc() {
  return {
    name: 'assets-from-src',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url || !req.url.startsWith('/assets/')) return next()

        let urlPath
        try {
          urlPath = decodeURIComponent(req.url.split('?')[0])
        } catch {
          return next()
        }

        const filePath = path.resolve(srcAssetsDir, path.posix.normalize(urlPath.replace(/^\/assets\//, '')))
        if (!filePath.startsWith(srcAssetsDir + path.sep)) return next()

        let stat
        try {
          stat = fs.statSync(filePath)
        } catch {
          return next()
        }
        if (!stat.isFile()) return next()

        const total = stat.size
        const range = req.headers && req.headers.range
        let start = 0
        let end = total - 1
        let status = 200

        if (range) {
          const match = /bytes=(\d*)-(\d*)$/.exec(range)
          if (match) {
            if (match[1]) start = parseInt(match[1], 10)
            if (match[2]) end = Math.min(parseInt(match[2], 10), total - 1)
            status = 206
          }
        }

        res.statusCode = status
        res.setHeader('Content-Type', MIME_TYPES[path.extname(filePath).toLowerCase()] || 'application/octet-stream')
        res.setHeader('Content-Length', end - start + 1)
        res.setHeader('Accept-Ranges', 'bytes')
        res.setHeader('Cache-Control', 'no-cache')
        if (status === 206) res.setHeader('Content-Range', `bytes ${start}-${end}/${total}`)
        fs.createReadStream(filePath, { start, end }).pipe(res)
      })
    },
    closeBundle() {
      const outDir = path.resolve(__dirname, 'dist/assets')
      fs.mkdirSync(outDir, { recursive: true })
      fs.cpSync(srcAssetsDir, outDir, { recursive: true, force: true })
    },
  }
}

export default defineConfig({
  plugins: [tailwindcss(), assetsFromSrc()],
})