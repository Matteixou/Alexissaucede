// Post-build step: renders each route to static HTML so the hero paints before any JavaScript runs.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

process.env.NODE_ENV = 'production'

const DIST = path.resolve('dist')
const SSR_DIR = path.resolve('dist-ssr')

const ROUTES = [
  { url: '/',                 out: 'index.html' },
  { url: '/cgv',              out: 'cgv/index.html',              title: 'CGV — Alexis Saucede Coaching' },
  { url: '/mentions-legales', out: 'mentions-legales/index.html', title: 'Mentions légales — Alexis Saucede Coaching' },
]

// Every font painted in the first viewport. Preloads are fetched at High priority; left to CSS
// discovery they would be VeryHigh, which Lighthouse counts as render-blocking.
const PRELOAD_FONTS = [
  'barlow-condensed-latin-900-italic',
  'inter-latin-400-normal',
  'inter-latin-500-normal',
  'inter-latin-600-normal',
  'permanent-marker-latin-400-normal',
  'rajdhani-latin-500-normal',
  'rajdhani-latin-700-normal',
]

const { render } = await import(pathToFileURL(path.join(SSR_DIR, 'entry-server.js')).href)
let template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8')

// Inline the stylesheet: it is the only render-blocking request and weighs ~7 KB gzipped
const cssLink = /<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/
const cssHref = template.match(cssLink)?.[1]
if (!cssHref) throw new Error('prerender: stylesheet link not found in dist/index.html')
const css = fs.readFileSync(path.join(DIST, cssHref), 'utf8').replace(/\/\*# sourceMappingURL=.*?\*\//g, '')
template = template.replace(cssLink, () => `<style>${css}</style>`)

const assets = fs.readdirSync(path.join(DIST, 'assets'))
const preloads = PRELOAD_FONTS.map((name) => {
  const file = assets.find((a) => a.startsWith(`${name}-`) && a.endsWith('.woff2'))
  if (!file) throw new Error(`prerender: font ${name} not found in dist/assets`)
  return `<link rel="preload" as="font" type="font/woff2" href="/assets/${file}" crossorigin />`
}).join('\n    ')
template = template.replace('<meta charset="UTF-8" />', (m) => `${m}\n    ${preloads}`)

// The hero is readable from the HTML alone, so the app bundle is only requested once the first
// frame is on screen: hydration never competes with the first paint.
const entryTag = /<script type="module" crossorigin src="(\/assets\/index-[^"]+\.js)"><\/script>/
const entrySrc = template.match(entryTag)?.[1]
if (!entrySrc) throw new Error('prerender: entry script tag not found in dist/index.html')
const loader = `<script>(function(){var done=false;function load(){if(done)return;done=true;var s=document.createElement('script');s.type='module';s.crossOrigin='';s.src='${entrySrc}';document.head.appendChild(s)}try{if(PerformanceObserver.supportedEntryTypes.indexOf('paint')<0)throw 0;new PerformanceObserver(function(l){if(l.getEntriesByName('first-contentful-paint').length)load()}).observe({type:'paint',buffered:true});setTimeout(load,3000)}catch(e){requestAnimationFrame(function(){setTimeout(load,0)})}})()</script>`
template = template.replace(entryTag, () => loader)

const canonical = template.match(/<link rel="canonical" href="([^"]+)"/)?.[1]?.replace(/\/$/, '')

for (const route of ROUTES) {
  const appHtml = await render(route.url)
  let html = template.replace(
    '<div id="root"></div>',
    () => `<div id="root" data-prerendered="${route.url}">${appHtml}</div>`,
  )
  if (route.title) {
    html = html
      .replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`)
      .replace(/<link rel="canonical" href="[^"]+"/, `<link rel="canonical" href="${canonical}${route.url}"`)
  }
  const file = path.join(DIST, route.out)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, html)
  console.log(`prerendered ${route.url} → dist/${route.out} (${(html.length / 1024).toFixed(1)} KB)`)
}

fs.rmSync(SSR_DIR, { recursive: true, force: true })
