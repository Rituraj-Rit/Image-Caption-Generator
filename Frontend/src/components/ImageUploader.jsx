import { useEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'

const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const MAX_SIZE_BYTES = 5 * 1024 * 1024

export default function ImageUploader({ selectedImage, setSelectedImage, onError, clearCaption }) {
  const [previewUrl, setPreviewUrl] = useState(null)
  const [localError, setLocalError] = useState('')
  const fileInputRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.uploader-card', { opacity: 0, y: 20, duration: 1, ease: 'power3.out' })
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!selectedImage) {
      setPreviewUrl(null)
      return
    }
    const url = URL.createObjectURL(selectedImage)
    setPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [selectedImage])

  const setErrorMessage = (message) => {
    setLocalError(message)
    onError(message)
  }

  const handleFile = (file) => {
    setLocalError('')
    onError('')
    clearCaption()

    if (!file) {
      setErrorMessage('Please upload a valid image.')
      return
    }
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setErrorMessage('Please upload a valid image.')
      return
    }
    if (file.size > MAX_SIZE_BYTES) {
      setErrorMessage('Please upload an image smaller than 5MB.')
      return
    }

    setSelectedImage(file)
  }

  const handleChange = (event) => {
    handleFile(event.target.files?.[0])
  }

  const handleDrop = (event) => {
    event.preventDefault()
    event.stopPropagation()
    handleFile(event.dataTransfer.files?.[0])
  }

  const handleRemove = () => {
    setSelectedImage(null)
    setLocalError('')
    onError('')
    clearCaption()
  }

  const dropMessage = useMemo(() => (selectedImage ? 'Drop a new image to replace' : 'Drag & drop image here or click to upload'), [selectedImage])

  return (
    <div className="uploader-card rounded-3xl border border-slate-800/80 bg-slate-950/75 p-5 shadow-xl">
      <div
        className="group relative flex min-h-[260px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-700/90 bg-slate-900/70 px-4 py-8 text-center transition hover:border-fuchsia-400/80 hover:bg-slate-900"
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
        onClick={() => fileInputRef.current?.click()}
      >
        <input ref={fileInputRef} type="file" accept="image/jpeg,image/jpg,image/png,image/webp" className="hidden" onChange={handleChange} />
        {previewUrl ? (
          <img src={previewUrl} alt="Preview" className="max-h-[260px] w-full rounded-3xl object-contain" />
        ) : (
          <div className="space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-800 text-fuchsia-300">
              <span className="text-2xl">📷</span>
            </div>
            <p className="text-lg font-semibold text-slate-100">{dropMessage}</p>
            <p className="text-sm leading-6 text-slate-400">JPG, JPEG, PNG, WEBP · max 5MB</p>
          </div>
        )}
      </div>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {selectedImage && <p className="text-sm text-slate-300">{selectedImage.name}</p>}
        {selectedImage && (
          <button type="button" onClick={handleRemove} className="inline-flex items-center justify-center rounded-full border border-slate-700/80 px-4 py-2 text-sm text-slate-200 transition hover:border-fuchsia-400 hover:text-white">
            Remove image
          </button>
        )}
      </div>
      {(localError || !selectedImage) && (
        <p className="mt-3 text-sm text-rose-300">{localError || 'Choose an image to continue.'}</p>
      )}
    </div>
  )
}
