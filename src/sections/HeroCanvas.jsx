import { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  MeshPhysicalMaterial,
  Color,
  ExtrudeGeometry,
  Mesh,
  Box3,
  Vector3,
  PMREMGenerator,
} from 'three'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'
import { imageToShapes } from '../utils/logoShapes'

// Matériau module-level — zéro réallocation lors des re-renders
const chromeMat = new MeshPhysicalMaterial({
  color:              new Color('#BDBDCE'),
  metalness:          0.96,
  roughness:          0.06,
  clearcoat:          0.65,
  clearcoatRoughness: 0.04,
  reflectivity:       1.0,
  emissive:           new Color('#606070'),
  emissiveIntensity:  0.06,
})

const EXTRUDE = {
  depth:          0.12,
  bevelEnabled:   true,
  bevelThickness: 0.018,
  bevelSize:      0.012,
  bevelOffset:    0,
  bevelSegments:  2,
  curveSegments:  8,
}

// Cache module-level de la géométrie mergée
let _heroGeo = null

// Remplace Environment de drei — procédural, zéro dépendance externe
function SceneEnvironment() {
  const { gl, scene } = useThree()
  useEffect(() => {
    const pmrem = new PMREMGenerator(gl)
    const env   = pmrem.fromScene(new RoomEnvironment()).texture
    scene.environment = env
    return () => {
      env.dispose()
      pmrem.dispose()
      scene.environment = null
    }
  }, [gl, scene])
  return null
}

function ASLogo({ scrollRef, zoomRef }) {
  const groupRef     = useRef()
  const floatT       = useRef(0)
  const currentScale = useRef(1)

  useEffect(() => {
    let cancelled = false

    const attachMesh = (geo) => {
      if (cancelled || !groupRef.current) return
      const mesh = new Mesh(geo, chromeMat)
      const bbox = new Box3().setFromObject(mesh)
      mesh.position.sub(bbox.getCenter(new Vector3()))
      groupRef.current.add(mesh)
    }

    if (_heroGeo) {
      attachMesh(_heroGeo)
    } else {
      imageToShapes('/logoalexissaucede.webp', 256, 4.0).then(shapes => {
        if (cancelled) return
        const geos   = shapes.map(sh => new ExtrudeGeometry(sh, EXTRUDE))
        const merged = mergeGeometries(geos, false)
        geos.forEach(g => g.dispose())
        _heroGeo = merged ?? geos[0]
        attachMesh(_heroGeo)
      }).catch(console.error)
    }

    return () => {
      cancelled = true
      groupRef.current?.clear()
    }
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

  return <group ref={groupRef} raycast={() => null} />
}

export default function HeroCanvas({ scrollRef, zoomRef }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.0], fov: 44 }}
      gl={{
        antialias:             false,
        alpha:                 true,
        powerPreference:       'default',
        preserveDrawingBuffer: false,
      }}
      performance={{ min: 0.5 }}
      style={{ width: '100%', height: '100%', display: 'block', pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.20} color="#FFFFFF" />
      <directionalLight position={[ 5,  9,  7]} intensity={5.5} color="#FFFFFF" />
      <directionalLight position={[-7,  2,  4]} intensity={2.0} color="#8899CC" />
      <directionalLight position={[ 1, -7,  5]} intensity={1.5} color="#FFFFFF" />
      <pointLight position={[3, 5, -5]} intensity={3.0} color="#5060A0" distance={30} />
      <SceneEnvironment />
      <ASLogo scrollRef={scrollRef} zoomRef={zoomRef} />
    </Canvas>
  )
}
