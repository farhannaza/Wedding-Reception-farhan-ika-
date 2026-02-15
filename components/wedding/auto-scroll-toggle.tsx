"use client"

import { useEffect, useRef, useState } from "react"

export function AutoScrollToggle() {
  const [isRunning, setIsRunning] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const rafRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number>(0)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const applyPreference = () => setPrefersReducedMotion(mediaQuery.matches)
    applyPreference()
    mediaQuery.addEventListener("change", applyPreference)
    return () => mediaQuery.removeEventListener("change", applyPreference)
  }, [])

  useEffect(() => {
    if (!isRunning || prefersReducedMotion) return

    const SPEED_PX_PER_SEC = 35

    const tick = (now: number) => {
      const dt = lastTimeRef.current ? now - lastTimeRef.current : 0
      lastTimeRef.current = now

      const atBottom =
        Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight

      if (atBottom) {
        setIsRunning(false)
        lastTimeRef.current = 0
        return
      }

      if (dt > 0) {
        window.scrollBy(0, (SPEED_PX_PER_SEC * dt) / 1000)
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    const pause = () => {
      setIsRunning(false)
      lastTimeRef.current = 0
    }

    window.addEventListener("wheel", pause, { passive: true })
    window.addEventListener("touchstart", pause, { passive: true })
    window.addEventListener("keydown", pause)

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      window.removeEventListener("wheel", pause)
      window.removeEventListener("touchstart", pause)
      window.removeEventListener("keydown", pause)
    }
  }, [isRunning, prefersReducedMotion])

  return (
    <button
      type="button"
      onClick={() => {
        if (prefersReducedMotion) return
        setIsRunning((prev) => !prev)
      }}
      disabled={prefersReducedMotion}
      className="fixed bottom-20 right-4 z-50 min-h-[44px] rounded-full border border-gold/30 bg-foreground/95 px-4 py-2 font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-gold transition-colors active:bg-foreground/85 disabled:cursor-not-allowed disabled:opacity-50 md:bottom-6 md:right-6 md:text-xs"
      aria-label={isRunning ? "Pause auto scroll" : "Start auto scroll"}
    >
      {prefersReducedMotion ? "Auto Scroll Off" : isRunning ? "Pause Scroll" : "Auto Scroll"}
    </button>
  )
}
