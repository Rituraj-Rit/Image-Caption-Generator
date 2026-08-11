import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { useAuth } from '../context/AuthContext.jsx'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Generate', href: '#generate' },
  { label: 'How It Works', href: '#how-it-works' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.nav-brand', { opacity: 0, y: -18, duration: 0.8 })
      gsap.from('.nav-link', { opacity: 0, x: -16, duration: 0.75, delay: 0.2, stagger: 0.08 })
      gsap.from('.nav-github', { opacity: 0, y: -10, duration: 0.8, delay: 0.3 })
    })
    return () => ctx.revert()
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a className="nav-brand text-xl font-semibold tracking-[0.22em] text-slate-100" href="#home">✦ CaptionAI</a>
        <div className="hidden md:flex flex-1 items-center justify-center">
          <div className="flex items-center gap-6 text-sm font-medium text-slate-100">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="nav-link transition-colors duration-200 hover:text-fuchsia-300">{item.label}</a>
            ))}
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4">
          {user && <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100">{user.username}</div>}
          <button type="button" onClick={logout} className="rounded-full border border-slate-700/80 bg-slate-900/90 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-fuchsia-400 hover:text-white">Logout</button>
          <a href="https://github.com/Rituraj-Rit/Image-Caption-Generator" target="_blank" rel="noreferrer" className="nav-github inline-flex rounded-full bg-accent px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-violet-500">GitHub</a>
        </div>
        <button onClick={() => setMenuOpen((open) => !open)} className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-700/80 bg-slate-950/90 text-slate-100 transition hover:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40">
          <span className="sr-only">Toggle navigation</span>
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
        </button>
      </div>
      {menuOpen && (
        <div className="border-t border-white/5 bg-slate-950/95 px-5 py-4 md:hidden">
          <div className="flex flex-col gap-3 text-slate-100">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="block rounded-2xl border border-white/5 bg-slate-900/80 px-4 py-3 transition hover:border-accent hover:text-fuchsia-300">{item.label}</a>
            ))}
            {user && (
              <div className="space-y-2 rounded-3xl border border-white/10 bg-slate-900/80 p-4 text-sm text-slate-100">
                <div>{user.username}</div>
                <button type="button" onClick={logout} className="w-full rounded-full border border-slate-700/80 bg-slate-950/90 px-4 py-2 text-sm text-slate-100 transition hover:border-fuchsia-400 hover:text-white">Logout</button>
              </div>
            )}
            <a href="https://github.com/Rituraj-Rit/Image-Caption-Generator" target="_blank" rel="noreferrer" className="block rounded-2xl bg-accent px-4 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-violet-500">GitHub</a>
          </div>
        </div>
      )}
    </header>
  )
}
