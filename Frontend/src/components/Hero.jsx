import { useEffect, useState } from 'react'
import { gsap } from 'gsap'

function ParticleText({ text }) {
  return (
    <div className="hero-title mx-auto max-w-5xl px-4">
      <h1 className="text-center text-4xl font-black tracking-[-0.05em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
        {text}
      </h1>
      <p className="mx-auto mt-4 max-w-3xl text-center text-base leading-8 text-slate-300 sm:text-lg">
        Transform your images into meaningful words with AI-powered image understanding.
      </p>
    </div>
  )
}

function RippleDistortion({ src, className }) {
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    let active = true
    const image = new Image()
    image.src = src
    image.onload = () => {
      if (active) setImageLoaded(true)
    }
    image.onerror = () => {
      if (active) setImageLoaded(false)
    }
    return () => {
      active = false
    }
  }, [src])

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{
          backgroundImage: imageLoaded ? `url(${src})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.5) saturate(1.05)',
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.22),_transparent_18%),radial-gradient(circle_at_80%_20%,_rgba(139,92,246,0.14),_transparent_24%),linear-gradient(180deg,rgba(15,23,42,0.95),rgba(15,23,42,0.78))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(248,250,252,0.06),transparent_20%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_85%,rgba(168,85,247,0.12),transparent_20%)]" />
    </div>
  )
}

export default function Hero() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-title', { opacity: 0, y: 30, duration: 1, delay: 0.2 })
      gsap.from('.hero-copy', { opacity: 0, y: 20, duration: 1, delay: 0.35 })
      gsap.from('.hero-cta', { opacity: 0, y: 20, duration: 1, delay: 0.5 })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="home" className="relative overflow-hidden bg-slate-950/95 pb-16 pt-8">
      <div className="absolute inset-0">
        <RippleDistortion src="/hero.jpg" className="h-full w-full" />
      </div>
      <div className="absolute inset-0 bg-slate-950/80" />
      <div className="relative mx-auto flex min-h-[72vh] max-w-7xl flex-col items-center justify-center px-4 text-center text-white">
        <div className="relative z-10 space-y-8 py-16 sm:py-14">
          <div className="inline-flex items-center rounded-full border border-fuchsia-400/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-fuchsia-200 backdrop-blur-sm">
            AI POWERED IMAGE CAPTION GENERATOR
          </div>
          <ParticleText text="AI Image Caption Generator" />
          <div className="mx-auto max-w-2xl text-slate-300">
            <p className="hero-copy text-base leading-8 sm:text-lg">Transform your images into meaningful words with AI-powered image understanding.</p>
          </div>
          <div className="hero-cta mx-auto flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a href="#generate" className="inline-flex items-center justify-center rounded-full bg-fuchsia-500 px-7 py-3 text-sm font-semibold text-slate-950 transition hover:bg-fuchsia-400">Generate Caption</a>
            <a href="https://github.com/Rituraj-Rit/Image-Caption-Generator" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-slate-700/80 bg-slate-950/90 px-7 py-3 text-sm font-semibold text-slate-100 transition hover:border-fuchsia-400 hover:text-white">View GitHub</a>
          </div>
        </div>
      </div>
    </section>
  )
}
