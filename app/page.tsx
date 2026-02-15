import { HeroSection } from "@/components/wedding/hero-section"
import { DetailsSection } from "@/components/wedding/details-section"
import { Countdown } from "@/components/wedding/countdown"
import { VenueMap } from "@/components/wedding/venue-map"
import { RsvpForm } from "@/components/wedding/rsvp-form"
import { Footer } from "@/components/wedding/footer"
import { Navigation } from "@/components/wedding/navigation"
import { AutoScrollController } from "@/components/wedding/auto-scroll-controller"
import { IntroGate } from "@/components/wedding/intro-gate"

export default function Page() {
  return (
    <main>
      <IntroGate />
      <AutoScrollController />
      <Navigation />
      <HeroSection />
      <DetailsSection />
      <Countdown />
      <VenueMap />
      <RsvpForm />
      <Footer />
    </main>
  )
}
