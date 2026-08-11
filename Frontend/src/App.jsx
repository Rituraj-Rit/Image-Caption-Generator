import { useMemo, useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import AuthPage from './components/AuthPage.jsx'
import GeneratorPage from './components/GeneratorPage.jsx'
import './index.css'

function AppContent() {
  const { isAuthenticated } = useAuth()
  const [selectedImage, setSelectedImage] = useState(null)
  const [caption, setCaption] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const handleGenerateCaption = (value) => {
    setCaption(value)
  }

  const handleError = (message) => {
    setError(message)
  }

  const clearCaption = () => {
    setCaption('')
    setStatus('idle')
    setError('')
  }

  const clearImage = () => {
    setSelectedImage(null)
    setCaption('')
    setError('')
    setStatus('idle')
  }

  const generatedCaption = useMemo(() => caption, [caption])

  if (!isAuthenticated) {
    return <AuthPage />
  }

  return (
    <GeneratorPage
      selectedImage={selectedImage}
      setSelectedImage={setSelectedImage}
      caption={generatedCaption}
      status={status}
      error={error}
      onGenerateCaption={handleGenerateCaption}
      onError={handleError}
      clearCaption={clearCaption}
      clearImage={clearImage}
      setStatus={setStatus}
    />
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
