"use client"

import { useEffect, useState } from "react"
import { CalendarDays, MapPin, Mail, Play, PhoneCall } from "lucide-react"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  const runAutoScroll = () => {
    window.dispatchEvent(new Event("wedding:run-autoscroll"))
  }

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
        className={`fixed left-0 right-0 top-0 z-50 hidden items-center justify-center gap-8 px-4 py-4 transform-gpu will-change-transform transition-all duration-500 ease-out md:flex ${
          scrolled
            ? "translate-y-0 opacity-100 bg-foreground/95 shadow-lg shadow-black/10 backdrop-blur-md"
            : "-translate-y-4 opacity-0 pointer-events-none bg-transparent"
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
        <button
          type="button"
          onClick={runAutoScroll}
          className="font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-gold/70 transition-colors hover:text-gold md:text-xs"
        >
          Auto Scroll
        </button>
      </nav>

      {/* Mobile bottom nav - sticky, appears after scrolling past hero */}
      <nav
        className={`fixed bottom-0 left-0 right-0 z-50 border-t border-gold/20 bg-foreground/95 backdrop-blur-md transform-gpu will-change-transform transition-all duration-[1350ms] ease-[cubic-bezier(0.2,1,0.22,1)] md:hidden ${
          scrolled ? "translate-y-0 scale-100 opacity-100" : "translate-y-10 scale-[0.96] opacity-0 pointer-events-none"
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
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                type="button"
                className="flex min-h-[56px] flex-1 flex-col items-center justify-center gap-1 text-gold/70 transition-colors active:text-gold"
              >
                <PhoneCall className="h-5 w-5" />
                <span className="font-sans text-[10px] font-medium uppercase tracking-wider">
                  Contact
                </span>
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="border-gold/20 bg-card">
              <AlertDialogHeader className="text-center sm:text-left">
                <AlertDialogTitle className="font-serif text-2xl font-bold text-foreground">
                  Contact
                </AlertDialogTitle>
                <AlertDialogDescription className="font-sans text-[13px] leading-relaxed text-muted-foreground sm:text-sm">
                  Tap a number to call.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <div className="mt-1 grid gap-3">
                <a
                  href="tel:0192743665"
                  className="flex items-center justify-between rounded-lg border border-gold/20 bg-background/40 px-4 py-3 font-sans text-sm text-foreground transition-colors hover:border-gold/50 hover:bg-gold/5"
                >
                  <span className="font-medium">Hasrat Nazarudin</span>
                  <span className="text-muted-foreground">0192743665</span>
                </a>
                <a
                  href="tel:0126170785"
                  className="flex items-center justify-between rounded-lg border border-gold/20 bg-background/40 px-4 py-3 font-sans text-sm text-foreground transition-colors hover:border-gold/50 hover:bg-gold/5"
                >
                  <span className="font-medium">Norsiati</span>
                  <span className="text-muted-foreground">0126170785</span>
                </a>
                <a
                  href="tel:01110152931"
                  className="flex items-center justify-between rounded-lg border border-gold/20 bg-background/40 px-4 py-3 font-sans text-sm text-foreground transition-colors hover:border-gold/50 hover:bg-gold/5"
                >
                  <span className="font-medium">Farhan</span>
                  <span className="text-muted-foreground">01110152931</span>
                </a>
                <a
                  href="tel:0193737128"
                  className="flex items-center justify-between rounded-lg border border-gold/20 bg-background/40 px-4 py-3 font-sans text-sm text-foreground transition-colors hover:border-gold/50 hover:bg-gold/5"
                >
                  <span className="font-medium">Syafika</span>
                  <span className="text-muted-foreground">0193737128</span>
                </a>
              </div>

              <AlertDialogFooter className="mt-2">
                <AlertDialogCancel className="border-gold/20 bg-transparent font-sans uppercase tracking-[0.15em] text-foreground hover:bg-gold/10">
                  Close
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <button
            type="button"
            onClick={runAutoScroll}
            className="flex min-h-[56px] flex-1 flex-col items-center justify-center gap-1 text-gold/70 transition-colors active:text-gold"
          >
            <Play className="h-5 w-5" />
            <span className="font-sans text-[10px] font-medium uppercase tracking-wider">
              Auto
            </span>
          </button>
        </div>
      </nav>
    </>
  )
}
