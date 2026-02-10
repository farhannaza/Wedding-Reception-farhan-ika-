"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

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
  const [isVisible, setIsVisible] = useState(false)
  const [hasEntered, setHasEntered] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setHasEntered(true)
        } else {
          setIsVisible(false)
        }
      },
      {
        threshold: 0.25,
      }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const enterOffset = {
    up: "translate-y-4",
    down: "-translate-y-4",
    left: "translate-x-4",
    right: "-translate-x-4",
  }[direction]

  const base =
    "will-change-transform will-change-opacity transition-[opacity,transform]"

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: delay ? `${delay}ms` : undefined,
        transitionDuration: "2400ms",
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      className={`${base} ${
        !hasEntered
          ? `opacity-0 ${enterOffset}` // first time only: slide in
          : isVisible
          ? "opacity-100 translate-x-0 translate-y-0" // visible
          : "opacity-0" // exit: fade only, no direction flip
      }`}
    >
      {children}
    </div>
  )
}
