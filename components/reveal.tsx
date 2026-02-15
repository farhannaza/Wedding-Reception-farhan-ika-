"use client"

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"

type RevealProps = {
  children: ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
}

export function Reveal({
  children,
  direction = "up",
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [hasEntered, setHasEntered] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px",
      }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const offset = {
    up: { x: 0, y: 44 },
    down: { x: 0, y: -44 },
    left: { x: 44, y: 0 },
    right: { x: -44, y: 0 },
  }[direction]

  const style = {
    "--reveal-x": `${offset.x}px`,
    "--reveal-y": `${offset.y}px`,
    animationDelay: hasEntered && delay ? `${delay}ms` : undefined,
  } as CSSProperties

  return (
    <div
      ref={ref}
      style={style}
      className={`reveal-dramatic-base ${hasEntered ? "reveal-dramatic-enter" : "reveal-dramatic-hidden"}`}
    >
      {children}
    </div>
  )
}
