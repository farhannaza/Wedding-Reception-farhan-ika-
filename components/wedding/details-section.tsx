 "use client"

import React from "react"
import { CalendarDays, Clock, MapPin } from "lucide-react"
import { Reveal } from "@/components/reveal"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const eventTitle = "Majlis Kesyukuran Perkahwinan Farhan & Syafika"
const eventLocation = "British Vogue By Kamalinda, Ecohill Semenyih"
const eventDescription =
  "Ahad, 18 Oktober 2026 | 11:00 AM - 4:00 PM. Kami berbesar hati menjemput anda ke majlis kami."

const googleCalendarUrl =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  `&text=${encodeURIComponent(eventTitle)}` +
  "&dates=20261018T030000Z/20261018T080000Z" +
  `&details=${encodeURIComponent(eventDescription)}` +
  `&location=${encodeURIComponent(eventLocation)}`

function DetailCard({
  icon,
  title,
  lines,
}: {
  icon: React.ReactNode
  title: string
  lines: string[]
}) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-background sm:h-16 sm:w-16">
        {icon}
      </div>
      <h3 className="font-serif text-lg font-semibold text-foreground">{title}</h3>
      <div className="flex flex-col gap-0.5">
        {lines.map((line) => (
          <p
            key={line}
            className="font-sans text-[13px] leading-relaxed text-foreground/80 sm:text-sm md:text-base"
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  )
}

export function DetailsSection() {
  return (
    <section
      id="details"
      className="relative bg-background px-5 py-14 sm:px-6 md:py-28"
    >
      {/* Section header */}
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center sm:gap-4">
        <Reveal>
          <p className="font-sans text-[11px] font-light uppercase tracking-[0.2em] text-gold sm:text-xs sm:tracking-[0.3em]">
            Detail
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div className="flex items-center gap-4">
            <div className="h-px w-12 bg-gold/40" />
            <div className="h-2 w-2 rotate-45 border border-gold/50" />
            <div className="h-px w-12 bg-gold/40" />
          </div>
        </Reveal>
        {/* slightly smaller than before but still darker */}
        <Reveal delay={150}>
          <p className="max-w-sm font-sans text-[13px] leading-relaxed text-foreground/80 sm:max-w-lg sm:text-sm md:text-base">
            Dengan Penuh Kesyukuran ke Hadrat Allah S.W.T
          </p>  
        </Reveal>
        {/* a bit more smaller */}
        <Reveal delay={200}>
          <h2 className="font-serif text-base font-bold text-gold sm:text-lg md:text-xl lg:text-2xl">
            <span className="text-balance">
              Hj Hasrat Nazarudin Bin Abdul Rahman <br /> &amp; <br /> Hjh Norsiati Binti Shamsul Bahari
            </span>
          </h2>
        </Reveal>

        {/* slightly smaller than before but still darker */}
        <Reveal delay={250}>
          <p className="max-w-sm font-sans text-[13px] leading-relaxed text-foreground/80 sm:max-w-lg sm:text-sm md:text-base">
            Dengan sukacitanya ingin mengundang  Ybhg <br /> Dato’ Seri | Datin Seri | Dato' | Datin | Tuan | Puan | Encik | Cik <br />ke majlis
            perkahwinan anakanda kami
          </p>
        </Reveal>

        {/* Names of bride and groom */}

        <Reveal delay={300}>
        <h2 className="font-serif italic text-xl font-bold text-foreground sm:text-2xl md:text-3xl lg:text-4xl">
            <span className="text-balance">
              Muhammad Farhan Bin Hasrat Nazarudin <br /> &amp; <br /> Tuan Nur Syafika Binti Tuan Abdul Halim
            </span>
          </h2>
        </Reveal>

      </div>

      {/* Details grid */}
      <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-6 sm:mt-14 sm:grid-cols-3 sm:gap-6">
        <Reveal direction="up">
          <DetailCard
            icon={<MapPin className="h-6 w-6 text-gold sm:h-7 sm:w-7" />}
            title="Lokasi"
            lines={["British Vogue By Kamalinda", "Ecohill Semenyih"]}
          />
        </Reveal>
        <Reveal direction="up" delay={100}>
          <DetailCard
            icon={<CalendarDays className="h-6 w-6 text-gold sm:h-7 sm:w-7" />}
            title="Tarikh"
            lines={["Ahad", "18 Oktober 2026"]}
          />
        </Reveal>
        <Reveal direction="up" delay={200}>
          <DetailCard
            icon={<Clock className="h-6 w-6 text-gold sm:h-7 sm:w-7" />}
            title="Masa"
            lines={["11:00 AM -", "4:00 PM"]}
          />
        </Reveal>
      </div>

      <div className="mx-auto mt-10 flex max-w-4xl justify-center sm:mt-14">
        <Reveal direction="up" delay={300}>
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                className="inline-flex min-h-[48px] items-center justify-center rounded-lg border border-gold/30 bg-card px-6 py-3 font-sans text-[12px] font-medium uppercase tracking-[0.15em] text-foreground transition-colors active:border-gold/60 active:bg-gold/10 sm:text-xs sm:hover:border-gold/60 sm:hover:bg-gold/10"
              >
                Simpan Tarikh
              </button>
            </DialogTrigger>
            <DialogContent className="border-gold/20 bg-card">
              <DialogHeader className="text-center">
                <DialogTitle className="text-center font-serif text-2xl font-bold text-foreground">
                  Simpan Tarikh
                </DialogTitle>
                <DialogDescription className="text-center font-sans text-[13px] leading-relaxed text-muted-foreground sm:text-sm">
                  Ahad, 18 Oktober 2026
                  <br />
                  11:00 AM - 4:00 PM
                </DialogDescription>
              </DialogHeader>

              <div className="mt-1 grid grid-cols-3 gap-3">
                <a
                  href={googleCalendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[52px] items-center justify-center rounded-lg border border-gold/20 bg-background/40 transition-colors hover:border-gold/50 hover:bg-gold/5"
                >
                  <span className="sr-only">Google Calendar</span>
                  <img
                    src="/images/Google_Calendar_icon_(2020).svg"
                    alt="Google"
                    className="h-7 w-7"
                  />
                </a>
                <a
                  href="/calendar/farhan-syafika.ics"
                  download
                  className="flex min-h-[52px] items-center justify-center rounded-lg border border-gold/20 bg-background/40 text-foreground transition-colors hover:border-gold/50 hover:bg-gold/5"
                >
                  <span className="sr-only">Apple Calendar</span>
                  <img
                    src="/images/Apple_logo_black.svg"
                    alt="Apple"
                    className="h-7 w-7 object-contain"
                  />
                </a>
                <a
                  href="/calendar/farhan-syafika.ics"
                  download
                  className="flex min-h-[52px] items-center justify-center rounded-lg border border-gold/20 bg-background/40 text-foreground transition-colors hover:border-gold/50 hover:bg-gold/5"
                >
                  <span className="sr-only">Android Calendar</span>
                  <img
                    src="/images/android.svg"
                    alt="Android"
                    className="h-7 w-7 object-contain"
                  />
                </a>
              </div>
            </DialogContent>
          </Dialog>
        </Reveal>
      </div>

      {/* Decorative bottom divider */}
      <div className="mx-auto mt-14 flex max-w-xs items-center justify-center gap-3 sm:mt-20">
        <div className="h-px flex-1 bg-gold/20" />
        <svg className="h-4 w-4 text-gold/40" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <div className="h-px flex-1 bg-gold/20" />
      </div>
    </section>
  )
}
