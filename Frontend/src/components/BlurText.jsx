import { useEffect, useMemo, useState } from 'react'
import './CaptionResult.module.css'

export default function BlurText({ text, delay = 120, animateBy = 'words', direction = 'top', className = '' }) {
  const [isVisible, setIsVisible] = useState(false)
  const units = useMemo(() => text.split(' '), [text])

  useEffect(() => {
    setIsVisible(false)
    const timer = window.setTimeout(() => setIsVisible(true), 10)
    return () => window.clearTimeout(timer)
  }, [text])

  return (
    <div className={`blur-text ${className}`}>
      {units.map((unit, index) => (
        <span
          key={`${unit}-${index}`}
          className={isVisible ? 'blur-text-visible inline-block mr-1 whitespace-pre' : 'inline-block mr-1 whitespace-pre'}
          style={{ animationDelay: `${index * delay}ms` }}
        >
          {unit}
        </span>
      ))}
    </div>
  )
}
