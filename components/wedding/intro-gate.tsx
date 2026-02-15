"use client"

import { useEffect, useMemo, useRef, useState } from "react"

const UNLOCK_EVENT = "wedding:start-autoscroll"
const RUN_EVENT = "wedding:run-autoscroll"
const INTRO_OPEN_EVENT = "wedding:intro-opened"

const OPEN_ANIMATION_MS = 900
const HERO_WORD_REVEAL_WAIT_MS = 3200

export function IntroGate() {
  const [stage, setStage] = useState<"closed" | "opening" | "hidden">("closed")
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const shouldSkipGate = useMemo(() => {
    if (typeof window === "undefined") return false
    return window.location.hash.length > 0
  }, [])

  useEffect(() => {
    if (!shouldSkipGate) return
    setStage("hidden")
    window.dispatchEvent(new Event(UNLOCK_EVENT))
    window.dispatchEvent(new Event(INTRO_OPEN_EVENT))
  }, [shouldSkipGate])

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout)
    }
  }, [])

  const schedule = (fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms)
    timeoutsRef.current.push(id)
  }

  const handleOpen = () => {
    if (stage !== "closed") return

    setStage("opening")

    schedule(() => {
      setStage("hidden")
      window.dispatchEvent(new Event(UNLOCK_EVENT))
      window.dispatchEvent(new Event(INTRO_OPEN_EVENT))
    }, OPEN_ANIMATION_MS)

    schedule(() => {
      window.dispatchEvent(new Event(RUN_EVENT))
    }, OPEN_ANIMATION_MS + HERO_WORD_REVEAL_WAIT_MS)
  }

  if (stage === "hidden") return null

  return (
    <div
      className={`intro-gate fixed inset-0 z-[100] ${stage === "opening" ? "intro-gate-opening" : ""}`}
      aria-hidden={stage !== "closed"}
    >
      <div className="intro-gate-bg" />
      <div className="intro-gate-left" />
      <div className="intro-gate-right" />
      <div className="intro-gate-line" />

      <button
        type="button"
        onClick={handleOpen}
        className="intro-gate-button"
        aria-label="Open invitation"
      >
        <span className="intro-gate-script">Farhan</span>
        <span className="intro-gate-amp">&amp;</span>
        <span className="intro-gate-script">Syafika</span>
        <span className="intro-gate-open">Buka</span>
      </button>
    </div>
  )
}
