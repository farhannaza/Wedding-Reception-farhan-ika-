"use client"

import { useEffect, useRef, useState } from "react"

const START_EVENT = "wedding:start-autoscroll"
const RESUME_DELAY_MS = 2000
const SPEED_PX_PER_SEC = 55

function lockPageScroll(lock: boolean) {
  document.documentElement.style.overflow = lock ? "hidden" : ""
  document.body.style.overflow = lock ? "hidden" : ""
}

function isAtBottom() {
  return Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight
}

export function AutoScrollController() {
  const [hasStarted, setHasStarted] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const rafRef = useRef<number | null>(null)
  const lastTimeRef = useRef(0)
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const applyPreference = () => setPrefersReducedMotion(mediaQuery.matches)
    applyPreference()
    mediaQuery.addEventListener("change", applyPreference)
    return () => mediaQuery.removeEventListener("change", applyPreference)
  }, [])

  useEffect(() => {
    lockPageScroll(!hasStarted)
    return () => lockPageScroll(false)
  }, [hasStarted])

  useEffect(() => {
    const startAutoScroll = () => {
      setHasStarted(true)
      if (!prefersReducedMotion) {
        setIsRunning(true)
      }
    }

    window.addEventListener(START_EVENT, startAutoScroll)
    return () => window.removeEventListener(START_EVENT, startAutoScroll)
  }, [prefersReducedMotion])

  useEffect(() => {
    if (!hasStarted) return

    const pauseAndResume = () => {
      setIsRunning(false)
      lastTimeRef.current = 0

      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
      resumeTimeoutRef.current = setTimeout(() => {
        if (!isAtBottom() && !prefersReducedMotion) {
          setIsRunning(true)
        }
      }, RESUME_DELAY_MS)
    }

    window.addEventListener("wheel", pauseAndResume, { passive: true })
    window.addEventListener("touchstart", pauseAndResume, { passive: true })
    window.addEventListener("pointerdown", pauseAndResume, { passive: true })
    window.addEventListener("keydown", pauseAndResume)

    return () => {
      window.removeEventListener("wheel", pauseAndResume)
      window.removeEventListener("touchstart", pauseAndResume)
      window.removeEventListener("pointerdown", pauseAndResume)
      window.removeEventListener("keydown", pauseAndResume)
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    }
  }, [hasStarted, prefersReducedMotion])

  useEffect(() => {
    if (!hasStarted || !isRunning || prefersReducedMotion) return

    const tick = (now: number) => {
      const dt = lastTimeRef.current ? now - lastTimeRef.current : 0
      lastTimeRef.current = now

      if (isAtBottom()) {
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

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [hasStarted, isRunning, prefersReducedMotion])

  return null
}
