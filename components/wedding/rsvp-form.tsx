"use client"

import React, { useState, useEffect } from "react"
import { submitRsvp, getRsvpMessages, type RsvpMessage } from "@/app/actions/rsvp"
import { CheckCircle2, Loader2, Users, User, MessageSquare, Phone } from "lucide-react"
import { Reveal } from "@/components/reveal"

export function RsvpForm() {
  const [name, setName] = useState("")
  const [pax, setPax] = useState(1)
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [messages, setMessages] = useState<RsvpMessage[]>([])

  useEffect(() => {
    getRsvpMessages().then(setMessages)
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const result = await submitRsvp({
      guest_name: name.trim(),
      pax,
      phone: phone.trim(),
      message: message.trim() || undefined,
    })

    setIsSubmitting(false)

    if (result.success) {
      setIsSubmitted(true)
      getRsvpMessages().then(setMessages)
    } else {
      setError(result.error || "Something went wrong. Please try again.")
    }
  }

  if (isSubmitted) {
    return (
      <section id="rsvp" className="bg-background px-5 py-14 sm:px-6 md:py-28">
        <div className="mx-auto max-w-lg">
          <Reveal direction="up">
            <div className="flex flex-col items-center gap-5 rounded-lg border border-gold/20 bg-card p-8 text-center shadow-sm sm:p-10">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
                <CheckCircle2 className="h-8 w-8 text-gold" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground">
                Thank You!
              </h3>
              <p className="font-sans text-[13px] leading-relaxed text-muted-foreground sm:text-sm">
                Dear {name}, your RSVP for {pax} {pax === 1 ? "guest" : "guests"} has been
                received. We look forward to celebrating with you!
              </p>
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-gold/30" />
                <svg className="h-3 w-3 text-gold/50" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <div className="h-px w-8 bg-gold/30" />
              </div>
            </div>
          </Reveal>
        </div>
        <RsvpMessagesList messages={messages} />
      </section>
    )
  }

  return (
    <section id="rsvp" className="bg-background px-5 py-14 pb-28 sm:px-6 sm:pb-14 md:py-28">
      <div className="mx-auto max-w-lg">
        {/* Section header */}
        <div className="flex flex-col items-center gap-3 text-center sm:gap-4">
          <Reveal>
            <p className="font-sans text-[11px] font-light uppercase tracking-[0.2em] text-gold sm:text-xs sm:tracking-[0.3em]">
              RSVP
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
              <span className="text-balance">Kindly Respond</span>
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-gold/40" />
              <div className="h-2 w-2 rotate-45 border border-gold/50" />
              <div className="h-px w-12 bg-gold/40" />
            </div>
          </Reveal>
          <Reveal delay={200}>
            <p className="max-w-sm font-sans text-[13px] leading-relaxed text-muted-foreground sm:max-w-md sm:text-sm md:text-base">
              Please let us know if you will be joining us on our special day.
            </p>
          </Reveal>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-6 sm:mt-12">
          {/* Name field */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="guest-name"
              className="flex items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-foreground sm:text-xs"
            >
              <User className="h-3.5 w-3.5 text-gold" />
              Full Name
            </label>
            <input
              id="guest-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="min-h-[48px] rounded-lg border border-gold/20 bg-card px-4 py-3 font-sans text-base text-foreground placeholder:text-muted-foreground/50 transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 sm:min-h-0 sm:py-3 sm:text-sm"
            />
          </div>

          {/* Phone field */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="phone"
              className="flex items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-foreground sm:text-xs"
            >
              <Phone className="h-3.5 w-3.5 text-gold" />
              Contact Number
            </label>
            <input
              id="phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="min-h-[48px] rounded-lg border border-gold/20 bg-card px-4 py-3 font-sans text-base text-foreground placeholder:text-muted-foreground/50 transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 sm:min-h-0 sm:py-3 sm:text-sm"
            />
          </div>

          {/* Pax field */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="pax"
              className="flex items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-foreground sm:text-xs"
            >
              <Users className="h-3.5 w-3.5 text-gold" />
              Number of Guests
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setPax(Math.max(1, pax - 1))}
                className="flex h-12 w-12 items-center justify-center rounded-lg border border-gold/20 bg-card font-sans text-xl text-foreground transition-colors active:border-gold/50 active:bg-gold/10 sm:h-10 sm:w-10 sm:text-lg sm:hover:border-gold/50 sm:hover:bg-gold/10"
                aria-label="Decrease guests"
              >
                -
              </button>
              <input
                id="pax"
                type="number"
                min={1}
                max={20}
                required
                value={pax}
                onChange={(e) => setPax(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
                className="h-12 w-20 rounded-lg border border-gold/20 bg-card px-4 text-center font-sans text-base text-foreground focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 sm:h-10 sm:text-sm"
              />
              <button
                type="button"
                onClick={() => setPax(Math.min(20, pax + 1))}
                className="flex h-12 w-12 items-center justify-center rounded-lg border border-gold/20 bg-card font-sans text-xl text-foreground transition-colors active:border-gold/50 active:bg-gold/10 sm:h-10 sm:w-10 sm:text-lg sm:hover:border-gold/50 sm:hover:bg-gold/10"
                aria-label="Increase guests"
              >
                +
              </button>
              <span className="font-sans text-[13px] text-muted-foreground">
                {pax === 1 ? "person" : "people"}
              </span>
            </div>
          </div>

          {/* Message field */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="message"
              className="flex items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-foreground sm:text-xs"
            >
              <MessageSquare className="h-3.5 w-3.5 text-gold" />
              Message
              <span className="font-normal normal-case tracking-normal text-muted-foreground">(optional)</span>
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share your wishes or a note for the couple..."
              rows={3}
              className="resize-none rounded-lg border border-gold/20 bg-card px-4 py-3 font-sans text-base text-foreground placeholder:text-muted-foreground/50 transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 sm:text-sm"
            />
          </div>

          {/* Error message */}
          {error && (
            <p className="rounded-lg bg-destructive/10 px-4 py-3 font-sans text-[13px] text-destructive sm:text-sm">
              {error}
            </p>
          )}

          {/* Submit button - always full width on mobile */}
          <button
            type="submit"
            disabled={isSubmitting || !name.trim() || !phone.trim()}
            className="mt-2 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-lg bg-foreground px-6 py-3.5 font-sans text-[13px] font-medium uppercase tracking-[0.15em] text-background transition-all active:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-0 sm:w-auto sm:rounded-md sm:px-8 sm:py-3.5 sm:text-sm sm:tracking-[0.2em] sm:hover:bg-foreground/90"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Confirm Attendance"
            )}
          </button>
        </form>
        <RsvpMessagesList messages={messages} />
      </div>
    </section>
  )
}

function RsvpMessagesList({ messages }: { messages: RsvpMessage[] }) {
  if (messages.length === 0) return null

  const scrollable = messages.length > 2
  const content = messages.map((m) => (
    <div
      key={m.id}
      className="rounded-lg border border-gold/20 bg-card px-4 py-3 text-left shadow-sm"
    >
      <p className="font-sans text-[13px] font-medium text-foreground sm:text-sm">
        — {m.guest_name}
      </p>
      <p className="mt-1 font-sans text-[13px] leading-relaxed text-muted-foreground sm:text-sm">
        {m.message}
      </p>
    </div>
  ))

  return (
    <div className="mt-14 sm:mt-16">
      <Reveal>
        <p className="mb-4 text-center font-sans text-[11px] font-light uppercase tracking-[0.2em] text-gold sm:text-xs sm:tracking-[0.3em]">
          Messages from guests
        </p>
      </Reveal>
      <div className="relative h-48 overflow-hidden sm:h-56">
        {scrollable ? (
          <div className="animate-rsvp-messages-scroll flex flex-col gap-3">
            {content}
            {content}
          </div>
        ) : (
          <div className="flex flex-col gap-3">{content}</div>
        )}
      </div>
    </div>
  )
}
