import React from "react"
import { CalendarDays, Clock, MapPin } from "lucide-react"

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
        <p className="font-sans text-[11px] font-light uppercase tracking-[0.2em] text-gold sm:text-xs sm:tracking-[0.3em]">
          Detail
        </p>
        <div className="flex items-center gap-4">
          <div className="h-px w-12 bg-gold/40" />
          <div className="h-2 w-2 rotate-45 border border-gold/50" />
          <div className="h-px w-12 bg-gold/40" />
        </div>
        {/* slightly smaller than before but still darker */}
        <p className="max-w-sm font-sans text-[13px] leading-relaxed text-foreground/80 sm:max-w-lg sm:text-sm md:text-base">
          Dengan Penuh Kesyukuran ke Hadrat Allah S.W.T
        </p>  
        {/* a bit more smaller */}
        <h2 className="font-serif text-lg font-bold text-foreground sm:text-xl md:text-2xl lg:text-3xl">
          <span className="text-balance">
            Hj Hasrat Nazarudin Bin Abdul Rahman &amp; <br /> Hjh Norsiati Binti Shamsul Bahari
          </span>
        </h2>

        {/* slightly smaller than before but still darker */}
        <p className="max-w-sm font-sans text-[13px] leading-relaxed text-foreground/80 sm:max-w-lg sm:text-sm md:text-base">
          Dengan sukacitanya ingin mengundang  Ybhg <br /> Dato’ Seri | Datin Seri | Dato' | Datin | Tuan | Puan | Encik | Cik <br />ke majlis
          perkahwinan anakanda kami
        </p>
      </div>

      {/* Details grid */}
      <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-8 sm:mt-14 sm:grid-cols-3 sm:gap-10">
        <DetailCard
          icon={<CalendarDays className="h-6 w-6 text-gold sm:h-7 sm:w-7" />}
          title="Tarikh"
          lines={["Ahad", "18 Oktober 2026"]}
        />
        <DetailCard
          icon={<Clock className="h-6 w-6 text-gold sm:h-7 sm:w-7" />}
          title="Masa"
          lines={["11:00 AM -", "4:00 PM"]}
        />
        <DetailCard
          icon={<MapPin className="h-6 w-6 text-gold sm:h-7 sm:w-7" />}
          title="Lokasi"
          lines={["British Vogue By Kamalinda", "Ecohill Semenyih"]}
        />
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
