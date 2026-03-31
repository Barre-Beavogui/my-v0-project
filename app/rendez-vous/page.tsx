"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, CheckCircle2, Clock } from "lucide-react"
import Link from "next/link"

interface Service {
  id: string
  name: string
  category: string
  duration_minutes: number | null
  price_xaf: number | null
}

export default function RendezVousPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [services, setServices] = useState<Service[]>([])

  const [formData, setFormData] = useState({
    client_name: "",
    client_email: "",
    client_phone: "",
    service_id: "",
    service_name: "",
    appointment_date: "",
    appointment_time: "",
    notes: "",
  })

  // Detect whether the public Supabase env vars are present at build time.
  // If they're missing, we avoid calling createClient() which throws and provide a local sample fallback.
  const hasSupabaseEnv = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  )

  // Fetch services on mount
  useEffect(() => {
    const fetchServices = async () => {
      if (!hasSupabaseEnv) {
        console.warn("[v0] Supabase env not configured, using local sample services for dev/testing")
        setServices(sampleServices)
        return
      }
      const supabase = createClient()
      const { data, error: fetchError } = await supabase
        .from("services")
        .select("*")
  // include trainings as well so users can select training sessions
  .in("category", ["hair", "makeup", "training"])
        .order("category", { ascending: true })

      if (fetchError) {
        console.error("[v0] Error fetching services:", fetchError)
      } else {
        console.log("[v0] fetched services:", data)
        setServices(data || [])
      }
    }

    fetchServices()
  }, [])

  // Local sample services for quick testing when DB or env is not available
  const sampleServices: Service[] = [
    { id: "s1", name: "Tresses Africaines", category: "hair", duration_minutes: 180, price_xaf: 15000 },
    { id: "s2", name: "Maquillage Mariée", category: "makeup", duration_minutes: 120, price_xaf: 30000 },
    { id: "s3", name: "Formation Maquillage Pro", category: "training", duration_minutes: 0, price_xaf: 150000 },
  ]

  const handleServiceChange = (serviceId: string) => {
    const selectedService = services.find((s) => s.id === serviceId)
    setFormData({
      ...formData,
      service_id: serviceId,
      service_name: selectedService?.name || "",
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Use our server API to create the appointment and send notification emails
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.error || `Server responded with ${res.status}`)
      }

      setSuccess(true)
    } catch (err) {
      console.error("[v0] Error creating appointment:", err)
      setError("Une erreur est survenue lors de la réservation. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-muted/30 px-4 py-20">
        <Card className="w-full max-w-md border-border text-center">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Rendez-vous Confirmé !</CardTitle>
            <CardDescription className="leading-relaxed">
              Votre rendez-vous a été enregistré avec succès. Nous vous enverrons une confirmation par email et SMS sous
              peu.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-muted p-4 text-left">
              <p className="mb-2 text-sm font-semibold">Détails du Rendez-vous</p>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>
                  <span className="font-medium">Service:</span> {formData.service_name}
                </p>
                <p>
                  <span className="font-medium">Date:</span>{" "}
                  {new Date(formData.appointment_date).toLocaleDateString("fr-FR", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p>
                  <span className="font-medium">Heure:</span> {formData.appointment_time}
                </p>
              </div>
            </div>

            <Button asChild className="w-full">
              <Link href="/">Retour à l'Accueil</Link>
            </Button>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/services">Découvrir Plus de Services</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Get minimum date (today)
  const today = new Date().toISOString().split("T")[0]

  return (
    <div className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <h1 className="mb-4 font-serif text-4xl font-bold">Prendre Rendez-vous</h1>
            <p className="text-muted-foreground leading-relaxed">
              Choisissez votre service et réservez votre créneau. Nous vous confirmerons votre rendez-vous rapidement.
            </p>
          </div>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-primary" />
                Formulaire de Réservation
              </CardTitle>
              <CardDescription className="leading-relaxed">
                Remplissez les informations ci-dessous pour réserver votre rendez-vous. Les champs marqués d'un * sont
                obligatoires.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Vos Informations</h3>

                  <div className="space-y-2">
                    <Label htmlFor="name">Nom Complet *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.client_name}
                      onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                      placeholder="Votre nom complet"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.client_email}
                      onChange={(e) => setFormData({ ...formData, client_email: e.target.value })}
                      placeholder="votre@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.client_phone}
                      onChange={(e) => setFormData({ ...formData, client_phone: e.target.value })}
                      placeholder="+224 6XX XX XX XX"
                    />
                  </div>
                </div>

                {/* Service Selection */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Détails du Rendez-vous</h3>

                  <div className="space-y-2">
                    <Label htmlFor="service">Service Souhaité *</Label>
                    {/* Fallback to native select to avoid interaction issues with the Radix select */}
                    <select
                      id="service"
                      required
                      value={formData.service_id}
                      onChange={(e) => {
                        const id = e.target.value
                        const selected = services.find((s) => s.id === id)
                        setFormData({ ...formData, service_id: id, service_name: selected?.name || "" })
                      }}
                      className="w-full rounded-md border px-3 py-2 text-sm"
                    >
                      <option value="">Choisissez un service</option>
                      {services.filter((s) => s.category === "hair").length > 0 && (
                        <optgroup label="Coiffure">
                          {services
                            .filter((s) => s.category === "hair")
                            .map((service) => (
                              <option key={service.id} value={service.id}>
                                {service.name} - {service.price_xaf?.toLocaleString()} GNF
                              </option>
                            ))}
                        </optgroup>
                      )}
                      {services.filter((s) => s.category === "makeup").length > 0 && (
                        <optgroup label="Maquillage">
                          {services
                            .filter((s) => s.category === "makeup")
                            .map((service) => (
                              <option key={service.id} value={service.id}>
                                {service.name} - {service.price_xaf?.toLocaleString()} GNF
                              </option>
                            ))}
                        </optgroup>
                      )}
                      {services.filter((s) => s.category === "training").length > 0 && (
                        <optgroup label="Formations">
                          {services
                            .filter((s) => s.category === "training")
                            .map((service) => (
                              <option key={service.id} value={service.id}>
                                {service.name} - {service.price_xaf?.toLocaleString() || "—"} GNF
                              </option>
                            ))}
                        </optgroup>
                      )}
                    </select>
                    {formData.service_id && (
                      <p className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        Durée estimée: {services.find((s) => s.id === formData.service_id)?.duration_minutes || "N/A"}{" "}
                        minutes
                      </p>
                    )}
                    {/* Quick debug/info panel */}
                    <div className="mt-2 text-xs text-muted-foreground">
                      <p>Services chargés: {services.length}</p>
                      {services.length === 0 && (
                        <div className="mt-1">
                          <p>Aucun service récupéré depuis la base. Cliquez pour charger des exemples locaux :</p>
                          <button
                            type="button"
                            onClick={() => setServices(sampleServices)}
                            className="mt-2 inline-block rounded bg-primary px-3 py-1 text-white"
                          >
                            Charger exemples
                          </button>
                        </div>
                      )}
                      {services.length > 0 && (
                        <div className="mt-1">
                          <p className="font-medium">Aperçu (noms) :</p>
                          <ul className="list-disc pl-5">
                            {services.map((s) => (
                              <li key={s.id} className="leading-tight">
                                {s.name} ({s.category})
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        required
                        min={today}
                        value={formData.appointment_date}
                        onChange={(e) => setFormData({ ...formData, appointment_date: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time">Heure *</Label>
                      <Select
                        required
                        value={formData.appointment_time}
                        onValueChange={(value) => setFormData({ ...formData, appointment_time: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choisir l'heure" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="09:00">09:00</SelectItem>
                          <SelectItem value="10:00">10:00</SelectItem>
                          <SelectItem value="11:00">11:00</SelectItem>
                          <SelectItem value="12:00">12:00</SelectItem>
                          <SelectItem value="14:00">14:00</SelectItem>
                          <SelectItem value="15:00">15:00</SelectItem>
                          <SelectItem value="16:00">16:00</SelectItem>
                          <SelectItem value="17:00">17:00</SelectItem>
                          <SelectItem value="18:00">18:00</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes ou Demandes Spéciales</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Précisions sur votre demande, allergies, préférences..."
                      rows={4}
                    />
                  </div>
                </div>

                {error && <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">{error}</div>}

                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? "Réservation en cours..." : "Confirmer le Rendez-vous"}
                </Button>

                <p className="text-center text-xs text-muted-foreground leading-relaxed">
                  En réservant, vous acceptez nos conditions générales et notre politique d'annulation (48h avant le
                  rendez-vous).
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="mt-6 border-border bg-secondary/30">
            <CardContent className="pt-6">
              <h4 className="mb-3 font-semibold">Informations Pratiques</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Veuillez arriver 5 minutes avant votre rendez-vous</li>
                <li>• Annulation gratuite jusqu'à 48h avant le rendez-vous</li>
                <li>• Le paiement s'effectue sur place après le service</li>
                <li>• Possibilité de paiement par Mobile Money ou espèces</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
