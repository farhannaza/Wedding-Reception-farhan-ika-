"use client"

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"

const INTRO_OPEN_EVENT = "wedding:intro-opened"

type RevealProps = {
  children: ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
}

function oppositeDirection(direction: "up" | "down" | "left" | "right") {
  return (
    {
      up: "down",
      down: "up",
      left: "right",
      right: "left",
    } as const
  )[direction]
}

export function Reveal({
  children,
  direction = "up",
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [allowReveal, setAllowReveal] = useState(() => {
    if (typeof window === "undefined") return false
    return window.location.hash.length > 0
  })
  const [isVisible, setIsVisible] = useState(false)
  const [activeDirection, setActiveDirection] = useState(direction)
  const lastScrollYRef = useRef(0)

  useEffect(() => {
    if (allowReveal) return

    const onIntroOpened = () => setAllowReveal(true)
    window.addEventListener(INTRO_OPEN_EVENT, onIntroOpened)
    return () => window.removeEventListener(INTRO_OPEN_EVENT, onIntroOpened)
  }, [allowReveal])

  useEffect(() => {
    lastScrollYRef.current = window.scrollY
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!allowReveal) {
          setIsVisible(false)
          return
        }

        const currentScrollY = window.scrollY
        const isScrollingUp = currentScrollY < lastScrollYRef.current
        lastScrollYRef.current = currentScrollY

        if (entry.isIntersecting) {
          setActiveDirection(isScrollingUp ? oppositeDirection(direction) : direction)
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px",
      }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [allowReveal, direction])

  useEffect(() => {
    if (!allowReveal || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const inView = rect.bottom > 0 && rect.top < window.innerHeight
    if (inView) setIsVisible(true)
  }, [allowReveal])

  const offset = {
    up: { x: 0, y: 44 },
    down: { x: 0, y: -44 },
    left: { x: 44, y: 0 },
    right: { x: -44, y: 0 },
  }[activeDirection]

  const style = {
    "--reveal-x": `${offset.x}px`,
    "--reveal-y": `${offset.y}px`,
    animationDelay: isVisible && delay ? `${delay}ms` : undefined,
  } as CSSProperties

  return (
    <div
      ref={ref}
      style={style}
      className={`reveal-dramatic-base ${isVisible ? "reveal-dramatic-enter" : "reveal-dramatic-hidden"}`}
    >
      {children}
    </div>
  )
}
