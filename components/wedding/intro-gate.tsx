"use client"

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react"

const UNLOCK_EVENT = "wedding:start-autoscroll"
const RUN_EVENT = "wedding:run-autoscroll"
const INTRO_OPEN_EVENT = "wedding:intro-opened"

const OPEN_ANIMATION_MS = 1200
const HERO_WORD_REVEAL_WAIT_MS = 3200

const PETALS = [
  { x: -110, y: -120, r: -32, s: 0.9, d: 0, c: "rgba(246, 179, 116, 0.95)" },
  { x: 118, y: -102, r: 28, s: 1.05, d: 50, c: "rgba(166, 193, 232, 0.9)" },
  { x: -140, y: -20, r: -18, s: 0.82, d: 90, c: "rgba(240, 214, 156, 0.9)" },
  { x: 142, y: -12, r: 22, s: 0.88, d: 140, c: "rgba(212, 224, 173, 0.9)" },
  { x: -124, y: 92, r: -40, s: 1.1, d: 180, c: "rgba(198, 178, 232, 0.88)" },
  { x: 132, y: 108, r: 38, s: 0.92, d: 220, c: "rgba(248, 186, 191, 0.9)" },
  { x: -44, y: -148, r: -50, s: 0.78, d: 260, c: "rgba(255, 228, 150, 0.95)" },
  { x: 56, y: -156, r: 44, s: 0.86, d: 300, c: "rgba(183, 213, 244, 0.9)" },
  { x: -166, y: 36, r: -30, s: 0.74, d: 340, c: "rgba(243, 196, 133, 0.92)" },
  { x: 170, y: 30, r: 30, s: 0.76, d: 380, c: "rgba(176, 226, 211, 0.9)" },
  { x: -70, y: 160, r: -28, s: 0.82, d: 420, c: "rgba(250, 201, 211, 0.92)" },
  { x: 78, y: 166, r: 26, s: 0.84, d: 460, c: "rgba(201, 211, 245, 0.9)" },
] as const

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
      <div className="intro-gate-petals" aria-hidden>
        {PETALS.map((petal, index) => (
          <span
            key={index}
            className="intro-gate-petal"
            style={
              {
                "--petal-x": `${petal.x}px`,
                "--petal-y": `${petal.y}px`,
                "--petal-r": `${petal.r}deg`,
                "--petal-s": String(petal.s),
                "--petal-delay": `${petal.d}ms`,
                "--petal-color": petal.c,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <button
        type="button"
        onClick={handleOpen}
        className="intro-gate-button"
        aria-label="Open invitation"
      >
        <span className="intro-gate-script">F &amp; S</span>
      </button>
    </div>
  )
}
