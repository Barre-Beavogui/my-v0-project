import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, GraduationCap, Calendar, Award, Users, BookOpen } from "lucide-react"
import Link from "next/link"

export default function FormationsPage() {
  const formations = [
    {
      id: 1,
      title: "Formation Maquillage Professionnel",
      duration: "6 semaines",
      level: "Débutant à Avancé",
      price: 7200000,
      description:
        "Maîtrisez l'art du maquillage professionnel avec notre formation complète. Apprenez les techniques de maquillage mariée, soirée, photo et bien plus encore.",
      modules: [
        "Théorie des couleurs et morphologie du visage",
        "Techniques de base du maquillage",
        "Maquillage mariée et événementiel",
        "Maquillage artistique et créatif",
        "Maquillage photo et vidéo",
        "Gestion de clientèle et tarification",
      ],
      includes: ["Kit de maquillage professionnel", "Certificat de fin de formation", "Suivi post-formation"],
      image: "/professional-makeup-training-class.jpg",
    },
    {
      id: 2,
      title: "Formation Coiffure et Tresses",
      duration: "4 semaines",
      level: "Débutant à Intermédiaire",
      price: 5760000,
      description:
        "Devenez experte en coiffure africaine et tresses. Apprenez toutes les techniques de tressage, de la box braid aux tresses Fulani.",
      modules: [
        "Techniques de tressage de base",
        "Box braids et cornrows",
        "Tresses Fulani et Ghana braids",
        "Pose et entretien de perruques",
        "Coiffures événementielles",
        "Création d'entreprise dans la coiffure",
      ],
      includes: ["Matériel de pratique", "Certificat de fin de formation", "Accès à notre communauté"],
      image: "/african-braiding-hair-training.jpg",
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary via-background to-muted py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              Formations Professionnelles
            </Badge>
            <h1 className="mb-6 font-serif text-4xl font-bold md:text-5xl text-balance">
              Lancez Votre Carrière dans la Beauté
            </h1>
            <p className="mb-8 text-lg text-muted-foreground leading-relaxed">
              Des formations complètes et certifiantes pour devenir une professionnelle de la beauté reconnue. Apprenez
              avec une experte et obtenez votre certification.
            </p>
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="#formations">
                <GraduationCap className="mr-2 h-5 w-5" />
                Découvrir les Formations
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Our Training */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold">Pourquoi Choisir Nos Formations</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground leading-relaxed">
              Une formation de qualité pour un avenir professionnel réussi
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-border">
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Certification Reconnue</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Obtenez un certificat professionnel à la fin de votre formation
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Petits Groupes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Maximum 8 élèves par session pour un suivi personnalisé
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Pratique Intensive</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  70% de pratique pour maîtriser parfaitement les techniques
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Horaires Flexibles</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Sessions du matin ou après-midi selon votre disponibilité
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Formations List */}
      <section id="formations" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold">Nos Formations</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground leading-relaxed">
              Choisissez la formation qui correspond à vos ambitions
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {formations.map((formation) => (
              <Card key={formation.id} className="overflow-hidden border-border">
                <div className="aspect-[3/2] overflow-hidden bg-muted">
                  <img
                    src={formation.image || "/placeholder.svg"}
                    alt={formation.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>

                <CardHeader>
                  <div className="mb-2 flex items-center gap-2">
                    <Badge variant="secondary">{formation.duration}</Badge>
                    <Badge variant="outline">{formation.level}</Badge>
                  </div>
                  <CardTitle className="text-2xl">{formation.title}</CardTitle>
                  <CardDescription className="leading-relaxed">{formation.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Modules */}
                  <div>
                    <h4 className="mb-3 font-semibold">Programme de Formation</h4>
                    <ul className="space-y-2">
                      {formation.modules.map((module, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                          <span>{module}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Includes */}
                  <div>
                    <h4 className="mb-3 font-semibold">La Formation Inclut</h4>
                    <ul className="space-y-2">
                      {formation.includes.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between border-t border-border pt-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Prix de la formation</p>
                      <p className="text-2xl font-bold text-primary">{formation.price.toLocaleString()} GNF</p>
                    </div>
                    <Button asChild size="lg">
                      <Link href={`/inscription-formation?formation=${formation.id}`}>S'inscrire</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold">Témoignages de Nos Anciennes Élèves</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground leading-relaxed">
              Découvrez les succès de nos diplômées
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                    MC
                  </div>
                  <div>
                    <CardTitle className="text-base">Marie C.</CardTitle>
                    <CardDescription>Formation Maquillage 2023</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  "Excellente formation ! J'ai appris toutes les techniques professionnelles et j'ai pu lancer mon
                  activité de maquilleuse juste après. Merci !"
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                    AN
                  </div>
                  <div>
                    <CardTitle className="text-base">Aïcha N.</CardTitle>
                    <CardDescription>Formation Coiffure 2024</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  "Formation très complète avec beaucoup de pratique. La formatrice est patiente et très compétente. Je
                  recommande à 100%."
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                    FB
                  </div>
                  <div>
                    <CardTitle className="text-base">Fatima B.</CardTitle>
                    <CardDescription>Formation Maquillage 2023</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  "J'ai adoré cette formation. Le programme est bien structuré et le certificat m'a vraiment aidée à
                  trouver mes premiers clients."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold">Prête à Commencer Votre Formation ?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90 leading-relaxed">
            Inscrivez-vous dès maintenant et démarrez votre carrière dans la beauté
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="bg-background text-foreground hover:bg-background/90"
          >
            <Link href="/inscription-formation">
              <GraduationCap className="mr-2 h-5 w-5" />
              S'inscrire Maintenant
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
