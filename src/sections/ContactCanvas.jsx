import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  MeshPhysicalMaterial,
  Color,
  ExtrudeGeometry,
  Mesh,
  Box3,
  Vector3,
} from 'three'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'
import { imageToShapes } from '../utils/logoShapes'

// Matériau module-level — zéro réallocation lors des re-renders
const mat = new MeshPhysicalMaterial({
  color:              new Color('#BDBDCE'),
  metalness:          0.96,
  roughness:          0.06,
  clearcoat:          0.65,
  clearcoatRoughness: 0.04,
  reflectivity:       1.0,
  emissive:           new Color('#8080A0'),
  emissiveIntensity:  0.12,
})

const EXTRUDE = {
  depth:          0.28,
  bevelEnabled:   true,
  bevelThickness: 0.04,
  bevelSize:      0.025,
  bevelOffset:    0,
  bevelSegments:  2,
  curveSegments:  8,
}

// Cache module-level de la géométrie mergée
let _contactGeo = null

function BgLogo() {
  const groupRef = useRef()
  const frameAcc = useRef(0)

  useEffect(() => {
    let cancelled = false

    const attachMesh = (geo) => {
      if (cancelled || !groupRef.current) return
      const mesh = new Mesh(geo, mat)
      const bbox = new Box3().setFromObject(mesh)
      mesh.position.sub(bbox.getCenter(new Vector3()))
      mesh.scale.setScalar(0.65)
      groupRef.current.add(mesh)
    }

    if (_contactGeo) {
      attachMesh(_contactGeo)
    } else {
      imageToShapes('/logoalexissaucede.webp', 200, 9.0).then(shapes => {
        if (cancelled) return
        const geos   = shapes.map(sh => new ExtrudeGeometry(sh, EXTRUDE))
        const merged = mergeGeometries(geos, false)
        geos.forEach(g => g.dispose())
        _contactGeo = merged ?? geos[0]
        attachMesh(_contactGeo)
      }).catch(console.error)
    }

    return () => {
      cancelled = true
      groupRef.current?.clear()
    }
  }, [])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    // Limiteur 30fps — logo de fond lent, inutile de tourner à 60fps
    frameAcc.current += delta
    if (frameAcc.current < 1 / 30) return
    const dt = frameAcc.current
    frameAcc.current = 0
    groupRef.current.rotation.y += dt * 0.09
    groupRef.current.rotation.x  = Math.sin(state.clock.elapsedTime * 0.3) * 0.08
  })

  return <group ref={groupRef} raycast={() => null} />
}

export default function ContactCanvas() {
  return (
    <Canvas
      dpr={[1, 1]}
      camera={{ position: [0, 0, 12], fov: 42 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'default' }}
      style={{ width: '100%', height: '100%', display: 'block', pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.30} color="#FFFFFF" />
      <directionalLight position={[ 5,  9,  7]} intensity={4.0} color="#FFFFFF" />
      <directionalLight position={[-7,  2,  4]} intensity={1.5} color="#8899CC" />
      <pointLight       position={[ 3,  5, -5]} intensity={2.5} color="#5060A0" distance={40} />
      <BgLogo />
    </Canvas>
  )
}
