import { useEffect, useMemo } from 'react'
import BlurText from './BlurText.jsx'
import { gsap } from 'gsap'

export default function CaptionResult({ caption, status, error, onClear }) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (status === 'success') {
        gsap.from('.caption-result', { opacity: 0, y: 20, duration: 0.8 })
      }
    })
    return () => ctx.revert()
  }, [status])

  const canCopy = useMemo(() => Boolean(caption), [caption])

  const handleCopy = async () => {
    if (!caption) return
    await navigator.clipboard.writeText(caption).catch(() => {})
  }

  return (
    <div className="caption-result rounded-3xl bg-slate-950/85 p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-fuchsia-400">Caption result</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">AI Generated Caption</h3>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-300">AI Generated</div>
      </div>
      {status === 'loading' && (
        <div className="rounded-3xl border border-fuchsia-500/20 bg-slate-900/80 p-6 text-center text-sm text-slate-200">
          ✦ AI is analyzing your image...
        </div>
      )}
      {error && status !== 'loading' && (
        <div className="rounded-3xl border border-rose-500/20 bg-rose-500/10 p-5 text-sm text-rose-200">{error}</div>
      )}
      {caption && status === 'success' && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-800/80 bg-slate-900/90 p-6 text-slate-100 shadow-inner">
            <BlurText text={caption} delay={120} animateBy="words" direction="top" className="text-lg leading-8 md:text-xl" />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <button onClick={handleCopy} className="inline-flex w-full items-center justify-center rounded-3xl bg-fuchsia-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-fuchsia-400 sm:w-auto">Copy Caption</button>
            <button onClick={onClear} className="inline-flex w-full items-center justify-center rounded-3xl border border-slate-700/80 bg-slate-900 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-fuchsia-400 sm:w-auto">Clear</button>
          </div>
        </div>
      )}
      {!caption && status !== 'loading' && !error && (
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/80 p-5 text-sm text-slate-400">
          <p className="font-semibold text-white">✦ YOUR AI CAPTION WILL APPEAR HERE</p>
          <p className="mt-2">Upload an image above and let AI transform visual information into words.</p>
        </div>
      )}
    </div>
  )
}
