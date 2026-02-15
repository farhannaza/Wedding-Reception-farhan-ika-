"use client"

import { useEffect, useRef, useState } from "react"

const UNLOCK_EVENT = "wedding:start-autoscroll"
const RUN_EVENT = "wedding:run-autoscroll"
const SPEED_PX_PER_SEC = 55

function lockPageScroll(lock: boolean) {
  document.documentElement.style.overflow = lock ? "hidden" : ""
  document.body.style.overflow = lock ? "hidden" : ""
}

function isAtBottom() {
  return Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight
}

export function AutoScrollController() {
  const [hasStarted, setHasStarted] = useState(() => {
    if (typeof window === "undefined") return false
    return window.location.hash.length > 0
  })
  const [isRunning, setIsRunning] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const rafRef = useRef<number | null>(null)
  const lastTimeRef = useRef(0)

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
    // Force a consistent first-load state on mobile: always start at hero unless hash is present.
    const previousRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = "manual"

    let rafId = 0
    if (window.location.hash.length === 0) {
      rafId = requestAnimationFrame(() => {
        window.scrollTo(0, 0)
      })
    } else {
      setHasStarted(true)
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.history.scrollRestoration = previousRestoration
    }
  }, [])

  useEffect(() => {
    const unlockScroll = () => {
      setHasStarted(true)
    }

    const runAutoScroll = () => {
      setHasStarted(true)
      if (!prefersReducedMotion && !isAtBottom()) {
        setIsRunning(true)
      }
    }

    window.addEventListener(UNLOCK_EVENT, unlockScroll)
    window.addEventListener(RUN_EVENT, runAutoScroll)
    return () => {
      window.removeEventListener(UNLOCK_EVENT, unlockScroll)
      window.removeEventListener(RUN_EVENT, runAutoScroll)
    }
  }, [prefersReducedMotion])

  useEffect(() => {
    if (!hasStarted) return

    const pauseAutoScroll = () => {
      setIsRunning(false)
      lastTimeRef.current = 0
    }

    window.addEventListener("wheel", pauseAutoScroll, { passive: true })
    window.addEventListener("touchstart", pauseAutoScroll, { passive: true })
    window.addEventListener("pointerdown", pauseAutoScroll, { passive: true })
    window.addEventListener("keydown", pauseAutoScroll)

    return () => {
      window.removeEventListener("wheel", pauseAutoScroll)
      window.removeEventListener("touchstart", pauseAutoScroll)
      window.removeEventListener("pointerdown", pauseAutoScroll)
      window.removeEventListener("keydown", pauseAutoScroll)
    }
  }, [hasStarted])

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
