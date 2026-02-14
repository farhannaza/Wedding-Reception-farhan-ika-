"use server"

import { createClient } from "@/lib/supabase/server"

export async function submitRsvp(formData: {
  guest_name: string
  pax: number
  phone: string
  message?: string
}) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("rsvps")
    .insert({
      guest_name: formData.guest_name,
      pax: formData.pax,
      phone: formData.phone,
      message: formData.message || null,
    })
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true, data }
}

export type RsvpMessage = {
  id: string
  guest_name: string
  message: string
  created_at: string
}

export async function getRsvpMessages(): Promise<RsvpMessage[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("rsvps")
    .select("id, guest_name, message, created_at")
    .not("message", "is", null)
    .order("created_at", { ascending: true })

  if (error) {
    return []
  }

  return (data ?? []).filter((row): row is RsvpMessage => typeof row.message === "string" && row.message.trim() !== "")
}
