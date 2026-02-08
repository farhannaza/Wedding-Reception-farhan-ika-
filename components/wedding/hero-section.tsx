import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-20 text-center">
      {/* Background image */}
      <Image
        src="/images/mirror.jpg"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Decorative corner elements - smaller on mobile, larger on desktop */}
      <div className="pointer-events-none absolute inset-4 z-10 sm:inset-6 md:inset-12">
        <svg className="absolute left-0 top-0 h-12 w-12 text-gold opacity-50 sm:h-20 sm:w-20 md:h-28 md:w-28" viewBox="0 0 100 100" fill="none">
          <path d="M0 0 L40 0 L40 4 L4 4 L4 40 L0 40 Z" fill="currentColor" />
        </svg>
        <svg className="absolute right-0 top-0 h-12 w-12 text-gold opacity-50 sm:h-20 sm:w-20 md:h-28 md:w-28" viewBox="0 0 100 100" fill="none">
          <path d="M100 0 L60 0 L60 4 L96 4 L96 40 L100 40 Z" fill="currentColor" />
        </svg>
        <svg className="absolute bottom-0 left-0 h-12 w-12 text-gold opacity-50 sm:h-20 sm:w-20 md:h-28 md:w-28" viewBox="0 0 100 100" fill="none">
          <path d="M0 100 L40 100 L40 96 L4 96 L4 60 L0 60 Z" fill="currentColor" />
        </svg>
        <svg className="absolute bottom-0 right-0 h-12 w-12 text-gold opacity-50 sm:h-20 sm:w-20 md:h-28 md:w-28" viewBox="0 0 100 100" fill="none">
          <path d="M100 100 L60 100 L60 96 L96 96 L96 60 L100 60 Z" fill="currentColor" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-5 sm:gap-6">
        {/* Subtitle */}
        <p className="animate-fade-in-up font-sans text-[11px] font-light uppercase leading-relaxed tracking-[0.15em] text-gold-light opacity-0 sm:text-xs sm:tracking-[0.3em] md:text-sm md:tracking-[0.4em]">
          You are cordially invited to
          <br className="sm:hidden" />
          {" "}the wedding reception of
        </p>

        {/* Decorative line */}
        <div className="animate-fade-in-up flex items-center gap-3 opacity-0 animation-delay-200">
          <div className="h-px w-10 bg-gold/40 sm:w-14 md:w-20" />
          <svg className="h-3.5 w-3.5 text-gold sm:h-4 sm:w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <div className="h-px w-10 bg-gold/40 sm:w-14 md:w-20" />
        </div>

        {/* Couple Names */}
        <div className="animate-fade-in-up opacity-0 animation-delay-200">
          <h1 className="font-serif text-[2.75rem] font-bold leading-none text-white drop-shadow-lg sm:text-6xl md:text-7xl lg:text-8xl">
            Farhan
          </h1>
          <p className="my-2 font-serif text-2xl italic text-gold sm:my-3 sm:text-2xl md:my-4 md:text-3xl">
            {"&"}
          </p>
          <h1 className="font-serif text-[2.75rem] font-bold leading-none text-white drop-shadow-lg sm:text-6xl md:text-7xl lg:text-8xl">
            Syafika
          </h1>
        </div>

        {/* Decorative divider */}
        <div className="animate-fade-in-up flex items-center gap-3 opacity-0 animation-delay-400">
          <div className="h-px w-12 bg-gold/50 sm:w-16 md:w-24" />
          <div className="h-2 w-2 rotate-45 border border-gold/60" />
          <div className="h-px w-12 bg-gold/50 sm:w-16 md:w-24" />
        </div>

        {/* Date */}
        <div className="animate-fade-in-up opacity-0 animation-delay-400">
          <p className="font-sans text-[13px] font-light uppercase tracking-[0.2em] text-gold-light sm:text-sm sm:tracking-[0.3em] md:text-base">
            Sunday, 18th October 2026
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="animate-fade-in-up mt-8 opacity-0 animation-delay-600 sm:mt-10 md:mt-12">
          <a
            href="#details"
            className="group flex flex-col items-center gap-2 text-gold/60 transition-colors active:text-gold"
            aria-label="Scroll to details"
          >
            <span className="font-sans text-[10px] uppercase tracking-[0.3em]">Scroll</span>
            <svg className="h-5 w-5 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
