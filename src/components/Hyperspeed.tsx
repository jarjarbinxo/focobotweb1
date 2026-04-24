import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import {
  EffectComposer,
  EffectPass,
  RenderPass,
  BloomEffect,
} from 'postprocessing'

interface HyperspeedProps {
  className?: string
}

export default function Hyperspeed({ className }: HyperspeedProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // ── Renderer ──────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setClearColor(0x08080c, 1)
    container.appendChild(renderer.domElement)

    // ── Scene & Camera ────────────────────────────────────────────────────
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x08080c)

    const camera = new THREE.PerspectiveCamera(
      70,
      container.clientWidth / container.clientHeight,
      0.1,
      200,
    )
    camera.position.set(0, 0, 5)
    camera.lookAt(0, 0, -10)

    // ── Post-processing ───────────────────────────────────────────────────
    const composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(scene, camera))

    const bloom = new BloomEffect({
      intensity: 1.5,
      luminanceThreshold: 0.15,
      luminanceSmoothing: 0.9,
    })
    composer.addPass(new EffectPass(camera, bloom))

    // ── Road ──────────────────────────────────────────────────────────────
    const roadGeo = new THREE.PlaneGeometry(20, 200)
    const roadMat = new THREE.MeshBasicMaterial({ color: 0x111111 })
    const road = new THREE.Mesh(roadGeo, roadMat)
    road.rotation.x = -Math.PI / 2
    road.position.set(0, -2, -95)
    scene.add(road)

    // ── Lane lines ────────────────────────────────────────────────────────
    const lanePositions: number[] = []
    const laneXs = [-3, -1, 1, 3]
    const dashLength = 3
    const gapLength = 3
    const totalDepth = 200
    for (const lx of laneXs) {
      let z = 0
      while (z < totalDepth) {
        lanePositions.push(lx, -2, -(z))
        lanePositions.push(lx, -2, -(z + dashLength))
        z += dashLength + gapLength
      }
    }
    const laneGeo = new THREE.BufferGeometry()
    laneGeo.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(lanePositions, 3),
    )
    const laneMat = new THREE.LineBasicMaterial({ color: 0x333333 })
    scene.add(new THREE.LineSegments(laneGeo, laneMat))

    // ── Light trails ─────────────────────────────────────────────────────
    interface Trail {
      line: THREE.Line
      speed: number
      length: number
    }

    const TRAIL_COUNT = 300
    const trails: Trail[] = []

    const matWhite = new THREE.LineBasicMaterial({ color: 0xffffff })
    const matOrange = new THREE.LineBasicMaterial({ color: 0xff7a1a })

    const rand = (min: number, max: number) =>
      Math.random() * (max - min) + min

    for (let i = 0; i < TRAIL_COUNT; i++) {
      const isOrange = i < TRAIL_COUNT * 0.4
      const mat = isOrange ? matOrange : matWhite

      const length = rand(0.2, 2.0)
      const x = rand(-6, 6)
      const z = rand(-180, -0.5)

      const pts = [
        new THREE.Vector3(x, rand(-1.9, -1.5), z),
        new THREE.Vector3(x, rand(-1.9, -1.5), z - length),
      ]
      const geo = new THREE.BufferGeometry().setFromPoints(pts)
      const line = new THREE.Line(geo, mat)
      scene.add(line)

      trails.push({ line, speed: rand(0.3, 2.5), length })
    }

    // ── Animation loop ────────────────────────────────────────────────────
    const clock = new THREE.Clock()
    let rafId = 0

    function animate() {
      rafId = requestAnimationFrame(animate)
      const delta = clock.getDelta()

      for (const trail of trails) {
        const posAttr = trail.line.geometry.attributes[
          'position'
        ] as THREE.BufferAttribute

        let z0 = posAttr.getZ(0)
        z0 += trail.speed * delta * 60 * 0.016 // normalise to ~60 fps feel

        if (z0 > 5) {
          const newX = rand(-6, 6)
          const newZ = -180
          const newLen = rand(0.2, 2.0)
          const y0 = rand(-1.9, -1.5)
          const y1 = rand(-1.9, -1.5)
          posAttr.setXYZ(0, newX, y0, newZ)
          posAttr.setXYZ(1, newX, y1, newZ - newLen)
          trail.length = newLen
        } else {
          const x0 = posAttr.getX(0)
          const y0 = posAttr.getY(0)
          const x1 = posAttr.getX(1)
          const y1 = posAttr.getY(1)
          posAttr.setXYZ(0, x0, y0, z0)
          posAttr.setXYZ(1, x1, y1, z0 - trail.length)
        }
        posAttr.needsUpdate = true
      }

      composer.render(delta)
    }

    animate()

    // ── Resize ────────────────────────────────────────────────────────────
    const ro = new ResizeObserver(() => {
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      composer.setSize(w, h)
    })
    ro.observe(container)

    // ── Cleanup ───────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={containerRef} className={className} />
}
