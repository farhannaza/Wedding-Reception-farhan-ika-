"use client"

import { useEffect } from "react"

export function DisableScrollRestoration() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      const previous = window.history.scrollRestoration
      window.history.scrollRestoration = "manual"
      return () => {
        window.history.scrollRestoration = previous
      }
    }
  }, [])

  return null
}

