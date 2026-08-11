import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { gsap } from 'gsap'

export default function AuthPage() {
  const { login, register, error, setError, loading } = useAuth()
  const [mode, setMode] = useState('login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.auth-card', { opacity: 0, y: 30, duration: 1, ease: 'power3.out' })
    })
    return () => ctx.revert()
  }, [])

  const handleModeChange = (newMode) => {
    setMessage('')
    setError('')
    setMode(newMode)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setMessage('')

    if (!username || !password) {
      setError('Please enter both username and password.')
      return
    }

    try {
      if (mode === 'login') {
        await login(username, password)
      } else {
        await register(username, password)
        setMessage('Registration successful. Please login.')
        setMode('login')
        setUsername('')
        setPassword('')
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="auth-shell min-h-screen bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.18),_transparent_24%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.12),transparent_22%),#09090f] text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-12">
        <div className="auth-card w-full rounded-[2rem] border border-white/10 bg-slate-950/90 p-8 shadow-[0_40px_120px_rgba(15,23,42,0.45)] backdrop-blur-xl sm:p-10">
          <div className="mb-8 text-center">
            {/* <p className="text-sm uppercase tracking-[0.35em] text-fuchsia-400">CaptionAI</p> */}
            <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">AI Image Caption Generator</h1>
            <p className="mt-3 max-w-2xl mx-auto text-base leading-7 text-slate-400">Register or login to access the real AI caption generator backed by your existing backend.</p>
          </div>
          <div className="mb-8 flex items-center justify-center gap-2 rounded-full border border-slate-800/80 bg-slate-900/75 p-1 text-sm text-slate-200">
            <button type="button" onClick={() => handleModeChange('login')} className={`rounded-full px-5 py-3 transition ${mode === 'login' ? 'bg-fuchsia-500 text-slate-950' : 'hover:bg-white/5'}`}>Login</button>
            <button type="button" onClick={() => handleModeChange('register')} className={`rounded-full px-5 py-3 transition ${mode === 'register' ? 'bg-fuchsia-500 text-slate-950' : 'hover:bg-white/5'}`}>Register</button>
          </div>
          {message && <div className="mb-6 rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-200">{message}</div>}
          {error && <div className="mb-6 rounded-3xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-200">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-200">Username</label>
              <input value={username} onChange={(e) => setUsername(e.target.value)} className="mt-3 w-full rounded-3xl border border-slate-800/90 bg-slate-900/80 px-4 py-4 text-slate-100 outline-none transition focus:border-fuchsia-400" placeholder="Enter your username" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-200">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-3 w-full rounded-3xl border border-slate-800/90 bg-slate-900/80 px-4 py-4 text-slate-100 outline-none transition focus:border-fuchsia-400" placeholder="Enter your password" />
            </div>
            <button type="submit" disabled={loading} className="w-full rounded-3xl bg-fuchsia-500 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-fuchsia-400 disabled:cursor-not-allowed disabled:bg-slate-700/70">{loading ? 'Processing...' : mode === 'login' ? 'Login' : 'Register'}</button>
          </form>
        </div>
      </div>
    </div>
  )
}
