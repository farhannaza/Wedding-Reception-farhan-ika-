"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

type RevealProps = {
  children: ReactNode
  /** Direction the content should appear from */
  direction?: "up" | "down" | "left" | "right"
  /** Delay in ms before animating once in view */
  delay?: number
}

export function Reveal({
  children,
  direction = "up",
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.2,
      },
    )

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [])

  const base =
    "transition-all duration-700 ease-out will-change-transform opacity-0"

  const directionClass = {
    up: "translate-y-6",
    down: "-translate-y-6",
    left: "translate-x-6",
    right: "-translate-x-6",
  }[direction]

  const visible = "opacity-100 translate-x-0 translate-y-0"

  return (
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`${base} ${directionClass} ${
        isVisible ? visible : ""
      }`}
    >
      {children}
    </div>
  )
}

