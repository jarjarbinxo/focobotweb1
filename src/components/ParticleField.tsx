import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface ParticleFieldProps {
  className?: string
}

export default function ParticleField({ className }: ParticleFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // ── Renderer ──────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false })
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(window.devicePixelRatio)

    const { clientWidth: w, clientHeight: h } = container
    renderer.setSize(w || 1, h || 1)
    container.appendChild(renderer.domElement)

    // ── Camera ────────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(60, (w || 1) / (h || 1), 0.01, 100)
    camera.position.set(0, 0, 3)
    camera.lookAt(0, 0, 0)

    // ── Scene ─────────────────────────────────────────────────
    const scene = new THREE.Scene()

    // ── Particles ─────────────────────────────────────────────
    const COUNT = 200
    const positions = new Float32Array(COUNT * 3)

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() * 2 - 1) * 3     // x: -3..3
      positions[i * 3 + 1] = (Math.random() * 2 - 1) * 2     // y: -2..2
      positions[i * 3 + 2] = (Math.random() * 2 - 1) * 1     // z: -1..1
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const material = new THREE.PointsMaterial({
      color: 0xff7a1a,
      size: 0.04,
      transparent: true,
      opacity: 0.4,
      sizeAttenuation: true,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    // ── Animation ─────────────────────────────────────────────
    let rafId: number
    let time = 0

    function animate() {
      rafId = requestAnimationFrame(animate)
      time += 1

      const pos = geometry.attributes.position as THREE.BufferAttribute
      const arr = pos.array as Float32Array

      for (let i = 0; i < COUNT; i++) {
        // Drift upward
        arr[i * 3 + 1] += 0.0008

        // Wrap y when above 2.5
        if (arr[i * 3 + 1] > 2.5) {
          arr[i * 3 + 1] = -2.5
        }

        // Gentle x oscillation
        arr[i * 3] += Math.sin(time * 0.01 + i * 0.1) * 0.0005
      }

      pos.needsUpdate = true
      renderer.render(scene, camera)
    }

    animate()

    // ── Resize ────────────────────────────────────────────────
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        if (width === 0 || height === 0) continue
        renderer.setSize(width, height)
        camera.aspect = width / height
        camera.updateProjectionMatrix()
      }
    })
    observer.observe(container)

    // ── Cleanup ───────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId)
      observer.disconnect()
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ pointerEvents: 'none' }}
    />
  )
}
