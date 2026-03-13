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
    let breatheTime = 0
    const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    // Breathing config (mobile only)
    const breatheSpeed = 0.005
    const breatheRangeX = 80
    const breatheRangeY = 50

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

      if (isInteracting) {
        // Follow cursor/finger
        cur.x += (target.x - cur.x) * easeFollow
        cur.y += (target.y - cur.y) * easeFollow
      } else if (isMobile) {
        // Breathing effect on mobile only — gentle infinite motion
        breatheTime += breatheSpeed
        const breatheX = Math.sin(breatheTime) * breatheRangeX
        const breatheY = Math.cos(breatheTime * 0.7) * breatheRangeY
        cur.x += (breatheX - cur.x) * easeReset
        cur.y += (breatheY - cur.y) * easeReset
      } else {
        // Desktop — ease back to center
        cur.x += (target.x - cur.x) * easeReset
        cur.y += (target.y - cur.y) * easeReset
      }

      if (layerRef.current) {
        if (!isInteracting && isMobile) {
          const scale = 1 + Math.sin(breatheTime * 0.5) * 0.03
          layerRef.current.style.transform = `translate(${cur.x}px, ${cur.y}px) scale(${scale})`
        } else {
          layerRef.current.style.transform = `translate(${cur.x}px, ${cur.y}px)`
        }
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
