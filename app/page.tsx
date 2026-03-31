import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Scissors, Palette, GraduationCap, Star, Calendar, Award } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center bg-gradient-to-br from-secondary via-background to-muted">
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-6 font-serif text-5xl font-bold leading-tight text-balance md:text-6xl lg:text-7xl">
              Révélez Votre <span className="text-primary">Beauté Naturelle</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground leading-relaxed md:text-xl">
              Spécialiste en coiffure africaine, maquillage professionnel et formations certifiantes. Transformez votre
              style avec nos services sur-mesure.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/rendez-vous">
                  <Calendar className="mr-2 h-5 w-5" />
                  Prendre Rendez-vous
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/services">Découvrir nos Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">Nos Services</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground leading-relaxed">
              Des prestations de qualité adaptées à tous vos besoins beauté
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Service 1 - Coiffure */}
            <Card className="group overflow-hidden border-border hover:border-primary transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <Image
                  src="/african-braids-hairstyle-salon.jpg"
                  alt="Coiffure"
                  width={400}
                  height={300}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Scissors className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Coiffure</h3>
                <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                  Tresses africaines, pose de perruques, coiffures événementielles. Sublimez vos cheveux avec expertise.
                </p>
                <Button asChild variant="link" className="p-0 text-primary">
                  <Link href="/services#coiffure">En savoir plus →</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Service 2 - Maquillage */}
            <Card className="group overflow-hidden border-border hover:border-primary transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <Image
                  src="/makeup-artist-working.png"
                  alt="Maquillage"
                  width={400}
                  height={300}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Palette className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Maquillage</h3>
                <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                  Maquillage mariée, soirée, shooting photo. Des looks personnalisés pour chaque occasion.
                </p>
                <Button asChild variant="link" className="p-0 text-primary">
                  <Link href="/services#maquillage">En savoir plus →</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Service 3 - Formations */}
            <Card className="group overflow-hidden border-border hover:border-primary transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <Image
                  src="/beauty-training-class-professional.jpg"
                  alt="Formations"
                  width={400}
                  height={300}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Formations</h3>
                <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                  Formations professionnelles en maquillage et coiffure. Lancez votre carrière beauté.
                </p>
                <Button asChild variant="link" className="p-0 text-primary">
                  <Link href="/formations">En savoir plus →</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">Pourquoi Nous Choisir</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground leading-relaxed">
              Une expertise reconnue au service de votre beauté
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex gap-4 rounded-lg bg-card p-6 border border-border">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Award className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Expérience Professionnelle</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Plus de 5 ans d'expérience dans la beauté féminine
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-lg bg-card p-6 border border-border">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Star className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Produits de Qualité</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Utilisation exclusive de produits professionnels haut de gamme
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-lg bg-card p-6 border border-border">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Flexibilité Horaire</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Rendez-vous adaptés à votre emploi du temps
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 font-serif text-3xl font-bold md:text-4xl">Prête à Transformer Votre Look ?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90 leading-relaxed">
            Prenez rendez-vous dès maintenant et découvrez nos services personnalisés
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="bg-background text-foreground hover:bg-background/90"
          >
            <Link href="/rendez-vous">
              <Calendar className="mr-2 h-5 w-5" />
              Réserver Mon Rendez-vous
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
