import { Navigation } from "lucide-react"
import { Reveal } from "@/components/reveal"

const venueName = "British Vogue By Kamalinda"
const venueAddress =
  "BLOCK E, PUSAT KOMERSIAL DATARAN ECOHILL, E-12-L2, Jln Ecohill 1/2, SETIA ECOHILL, 43500 Semenyih, Selangor"

const venueQuery = encodeURIComponent(`${venueName}, ${venueAddress}`)

export function VenueMap() {
  return (
    <section id="venue" className="bg-foreground px-5 py-14 sm:px-6 md:py-28">
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <div className="flex flex-col items-center gap-3 text-center sm:gap-4">
          <Reveal>
            <p className="font-sans text-[11px] font-light uppercase tracking-[0.2em] text-gold sm:text-xs sm:tracking-[0.3em]">
              The Venue
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="font-serif text-2xl font-bold text-background sm:text-3xl md:text-4xl lg:text-5xl">
              <span className="text-balance">Find Your Way</span>
            </h2>
          </Reveal>

          <Reveal delay={150}>
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-gold/40" />
              <div className="h-2 w-2 rotate-45 border border-gold/50" />
              <div className="h-px w-12 bg-gold/40" />
            </div>
          </Reveal>

          {/* ✅ Updated venue name + address */}
          <Reveal delay={200}>
            <p className="max-w-sm font-sans text-[13px] leading-relaxed text-gold-light/70 sm:max-w-lg sm:text-sm md:text-base">
              <span className="block font-medium text-gold">{venueName}</span>
              <span className="block">{venueAddress}</span>
            </p>
          </Reveal>
        </div>

        {/* Map container - taller aspect ratio on mobile for better usability */}
        <Reveal direction="up" delay={250}>
          <div className="mx-auto mt-8 overflow-hidden rounded-lg border border-gold/20 shadow-2xl shadow-black/30 sm:mt-12">
            <div className="relative aspect-square w-full sm:aspect-[4/3] md:aspect-[16/9]">
              <iframe
                /* ✅ Updated embed (uses query so you don't need the long pb string) */
                src={`https://www.google.com/maps?q=${venueQuery}&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0, position: "absolute", inset: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Wedding Venue - ${venueName}`}
                className="h-full w-full"
              />
            </div>
          </div>
        </Reveal>

        {/* Get directions links - Google Maps & Waze (logo buttons) */}
        <Reveal direction="up" delay={350}>
          <div className="mt-6 sm:mt-8 sm:flex sm:justify-center">
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${venueQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-[48px] flex-1 items-center justify-center rounded-full border border-gold/30 bg-background px-4 py-2 transition-all active:bg-gold/10 sm:min-h-0 sm:flex-none sm:px-6 sm:hover:border-gold/60 sm:hover:bg-gold/10"
              >
                <span className="sr-only">Open in Google Maps</span>
                <img
                  src="/images/google-maps-logo.svg"
                  alt="Google Maps"
                  className="h-7 w-auto sm:h-8"
                />
              </a>
              <a
                href={`https://waze.com/ul?q=${venueQuery}&navigate=yes`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-[48px] flex-1 items-center justify-center rounded-full border border-gold/30 bg-background px-4 py-2 transition-all active:bg-gold/10 sm:min-h-0 sm:flex-none sm:px-6 sm:hover:border-gold/60 sm:hover:bg-gold/10"
              >
                <span className="sr-only">Open in Waze</span>
                <img
                  src="/images/waze-logo.svg"
                  alt="Waze"
                  className="h-7 w-auto sm:h-8"
                />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
