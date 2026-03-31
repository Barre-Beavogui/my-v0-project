"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function InscriptionFormationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const formationId = searchParams.get("formation")

  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    student_name: "",
    student_email: "",
    student_phone: "",
    training_type: formationId === "1" ? "makeup" : formationId === "2" ? "hairstyling" : "",
    experience_level: "",
    start_date: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()

      const { error: insertError } = await supabase.from("training_registrations").insert([
        {
          student_name: formData.student_name,
          student_email: formData.student_email,
          student_phone: formData.student_phone,
          training_type: formData.training_type,
          experience_level: formData.experience_level,
          start_date: formData.start_date || null,
          message: formData.message || null,
        },
      ])

      if (insertError) throw insertError

      setSuccess(true)
    } catch (err) {
      console.error("[v0] Error submitting registration:", err)
      setError("Une erreur est survenue lors de l'inscription. Veuillez réessayer.")
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
            <CardTitle className="text-2xl">Inscription Réussie !</CardTitle>
            <CardDescription className="leading-relaxed">
              Votre demande d'inscription a été envoyée avec succès. Nous vous contactons dans les plus brefs délais
              pour confirmer votre inscription.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full">
              <Link href="/formations">Retour aux Formations</Link>
            </Button>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/">Retour à l'Accueil</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl">
          <Button asChild variant="ghost" className="mb-6">
            <Link href="/formations">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux Formations
            </Link>
          </Button>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-2xl">Inscription à la Formation</CardTitle>
              <CardDescription className="leading-relaxed">
                Remplissez le formulaire ci-dessous pour vous inscrire à nos formations professionnelles. Nous vous
                contacterons sous 48h pour confirmer votre inscription.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Informations Personnelles</h3>

                  <div className="space-y-2">
                    <Label htmlFor="name">Nom Complet *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.student_name}
                      onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                      placeholder="Votre nom complet"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.student_email}
                      onChange={(e) => setFormData({ ...formData, student_email: e.target.value })}
                      placeholder="votre@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.student_phone}
                      onChange={(e) => setFormData({ ...formData, student_phone: e.target.value })}
                      placeholder="+237 6XX XX XX XX"
                    />
                  </div>
                </div>

                {/* Training Details */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Détails de la Formation</h3>

                  <div className="space-y-2">
                    <Label htmlFor="training">Type de Formation *</Label>
                    <Select
                      required
                      value={formData.training_type}
                      onValueChange={(value) => setFormData({ ...formData, training_type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choisissez une formation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="makeup">Formation Maquillage Professionnel</SelectItem>
                        <SelectItem value="hairstyling">Formation Coiffure et Tresses</SelectItem>
                        <SelectItem value="both">Les Deux Formations</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Niveau d'Expérience *</Label>
                    <RadioGroup
                      required
                      value={formData.experience_level}
                      onValueChange={(value) => setFormData({ ...formData, experience_level: value })}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="beginner" id="beginner" />
                        <Label htmlFor="beginner" className="font-normal">
                          Débutant (Aucune expérience)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="intermediate" id="intermediate" />
                        <Label htmlFor="intermediate" className="font-normal">
                          Intermédiaire (Quelques connaissances)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="advanced" id="advanced" />
                        <Label htmlFor="advanced" className="font-normal">
                          Avancé (Je souhaite me perfectionner)
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="start-date">Date de Début Souhaitée</Label>
                    <Input
                      id="start-date"
                      value={formData.start_date}
                      onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                      placeholder="Ex: Janvier 2025, dès que possible..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message (Optionnel)</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Questions ou informations supplémentaires..."
                      rows={4}
                    />
                  </div>
                </div>

                {error && <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">{error}</div>}

                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? "Envoi en cours..." : "Envoyer ma Demande d'Inscription"}
                </Button>

                <p className="text-center text-xs text-muted-foreground leading-relaxed">
                  En soumettant ce formulaire, vous acceptez d'être contacté par notre équipe concernant votre
                  inscription.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
