import * as THREE from 'three'

function rasterize(img, size, threshold = 110) {
  const c = Object.assign(document.createElement('canvas'), { width: size, height: size })
  const ctx = c.getContext('2d')
  ctx.drawImage(img, 0, 0, size, size)
  const px   = ctx.getImageData(0, 0, size, size).data
  const mask = new Uint8Array(size * size)
  for (let i = 0; i < size * size; i++) mask[i] = px[i * 4] > threshold ? 1 : 0
  return mask
}

function marchingSquares(mask, W, H) {
  const segs = []
  const T = (x, y) => [x + .5, y      ]
  const R = (x, y) => [x + 1,  y + .5 ]
  const B = (x, y) => [x + .5, y + 1  ]
  const L = (x, y) => [x,      y + .5 ]
  for (let y = 0; y < H - 1; y++) {
    for (let x = 0; x < W - 1; x++) {
      const tl = mask[ y      * W + x    ]
      const tr = mask[ y      * W + x + 1]
      const br = mask[(y + 1) * W + x + 1]
      const bl = mask[(y + 1) * W + x    ]
      switch ((tl << 3) | (tr << 2) | (br << 1) | bl) {
        case  1: segs.push([B(x,y), L(x,y)]); break
        case  2: segs.push([R(x,y), B(x,y)]); break
        case  3: segs.push([R(x,y), L(x,y)]); break
        case  4: segs.push([T(x,y), R(x,y)]); break
        case  5: segs.push([T(x,y), L(x,y)], [R(x,y), B(x,y)]); break
        case  6: segs.push([T(x,y), B(x,y)]); break
        case  7: segs.push([T(x,y), L(x,y)]); break
        case  8: segs.push([L(x,y), T(x,y)]); break
        case  9: segs.push([B(x,y), T(x,y)]); break
        case 10: segs.push([L(x,y), B(x,y)], [T(x,y), R(x,y)]); break
        case 11: segs.push([T(x,y), R(x,y)]); break
        case 12: segs.push([L(x,y), R(x,y)]); break
        case 13: segs.push([R(x,y), B(x,y)]); break
        case 14: segs.push([L(x,y), B(x,y)]); break
      }
    }
  }
  return segs
}

function connectSegments(segs) {
  const k   = ([x, y]) => `${x},${y}`
  const adj = new Map()
  segs.forEach(([a, b], i) => {
    const ka = k(a), kb = k(b)
    ;[ka, kb].forEach((key, s) => {
      if (!adj.has(key)) adj.set(key, [])
      adj.get(key).push({ i, other: s === 0 ? kb : ka })
    })
  })
  const used  = new Set()
  const polys = []
  for (let si = 0; si < segs.length; si++) {
    if (used.has(si)) continue
    used.add(si)
    const pts = [segs[si][0], segs[si][1]]
    let cur = k(segs[si][1])
    for (;;) {
      const nxt = (adj.get(cur) || []).find(e => !used.has(e.i))
      if (!nxt) break
      used.add(nxt.i)
      const s = segs[nxt.i]
      pts.push(k(s[0]) === cur ? s[1] : s[0])
      cur = nxt.other
    }
    if (pts.length > 4) polys.push(pts)
  }
  return polys
}

function chaikin(pts, passes = 2) {
  let p = pts
  for (let n = 0; n < passes; n++) {
    const s = []
    for (let i = 0; i < p.length; i++) {
      const [x0, y0] = p[i], [x1, y1] = p[(i + 1) % p.length]
      s.push([x0 * .75 + x1 * .25, y0 * .75 + y1 * .25])
      s.push([x0 * .25 + x1 * .75, y0 * .25 + y1 * .75])
    }
    p = s
  }
  return p
}

function rdp(pts, eps) {
  if (pts.length < 3) return pts
  const [x1, y1] = pts[0], [x2, y2] = pts[pts.length - 1]
  const dx = x2 - x1, dy = y2 - y1
  const len = Math.hypot(dx, dy) || 1e-12
  let maxD = 0, maxI = 0
  for (let i = 1; i < pts.length - 1; i++) {
    const d = Math.abs(dy * pts[i][0] - dx * pts[i][1] + x2 * y1 - y2 * x1) / len
    if (d > maxD) { maxD = d; maxI = i }
  }
  if (maxD > eps)
    return [...rdp(pts.slice(0, maxI + 1), eps).slice(0, -1), ...rdp(pts.slice(maxI), eps)]
  return [pts[0], pts[pts.length - 1]]
}

function signedArea(pts) {
  let a = 0
  for (let i = 0; i < pts.length; i++) {
    const j = (i + 1) % pts.length
    a += pts[i][0] * pts[j][1] - pts[j][0] * pts[i][1]
  }
  return a * .5
}

function centroid(pts) {
  let cx = 0, cy = 0
  pts.forEach(([x, y]) => { cx += x; cy += y })
  return [cx / pts.length, cy / pts.length]
}

function pointInPoly([tx, ty], poly) {
  let inside = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j]
    if ((yi > ty) !== (yj > ty) && tx < ((xj - xi) * (ty - yi)) / (yj - yi) + xi)
      inside = !inside
  }
  return inside
}

function toShape(pts, W, scale) {
  const norm = ([x, y]) => [(x / W - .5) * scale, (y / W - .5) * -scale]
  const rev  = [...pts].reverse()
  const sh   = new THREE.Shape()
  const [fx, fy] = norm(rev[0])
  sh.moveTo(fx, fy)
  for (let i = 1; i < rev.length; i++) {
    const [px, py] = norm(rev[i])
    sh.lineTo(px, py)
  }
  sh.closePath()
  return sh
}

// Cache module-level pour éviter de recalculer le même logo plusieurs fois
const _cache = new Map()

export async function imageToShapes(url, size = 300, scale = 5.8, rdpEps = 1.6) {
  const key = `${url}|${size}|${scale}|${rdpEps}`
  if (_cache.has(key)) return _cache.get(key)

  const promise = (async () => {
    const img = await new Promise((res, rej) => {
      const i = new Image()
      i.onload = () => res(i)
      i.onerror = rej
      i.src = url
    })
    const mask     = rasterize(img, size)
    const segs     = marchingSquares(mask, size, size)
    const raw      = connectSegments(segs)
    const MIN_AREA = size * size * 0.004

    const polys = raw.map(p => {
      const first = p[0], last = p[p.length - 1]
      const clean = (first[0] === last[0] && first[1] === last[1]) ? p.slice(0, -1) : p
      return rdp(chaikin(clean, 2), rdpEps)
    }).filter(p => p.length >= 5)

    const outers = polys
      .filter(p => signedArea(p) < 0)
      .filter(p => Math.abs(signedArea(p)) > MIN_AREA)
    const holes = polys.filter(p => signedArea(p) > 0)

    return outers.map(o => {
      const sh = toShape(o, size, scale)
      holes.forEach(h => {
        if (pointInPoly(centroid(h), o)) sh.holes.push(toShape(h, size, scale))
      })
      return sh
    })
  })()

  _cache.set(key, promise)
  return promise
}
