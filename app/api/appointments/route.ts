import nodemailer from "nodemailer"
import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

type Body = {
  client_name: string
  client_email: string
  client_phone: string
  service_id?: string | null
  service_name?: string | null
  appointment_date: string
  appointment_time: string
  notes?: string | null
}

export async function POST(request: Request) {
  try {
    const body: Body = await request.json()

    // basic validation
    if (!body.client_name || !body.client_email || !body.client_phone || !body.appointment_date || !body.appointment_time) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    let supabase
    try {
      supabase = await createClient()
    } catch (clientErr) {
      console.error("[api/appointments] Failed to create Supabase client:", clientErr)
      return NextResponse.json({ error: "Supabase client configuration error", details: String(clientErr) }, { status: 500 })
    }

    const { error: insertError, data: inserted } = await supabase.from("appointments").insert([
      {
        client_name: body.client_name,
        client_email: body.client_email,
        client_phone: body.client_phone,
        service_id: body.service_id || null,
        service_name: body.service_name || null,
        appointment_date: body.appointment_date,
        appointment_time: body.appointment_time,
        notes: body.notes || null,
      },
    ])

    if (insertError) {
      console.error("[api/appointments] DB insert error:", insertError)
      return NextResponse.json({ error: "Database error", details: insertError.message || insertError }, { status: 500 })
    }

    // Prepare transport - uses SMTP config from env
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : undefined,
      secure: process.env.SMTP_SECURE === "true" || false,
      auth: process.env.SMTP_USER
        ? {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          }
        : undefined,
    })

    // recipient for owner notifications. Fall back to the address you provided.
    const ownerEmail = process.env.NOTIFICATION_EMAIL || "eliebarresbeavogui3@gmail.com"

    const subject = `Nouveau rendez-vous — ${body.client_name} (${body.client_email})`

    const html = `
      <p>Bonjour,</p>
      <p>Un nouveau rendez-vous a été réservé sur votre site :</p>
      <ul>
        <li><strong>Client:</strong> ${body.client_name}</li>
        <li><strong>Email:</strong> ${body.client_email}</li>
        <li><strong>Téléphone:</strong> ${body.client_phone}</li>
        <li><strong>Service:</strong> ${body.service_name || "Non précisé"}</li>
        <li><strong>Date:</strong> ${body.appointment_date}</li>
        <li><strong>Heure:</strong> ${body.appointment_time}</li>
        <li><strong>Notes:</strong> ${body.notes || "Aucune"}</li>
      </ul>
      <p>Vous pouvez consulter les rendez-vous dans votre interface Supabase.</p>
      <p>Cordialement,<br/>Votre site</p>
    `

    // Send email to owner
    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || `no-reply@${process.env.NEXT_PUBLIC_VERCEL_URL || "example.com"}`,
        to: ownerEmail,
        subject,
        html,
      })
    } catch (mailErr) {
      // Log mail failure but still return success for DB insert (optional: return 500)
      console.error("[api/appointments] Failed to send email:", mailErr)
      // We still return success because the appointment is stored; caller can be informed via response
      return NextResponse.json({ ok: true, warning: "Appointment saved but email failed" })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[api/appointments] Unexpected error:", err)
    const message = err instanceof Error ? err.message : String(err)
    const payload: any = { error: "Unexpected server error" }
    if (process.env.NODE_ENV !== "production") {
      payload.details = message
    }
    return NextResponse.json(payload, { status: 500 })
  }
}
