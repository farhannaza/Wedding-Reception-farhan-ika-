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
