import { useEffect } from 'react'
import { generateCaption } from '../services/captionService.js'
import { gsap } from 'gsap'

export default function CaptionGenerator({ selectedImage, onGenerate, onError, status, setStatus, clearImage }) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.generate-panel', { opacity: 0, y: 30, duration: 0.9, ease: 'power3.out' })
    })
    return () => ctx.revert()
  }, [])

  const handleGenerate = async () => {
    onError('')
    if (!selectedImage) {
      onError('Please upload an image first.')
      return
    }

    if (status === 'loading') return

    setStatus('loading')
    try {
      const data = await generateCaption(selectedImage)
      if (!data?.post?.caption) {
        throw new Error('Unable to generate caption. Please try again.')
      }
      onGenerate(data.post.caption)
      setStatus('success')
    } catch (error) {
      if (error.message.includes('Failed to fetch')) {
        onError('Unable to connect to the backend.')
      } else {
        onError(error.message || 'Unable to generate caption. Please try again.')
      }
      setStatus('error')
    }
  }

  return (
    <div className="generate-panel rounded-3xl border border-slate-800/80 bg-slate-950/75 p-6 shadow-xl">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-white">Generate Caption</h3>
          <p className="mt-2 text-sm text-slate-400">Send your image to the backend and receive a real AI caption.</p>
        </div>
        <button type="button" onClick={clearImage} className="rounded-full border border-slate-700/80 px-4 py-2 text-sm text-slate-200 transition hover:border-fuchsia-400 hover:text-white">
          Reset
        </button>
      </div>
      <div className="space-y-4">
        <button
          type="button"
          onClick={handleGenerate}
          disabled={!selectedImage || status === 'loading'}
          className="inline-flex w-full items-center justify-center rounded-3xl bg-fuchsia-500 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-fuchsia-400 disabled:cursor-not-allowed disabled:bg-slate-700/70"
        >
          {status === 'loading' ? '✦ AI IS ANALYZING YOUR IMAGE...' : 'Generate Caption ✦'}
        </button>
        <p className="text-sm text-slate-400">Supported formats: JPG, JPEG, PNG, WEBP · max 5MB</p>
      </div>
    </div>
  )
}
