"use client"

import { useEffect, useState } from "react"
import { CalendarDays, MapPin, Mail, ChevronUp } from "lucide-react"

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Desktop top nav */}
      <nav
        className={`fixed left-0 right-0 top-0 z-50 hidden items-center justify-center gap-8 px-4 py-4 transition-all duration-500 md:flex ${
          scrolled
            ? "bg-foreground/95 shadow-lg shadow-black/10 backdrop-blur-md"
            : "bg-transparent"
        }`}
        aria-label="Main navigation"
      >
        <a
          href="#details"
          className="font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-gold/70 transition-colors hover:text-gold md:text-xs"
        >
          Detail
        </a>
        <a
          href="#venue"
          className="font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-gold/70 transition-colors hover:text-gold md:text-xs"
        >
          Lokasi
        </a>
        <span className="font-serif text-base font-bold text-white drop-shadow-sm">
          F & S
        </span>
        <a
          href="#rsvp"
          className="font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-gold/70 transition-colors hover:text-gold md:text-xs"
        >
          RSVP
        </a>
        <a
          href="#"
          className="font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-gold/70 transition-colors hover:text-gold md:text-xs"
        >
          Top
        </a>
      </nav>

      {/* Mobile bottom nav - sticky, large tap targets */}
      <nav
        className={`fixed bottom-0 left-0 right-0 z-50 border-t border-gold/20 bg-foreground/95 backdrop-blur-md transition-all duration-500 md:hidden ${
          scrolled ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        aria-label="Mobile navigation"
      >
        <div className="flex items-stretch justify-around">
          <a
            href="#details"
            className="flex min-h-[56px] flex-1 flex-col items-center justify-center gap-1 text-gold/70 transition-colors active:text-gold"
          >
            <CalendarDays className="h-5 w-5" />
            <span className="font-sans text-[10px] font-medium uppercase tracking-wider">
              Details
            </span>
          </a>
          <a
            href="#venue"
            className="flex min-h-[56px] flex-1 flex-col items-center justify-center gap-1 text-gold/70 transition-colors active:text-gold"
          >
            <MapPin className="h-5 w-5" />
            <span className="font-sans text-[10px] font-medium uppercase tracking-wider">
              Venue
            </span>
          </a>
          <a
            href="#rsvp"
            className="flex min-h-[56px] flex-1 flex-col items-center justify-center gap-1 text-gold/70 transition-colors active:text-gold"
          >
            <Mail className="h-5 w-5" />
            <span className="font-sans text-[10px] font-medium uppercase tracking-wider">
              RSVP
            </span>
          </a>
          <a
            href="#"
            className="flex min-h-[56px] flex-1 flex-col items-center justify-center gap-1 text-gold/70 transition-colors active:text-gold"
          >
            <ChevronUp className="h-5 w-5" />
            <span className="font-sans text-[10px] font-medium uppercase tracking-wider">
              Top
            </span>
          </a>
        </div>
      </nav>
    </>
  )
}
