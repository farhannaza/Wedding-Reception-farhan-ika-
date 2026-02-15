"use client"

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"

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
  const [isVisible, setIsVisible] = useState(false)
  const [activeDirection, setActiveDirection] = useState(direction)
  const lastScrollYRef = useRef(0)

  useEffect(() => {
    lastScrollYRef.current = window.scrollY
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
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
  }, [])

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
