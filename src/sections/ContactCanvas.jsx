import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'
import { imageToShapes } from '../utils/logoShapes'

const mat = new THREE.MeshPhysicalMaterial({
  color:              new THREE.Color('#BDBDCE'),
  metalness:          0.96,
  roughness:          0.06,
  clearcoat:          0.65,
  clearcoatRoughness: 0.04,
  reflectivity:       1.0,
  emissive:           new THREE.Color('#8080A0'),
  emissiveIntensity:  0.12,
})

const EXTRUDE = {
  depth:          0.28,
  bevelEnabled:   true,
  bevelThickness: 0.04,
  bevelSize:      0.025,
  bevelOffset:    0,
  bevelSegments:  3,
  curveSegments:  16,
}

function BgLogo() {
  const groupRef = useRef()

  useEffect(() => {
    let cancelled = false
    imageToShapes('/logoalexissaucede.jpg', 300, 9.0).then(shapes => {
      if (cancelled || !groupRef.current) return
      const geos   = shapes.map(sh => new THREE.ExtrudeGeometry(sh, EXTRUDE))
      const merged = mergeGeometries(geos, false)
      const mesh   = new THREE.Mesh(merged ?? geos[0], mat)
      if (!merged) geos.slice(1).forEach(g => groupRef.current.add(new THREE.Mesh(g, mat)))
      const bbox = new THREE.Box3().setFromObject(mesh)
      mesh.position.sub(bbox.getCenter(new THREE.Vector3()))
      mesh.scale.setScalar(0.65)
      groupRef.current.add(mesh)
    }).catch(console.error)
    return () => { cancelled = true }
  }, [])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += delta * 0.09
    groupRef.current.rotation.x  = Math.sin(state.clock.elapsedTime * 0.3) * 0.08
  })

  return <group ref={groupRef} />
}

export default function ContactCanvas() {
  return (
    <Canvas
      dpr={[1, 1]}
      camera={{ position: [0, 0, 12], fov: 42 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <ambientLight intensity={0.30} color="#FFFFFF" />
      <directionalLight position={[ 5,  9,  7]} intensity={4.0} color="#FFFFFF" />
      <directionalLight position={[-7,  2,  4]} intensity={1.5} color="#8899CC" />
      <pointLight       position={[ 3,  5, -5]} intensity={2.5} color="#5060A0" distance={40} />
      <Environment preset="studio" resolution={32} />
      <BgLogo />
    </Canvas>
  )
}
