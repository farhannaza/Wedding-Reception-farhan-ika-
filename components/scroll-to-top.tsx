"use client"

import { useEffect } from "react"

export function ScrollToTopOnLoad() {
  useEffect(() => {
    // Ensure we start at the top when the page loads
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior })
  }, [])

  return null
}

