import { useEffect, useRef } from 'react'
import './App.css'

function App() {
  const layerRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    // Classic lerp - 10% of remaining distance each frame
    // This is the standard smooth-follow pattern used in interactive landing pages
    const ease = 0.8
    // How far the gradient travels (subtle)
    const range = 1.0

    const handleMouseMove = (e) => {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      mouseRef.current.x = (e.clientX - centerX) * range
      mouseRef.current.y = (e.clientY - centerY) * range
    }

    const handleMouseLeave = () => {
      mouseRef.current.x = 0
      mouseRef.current.y = 0
    }

    const animate = () => {
      const cur = currentRef.current
      const target = mouseRef.current

      // Lerp: move 8% closer to target each frame
      cur.x += (target.x - cur.x) * ease
      cur.y += (target.y - cur.y) * ease

      if (layerRef.current) {
        layerRef.current.style.transform = `translate(${cur.x}px, ${cur.y}px)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div className="page">
      {/* Gradient blobs */}
      <div className="gradient-layer" ref={layerRef}>
        <div className="blob green" />
        <div className="blob purple" />
        <div className="blob blue" />
        <div className="blob orange" />
      </div>

      {/* Blur overlay */}
      <div className="blur-overlay" />

      {/* Center content */}
      <div className="content">
        <h1 className="logo-text">LETSRALLY</h1>
        <p className="subtitle">Coming Fall 2025</p>
        <p className="location">Miami, Florida</p>
      </div>
    </div>
  )
}

export default App
