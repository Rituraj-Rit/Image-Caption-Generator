export default function Footer() {
  return (
    <footer className="border-t border-slate-800/70 bg-slate-950/95 py-8 text-slate-400">
      <div className="container mx-auto px-4 text-center">
        <p className="mt-3 text-sm">© {new Date().getFullYear()} CaptionAI. All rights reserved.</p>
      </div>
    </footer>
  )
}
