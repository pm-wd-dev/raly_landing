import { useEffect, useRef } from 'react'
import './App.css'

function App() {
  const layerRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    const easeFollow = 0.05
    const easeReset = 0.03
    const range = 1.0
    let isInteracting = false

    const handleMouseMove = (e) => {
      isInteracting = true
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      mouseRef.current.x = (e.clientX - centerX) * range
      mouseRef.current.y = (e.clientY - centerY) * range
    }

    const handleTouchStart = (e) => {
      e.preventDefault()
      isInteracting = true
      const touch = e.touches[0]
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      mouseRef.current.x = (touch.clientX - centerX) * range
      mouseRef.current.y = (touch.clientY - centerY) * range
    }

    const handleTouchMove = (e) => {
      e.preventDefault()
      isInteracting = true
      const touch = e.touches[0]
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      mouseRef.current.x = (touch.clientX - centerX) * range
      mouseRef.current.y = (touch.clientY - centerY) * range
    }

    const handleTouchEnd = () => {
      isInteracting = false
      mouseRef.current.x = 0
      mouseRef.current.y = 0
    }

    const handleMouseLeave = () => {
      isInteracting = false
      mouseRef.current.x = 0
      mouseRef.current.y = 0
    }

    const animate = () => {
      const cur = currentRef.current
      const target = mouseRef.current
      const ease = isInteracting ? easeFollow : easeReset

      cur.x += (target.x - cur.x) * ease
      cur.y += (target.y - cur.y) * ease

      if (layerRef.current) {
        layerRef.current.style.transform = `translate(${cur.x}px, ${cur.y}px)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchstart', handleTouchStart, { passive: false })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd)
    window.addEventListener('touchcancel', handleTouchEnd)
    document.addEventListener('mouseleave', handleMouseLeave)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('touchcancel', handleTouchEnd)
      document.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div className="page">
      {/* Gradient blobs */}
      <div className="gradient-layer" ref={layerRef}>
       <div className="blob orange" />
       <div className="blob blue" />
        <div className="blob purple" />
         <div className="blob green" />
      </div>

      {/* Blur overlay */}
      <div className="blur-overlay" />

      {/* Center content */}
      <div className="content">
        <img src="/logo.svg" alt="LETSRALLY" className="logo-img" />
        <p className="subtitle">Coming Fall 2026</p>
        <p className="location">Miami, Florida</p>
      </div>
    </div>
  )
}

export default App
