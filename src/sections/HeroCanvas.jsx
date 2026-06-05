import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'
import { imageToShapes } from '../utils/logoShapes'

const chromeMat = new THREE.MeshPhysicalMaterial({
  color:              new THREE.Color('#BDBDCE'),
  metalness:          0.96,
  roughness:          0.06,
  clearcoat:          0.65,
  clearcoatRoughness: 0.04,
  reflectivity:       1.0,
  emissive:           new THREE.Color('#606070'),
  emissiveIntensity:  0.06,
})

const EXTRUDE = {
  depth:          0.38,
  bevelEnabled:   true,
  bevelThickness: 0.052,
  bevelSize:      0.032,
  bevelOffset:    0,
  bevelSegments:  3,
  curveSegments:  16,
}

function ASLogo({ scrollRef, zoomRef }) {
  const groupRef     = useRef()
  const floatT       = useRef(0)
  const currentScale = useRef(1)

  useEffect(() => {
    let cancelled = false
    imageToShapes('/logoalexissaucede.jpg', 300, 4.0).then(shapes => {
      if (cancelled || !groupRef.current) return
      const geos   = shapes.map(sh => new THREE.ExtrudeGeometry(sh, EXTRUDE))
      const merged = mergeGeometries(geos, false)
      const mesh   = new THREE.Mesh(merged ?? geos[0], chromeMat)
      if (!merged) geos.slice(1).forEach(g => groupRef.current.add(new THREE.Mesh(g, chromeMat)))
      const bbox = new THREE.Box3().setFromObject(mesh)
      mesh.position.sub(bbox.getCenter(new THREE.Vector3()))
      groupRef.current.add(mesh)
    }).catch(console.error)
    return () => { cancelled = true }
  }, [])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    floatT.current += delta
    const lf = 1 - Math.exp(-delta * 5)

    groupRef.current.rotation.y += delta * 0.20

    const targetRotX = scrollRef.current * Math.PI * 0.05
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * lf

    const targetScale = 1 + (zoomRef?.current ?? 0) * 0.22
    currentScale.current += (targetScale - currentScale.current) * lf
    groupRef.current.scale.setScalar(currentScale.current)

    groupRef.current.position.y = Math.sin(floatT.current * 0.85) * 0.08
  })

  return <group ref={groupRef} />
}

export default function HeroCanvas({ scrollRef, zoomRef }) {
  return (
    <Canvas
      dpr={[1, 1]}
      camera={{ position: [0, 0, 4.0], fov: 44 }}
      gl={{
        antialias:             false,
        alpha:                 true,
        powerPreference:       'high-performance',
        preserveDrawingBuffer: false,
      }}
      performance={{ min: 0.5 }}
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <ambientLight intensity={0.20} color="#FFFFFF" />
      <directionalLight position={[ 5,  9,  7]} intensity={5.5} color="#FFFFFF" />
      <directionalLight position={[-7,  2,  4]} intensity={2.0} color="#8899CC" />
      <directionalLight position={[ 1, -7,  5]} intensity={1.5} color="#FFFFFF" />
      <pointLight position={[3, 5, -5]} intensity={3.0} color="#5060A0" distance={30} />
      <Environment preset="studio" resolution={32} />
      <ASLogo scrollRef={scrollRef} zoomRef={zoomRef} />
    </Canvas>
  )
}
