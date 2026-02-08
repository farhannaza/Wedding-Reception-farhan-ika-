export function Footer() {
  return (
    <footer className="bg-foreground px-5 py-12 pb-24 text-center sm:px-6 sm:pb-12 md:py-16">
      <div className="mx-auto flex max-w-md flex-col items-center gap-5 sm:gap-6">
        {/* Decorative top */}
        <div className="flex items-center gap-3">
          <div className="h-px w-10 bg-gold/30" />
          <svg className="h-4 w-4 text-gold/50" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <div className="h-px w-10 bg-gold/30" />
        </div>

        <p className="font-serif text-xl font-bold text-background sm:text-2xl">
          Farhan & Syafika
        </p>

        <p className="font-sans text-[13px] leading-relaxed text-gold-light/50 sm:text-xs">
          18 October 2026
        </p>

        {/* Navigation */}
        <nav className="flex flex-wrap items-center justify-center gap-6" aria-label="Footer navigation">
          <a
            href="#details"
            className="min-h-[44px] font-sans text-[13px] uppercase tracking-[0.15em] text-gold/60 transition-colors active:text-gold sm:text-xs"
          >
            Details
          </a>
          <a
            href="#venue"
            className="min-h-[44px] font-sans text-[13px] uppercase tracking-[0.15em] text-gold/60 transition-colors active:text-gold sm:text-xs"
          >
            Venue
          </a>
          <a
            href="#rsvp"
            className="min-h-[44px] font-sans text-[13px] uppercase tracking-[0.15em] text-gold/60 transition-colors active:text-gold sm:text-xs"
          >
            RSVP
          </a>
        </nav>

        <div className="h-px w-24 bg-gold/15" />

        <p className="font-sans text-[11px] text-gold-light/30">
          We are honored by your presence
        </p>
      </div>
    </footer>
  )
}
