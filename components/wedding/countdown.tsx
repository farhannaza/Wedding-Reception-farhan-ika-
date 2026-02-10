"use client"

import { useEffect, useState } from "react"
import { Reveal } from "@/components/reveal"

function calculateTimeLeft() {
  const weddingDate = new Date("2026-10-18T11:00:00+08:00")
  const now = new Date()
  const difference = weddingDate.getTime() - now.getTime()

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="flex h-[72px] w-[72px] items-center justify-center rounded-lg border border-gold/20 bg-card sm:h-20 sm:w-20 md:h-24 md:w-24">
        <span className="font-serif text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="font-sans text-[10px] font-light uppercase tracking-[0.1em] text-muted-foreground sm:text-[11px] sm:tracking-[0.15em]">
        {label}
      </span>
    </div>
  )
}

export function Countdown() {
  const [time, setTime] = useState(calculateTimeLeft)

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculateTimeLeft())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="bg-background px-5 py-14 sm:px-6 md:py-20">
      <div className="mx-auto max-w-xl">
        <div className="flex flex-col items-center gap-4 text-center sm:gap-6">
          <Reveal>
            <p className="font-sans text-[11px] font-light uppercase tracking-[0.2em] text-gold sm:text-xs sm:tracking-[0.3em]">
              Counting Down
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-serif text-xl font-bold text-foreground sm:text-2xl md:text-3xl">
              Until Our Wedding
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <div className="flex items-center gap-4">
              <div className="h-px w-8 bg-gold/40" />
              <div className="h-1.5 w-1.5 rotate-45 border border-gold/50" />
              <div className="h-px w-8 bg-gold/40" />
            </div>
          </Reveal>

          {/* 2x2 grid on mobile, inline row on sm+ */}
          <Reveal delay={200}>
            <div className="mt-2 grid grid-cols-2 gap-4 sm:mt-4 sm:flex sm:items-center sm:gap-5 md:gap-6">
              <TimeBlock value={time.days} label="Days" />
              <TimeBlock value={time.hours} label="Hours" />
              <TimeBlock value={time.minutes} label="Minutes" />
              <TimeBlock value={time.seconds} label="Seconds" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
