export const generateCaption = async (imageFile) => {
  const formData = new FormData()
  formData.append('image', imageFile)

  const response = await fetch('/api/posts', {
    method: 'POST',
    credentials: 'include',
    body: formData,
  })

  if (!response.ok) {
    const payload = await response.json().catch(() => null)
    const message = payload?.message || 'Unable to generate caption. Please try again.'
    throw new Error(message)
  }

  const data = await response.json()
  return data
}
