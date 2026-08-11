import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  { label: 'Upload', detail: 'Choose an image and preview it instantly.' },
  { label: 'Analyze', detail: 'AI analyzes the scene and visual content accurately.' },
  { label: 'Generate', detail: 'Receive a caption that turns vision into words.' },
]

export default function HowItWorks() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.how-step').forEach((step) => {
        gsap.from(step, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 85%',
            end: 'bottom 60%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="how-it-works" className="container mx-auto px-4 py-16">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-fuchsia-400">How It Works</p>
        <h2 className="mt-4 text-4xl font-semibold text-white">A fast flow from image to caption.</h2>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {steps.map((step, index) => (
          <div key={step.label} className="how-step rounded-3xl border border-slate-800/80 bg-slate-900/80 p-6 shadow-xl">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-fuchsia-500 text-sm font-semibold text-slate-950">{`0${index + 1}`}</div>
            <h3 className="mb-3 text-xl font-semibold text-white">{step.label}</h3>
            <p className="text-slate-400">{step.detail}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
