import { HeroSection } from "@/components/wedding/hero-section"
import { DetailsSection } from "@/components/wedding/details-section"
import { Countdown } from "@/components/wedding/countdown"
import { VenueMap } from "@/components/wedding/venue-map"
import { RsvpForm } from "@/components/wedding/rsvp-form"
import { Footer } from "@/components/wedding/footer"
import { Navigation } from "@/components/wedding/navigation"

export default function Page() {
  return (
    <main>
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
