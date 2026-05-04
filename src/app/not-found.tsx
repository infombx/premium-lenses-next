'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function NotFound() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    // Stagger: lens appears → 404 → tagline → CTA
    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 1900),
      setTimeout(() => setPhase(4), 2500),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center overflow-hidden relative"
      style={{ background: '#080808' }}
    >
      {/* Ambient vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 55% at 50% 48%, rgba(80,130,200,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Scene */}
      <div className="relative flex flex-col items-center" style={{ marginTop: '-6rem' }}>

        {/* Fingertip + lens */}
        <div
          className="relative flex flex-col items-center"
          style={{
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 1.2s ease, transform 1.2s ease',
          }}
        >
          {/* Contact lens */}
          <div className="relative flex items-center justify-center" style={{ width: 160, height: 160 }}>
            {/* Outer glow */}
            <div
              className="absolute rounded-full"
              style={{
                width: 180,
                height: 180,
                background: 'radial-gradient(circle, rgba(100,160,240,0.12) 0%, transparent 70%)',
                filter: 'blur(12px)',
              }}
            />

            {/* Lens body */}
            <div
              className="absolute rounded-full"
              style={{
                width: 148,
                height: 148,
                background: 'radial-gradient(circle at 40% 35%, rgba(160,200,255,0.18) 0%, rgba(80,140,230,0.1) 40%, rgba(40,100,200,0.06) 70%, transparent 100%)',
                border: '1.5px solid rgba(120,175,255,0.25)',
                boxShadow: '0 0 32px rgba(80,140,240,0.15), inset 0 0 20px rgba(120,180,255,0.08)',
              }}
            />

            {/* Inner ring */}
            <div
              className="absolute rounded-full"
              style={{
                width: 108,
                height: 108,
                border: '1px solid rgba(100,160,240,0.2)',
                background: 'radial-gradient(circle at 40% 35%, rgba(200,225,255,0.08) 0%, transparent 60%)',
              }}
            />

            {/* Pupil ring */}
            <div
              className="absolute rounded-full"
              style={{
                width: 64,
                height: 64,
                border: '1px solid rgba(80,140,220,0.15)',
                background: 'transparent',
              }}
            />

            {/* Catchlight */}
            <div
              className="absolute rounded-full"
              style={{
                width: 22,
                height: 14,
                top: 28,
                left: 36,
                background: 'rgba(255,255,255,0.55)',
                filter: 'blur(4px)',
                transform: 'rotate(-20deg)',
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                width: 8,
                height: 5,
                top: 36,
                left: 52,
                background: 'rgba(255,255,255,0.35)',
                filter: 'blur(2px)',
              }}
            />
          </div>

          {/* Fingertip */}
          <div
            className="relative"
            style={{
              width: 88,
              height: 64,
              marginTop: -16,
              background: 'linear-gradient(180deg, #c8a882 0%, #a8865e 40%, #8a6a44 100%)',
              borderRadius: '44px 44px 20px 20px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.15)',
            }}
          >
            {/* Fingerprint hint */}
            <div
              className="absolute inset-x-0 top-3"
              style={{
                height: 28,
                background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)',
                borderRadius: '40px 40px 0 0',
                opacity: 0.6,
              }}
            />
          </div>
        </div>

        {/* Text block */}
        <div className="flex flex-col items-center mt-14 gap-4">
          {/* 404 */}
          <p
            className="text-white/20 text-sm tracking-[0.4em] uppercase"
            style={{
              opacity: phase >= 2 ? 1 : 0,
              transform: phase >= 2 ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.9s ease, transform 0.9s ease',
            }}
          >
            Error 404
          </p>

          {/* Headline */}
          <h1
            className="text-white text-3xl md:text-4xl font-light tracking-tight text-center"
            style={{
              opacity: phase >= 3 ? 1 : 0,
              transform: phase >= 3 ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.9s ease, transform 0.9s ease',
            }}
          >
            Looks Like This Page Is Missing.
          </h1>

          {/* CTA */}
          <div
            style={{
              opacity: phase >= 4 ? 1 : 0,
              transform: phase >= 4 ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.9s ease, transform 0.9s ease',
              marginTop: '0.5rem',
            }}
          >
            <Link
              href="/shop"
              className="inline-block px-8 py-3.5 text-sm font-light tracking-wide rounded-lg transition-colors"
              style={{
                background: 'rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.85)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.14)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.08)'
              }}
            >
              Explore our lenses
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
