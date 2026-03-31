import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary via-background to-muted py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl">Contactez-Nous</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Nous sommes à votre écoute pour répondre à toutes vos questions
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Contact Details */}
            <div className="space-y-8">
              <div>
                <h2 className="mb-6 font-serif text-3xl font-bold">Informations de Contact</h2>
                <p className="mb-8 text-muted-foreground leading-relaxed">
                  N'hésitez pas à nous contacter pour toute question ou pour prendre rendez-vous. Nous serons ravis de
                  vous répondre.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="border-border">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold">Adresse</h3>
                      <p className="text-sm text-muted-foreground">
                        Conakry, Guinée
                        <br />
                        (Emplacement exact communiqué lors de la prise de rendez-vous)
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold">Téléphone</h3>
                      <p className="text-sm text-muted-foreground">+224 6XX XX XX XX</p>
                      <p className="mt-1 text-xs text-muted-foreground">Disponible de 9h à 18h</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold">Email</h3>
                      <p className="text-sm text-muted-foreground">contact@hairbeaute.gn</p>
                      <p className="mt-1 text-xs text-muted-foreground">Réponse sous 24h</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold">Horaires d'Ouverture</h3>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>Lundi - Vendredi: 9h00 - 18h00</p>
                        <p>Samedi: 9h00 - 17h00</p>
                        <p>Dimanche: Sur rendez-vous uniquement</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="mb-4 font-semibold">Suivez-nous</h3>
                <div className="flex gap-3">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <Card className="border-primary/50 bg-primary/5">
                <CardContent className="p-8">
                  <h3 className="mb-4 font-serif text-2xl font-bold">Prendre Rendez-vous</h3>
                  <p className="mb-6 text-muted-foreground leading-relaxed">
                    Réservez votre créneau en ligne en quelques clics. C'est simple, rapide et sécurisé.
                  </p>
                  <Button asChild className="w-full" size="lg">
                    <Link href="/rendez-vous">Réserver Maintenant</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-8">
                  <h3 className="mb-4 font-serif text-2xl font-bold">Nos Formations</h3>
                  <p className="mb-6 text-muted-foreground leading-relaxed">
                    Intéressée par nos formations professionnelles ? Découvrez nos programmes certifiants.
                  </p>
                  <Button asChild variant="outline" className="w-full bg-transparent" size="lg">
                    <Link href="/formations">Voir les Formations</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-8">
                  <h3 className="mb-4 font-serif text-2xl font-bold">Questions Fréquentes</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="mb-1 font-semibold">Acceptez-vous les paiements par Mobile Money ?</p>
                      <p className="text-muted-foreground">Oui, nous acceptons tous les modes de paiement mobile.</p>
                    </div>
                    <div>
                      <p className="mb-1 font-semibold">Puis-je annuler mon rendez-vous ?</p>
                      <p className="text-muted-foreground">Oui, gratuitement jusqu'à 48h avant le rendez-vous.</p>
                    </div>
                    <div>
                      <p className="mb-1 font-semibold">Proposez-vous des services à domicile ?</p>
                      <p className="text-muted-foreground">
                        Oui, pour les événements et mariages. Contactez-nous pour un devis.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold">Notre Localisation</h2>
            <p className="text-muted-foreground">Situé au cœur de Conakry, facilement accessible</p>
          </div>
          <div className="mx-auto max-w-4xl">
            <div className="aspect-video overflow-hidden rounded-lg border border-border bg-muted">
              <div className="flex h-full items-center justify-center">
                <p className="text-muted-foreground">Carte interactive disponible prochainement</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
