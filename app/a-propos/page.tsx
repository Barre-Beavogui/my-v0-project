import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Award, Heart, Users, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AProposPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary via-background to-muted py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 font-serif text-4xl font-bold md:text-5xl">À Propos de Nous</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Passionnée par la beauté et l'élégance, je mets mon expertise au service de votre bien-être depuis plus de
              5 ans.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center">
              <h2 className="mb-6 font-serif text-3xl font-bold">Notre Histoire</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Bienvenue chez <span className="font-semibold text-foreground">Hair&Beauté</span>, votre destination
                  beauté à Conakry. Fondé par une passionnée de la beauté africaine, notre salon est né d'un rêve :
                  permettre à chaque femme de révéler sa beauté naturelle et sa confiance en elle.
                </p>
                <p>
                  Spécialisée dans la coiffure africaine et le maquillage professionnel, j'ai développé mon expertise
                  auprès des plus grands professionnels du secteur. Aujourd'hui, je partage cette passion à travers des
                  prestations personnalisées et des formations de qualité.
                </p>
                <p>
                  Mon objectif est simple : offrir des services de beauté exceptionnels dans un environnement chaleureux
                  et professionnel, où chaque cliente se sent unique et valorisée.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-lg border border-border">
                <Image
                  src="/beauty-salon-owner-portrait.jpg"
                  alt="Fondatrice du salon"
                  width={500}
                  height={625}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold">Nos Valeurs</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground leading-relaxed">
              Ce qui guide notre travail au quotidien
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-border text-center">
              <CardContent className="pt-6">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Excellence</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Nous visons l'excellence dans chaque prestation, avec une attention particulière aux détails
                </p>
              </CardContent>
            </Card>

            <Card className="border-border text-center">
              <CardContent className="pt-6">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Passion</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  La beauté est notre passion, et nous la transmettons dans chaque création
                </p>
              </CardContent>
            </Card>

            <Card className="border-border text-center">
              <CardContent className="pt-6">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Écoute</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Nous écoutons vos besoins pour créer des looks personnalisés et uniques
                </p>
              </CardContent>
            </Card>

            <Card className="border-border text-center">
              <CardContent className="pt-6">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Professionnalisme</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Des techniques maîtrisées et des produits de qualité pour des résultats impeccables
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 text-center md:grid-cols-3">
            <div>
              <div className="mb-2 font-serif text-4xl font-bold text-primary">500+</div>
              <p className="text-muted-foreground">Clientes Satisfaites</p>
            </div>
            <div>
              <div className="mb-2 font-serif text-4xl font-bold text-primary">5+</div>
              <p className="text-muted-foreground">Années d'Expérience</p>
            </div>
            <div>
              <div className="mb-2 font-serif text-4xl font-bold text-primary">50+</div>
              <p className="text-muted-foreground">Élèves Formées</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold">Rejoignez Notre Communauté</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90 leading-relaxed">
            Découvrez nos services et faites partie de l'aventure Hair&Beauté
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="bg-background text-foreground hover:bg-background/90"
          >
            <Link href="/rendez-vous">Prendre Rendez-vous</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
