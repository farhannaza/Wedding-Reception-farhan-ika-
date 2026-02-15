import React from "react"
import { CalendarDays, Clock, MapPin } from "lucide-react"
import { Reveal } from "@/components/reveal"

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
            icon={<CalendarDays className="h-6 w-6 text-gold sm:h-7 sm:w-7" />}
            title="Tarikh"
            lines={["Ahad", "18 Oktober 2026"]}
          />
        </Reveal>
        <Reveal direction="up" delay={100}>
          <DetailCard
            icon={<Clock className="h-6 w-6 text-gold sm:h-7 sm:w-7" />}
            title="Masa"
            lines={["11:00 AM -", "4:00 PM"]}
          />
        </Reveal>
        <Reveal direction="up" delay={200}>
          <DetailCard
            icon={<MapPin className="h-6 w-6 text-gold sm:h-7 sm:w-7" />}
            title="Lokasi"
            lines={["British Vogue By Kamalinda", "Ecohill Semenyih"]}
          />
        </Reveal>
      </div>

      <div className="mx-auto mt-10 max-w-4xl sm:mt-14">
        <Reveal direction="up" delay={300}>
          <div className="rounded-xl border border-gold/20 bg-card p-5 text-center sm:p-6">
            <p className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-gold sm:text-xs">
              Add To Calendar
            </p>
            <p className="mt-2 font-sans text-[13px] text-foreground/70 sm:text-sm">
              Save the date and time to your preferred calendar app.
            </p>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <a
                href={googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[46px] items-center justify-center rounded-lg border border-gold/30 bg-background px-4 py-2 font-sans text-[12px] font-medium uppercase tracking-[0.12em] text-foreground transition-colors active:border-gold/60 active:bg-gold/10 sm:text-xs sm:hover:border-gold/60 sm:hover:bg-gold/10"
              >
                Google Calendar
              </a>
              <a
                href="/calendar/farhan-syafika.ics"
                download
                className="inline-flex min-h-[46px] items-center justify-center rounded-lg border border-gold/30 bg-background px-4 py-2 font-sans text-[12px] font-medium uppercase tracking-[0.12em] text-foreground transition-colors active:border-gold/60 active:bg-gold/10 sm:text-xs sm:hover:border-gold/60 sm:hover:bg-gold/10"
              >
                Apple Calendar
              </a>
              <a
                href="/calendar/farhan-syafika.ics"
                download
                className="inline-flex min-h-[46px] items-center justify-center rounded-lg border border-gold/30 bg-background px-4 py-2 font-sans text-[12px] font-medium uppercase tracking-[0.12em] text-foreground transition-colors active:border-gold/60 active:bg-gold/10 sm:text-xs sm:hover:border-gold/60 sm:hover:bg-gold/10"
              >
                Android Calendar
              </a>
            </div>
          </div>
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
