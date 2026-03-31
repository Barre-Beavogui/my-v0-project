import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, DollarSign } from "lucide-react"
import Link from "next/link"

export default async function ServicesPage() {
  const supabase = await createClient()

  // Fetch services from database
  const { data: services, error } = await supabase.from("services").select("*").order("category", { ascending: true })

  if (error) {
    console.error("[v0] Error fetching services:", error)
  }

  // Group services by category
  const servicesByCategory = {
    hair: services?.filter((s) => s.category === "hair") || [],
    makeup: services?.filter((s) => s.category === "makeup") || [],
    training: services?.filter((s) => s.category === "training") || [],
  }

  const categoryInfo = {
    hair: {
      title: "Coiffure",
      description: "Des coiffures élégantes et tendance pour sublimer votre beauté naturelle",
      id: "coiffure",
    },
    makeup: {
      title: "Maquillage",
      description: "Un maquillage professionnel adapté à chaque occasion",
      id: "maquillage",
    },
    training: {
      title: "Formations Professionnelles",
      description: "Devenez experte en beauté avec nos formations certifiantes",
      id: "formations",
    },
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary via-background to-muted py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl">Nos Services</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Découvrez notre gamme complète de services beauté, conçus pour révéler votre élégance naturelle
          </p>
        </div>
      </section>

      {/* Services by Category */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Hair Services */}
          <div id={categoryInfo.hair.id} className="mb-20">
            <div className="mb-8 text-center">
              <h2 className="mb-3 font-serif text-3xl font-bold">{categoryInfo.hair.title}</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground leading-relaxed">{categoryInfo.hair.description}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {servicesByCategory.hair.map((service) => (
                <Card
                  key={service.id}
                  className="group overflow-hidden border-border hover:border-primary transition-all"
                >
                  <CardHeader className="pb-4">
                    <h3 className="text-xl font-semibold">{service.name}</h3>
                    <Badge variant="secondary" className="w-fit">
                      Coiffure
                    </Badge>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <p className="mb-4 text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {service.duration_minutes && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-primary" />
                          <span>{service.duration_minutes} min</span>
                        </div>
                      )}
                      {service.price_xaf && (
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-primary" />
                          <span className="font-semibold">{service.price_xaf.toLocaleString()} GNF</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href="/rendez-vous">Réserver</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          {/* Makeup Services */}
          <div id={categoryInfo.makeup.id} className="mb-20">
            <div className="mb-8 text-center">
              <h2 className="mb-3 font-serif text-3xl font-bold">{categoryInfo.makeup.title}</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground leading-relaxed">
                {categoryInfo.makeup.description}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {servicesByCategory.makeup.map((service) => (
                <Card
                  key={service.id}
                  className="group overflow-hidden border-border hover:border-primary transition-all"
                >
                  <CardHeader className="pb-4">
                    <h3 className="text-xl font-semibold">{service.name}</h3>
                    <Badge variant="secondary" className="w-fit">
                      Maquillage
                    </Badge>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <p className="mb-4 text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {service.duration_minutes && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-primary" />
                          <span>{service.duration_minutes} min</span>
                        </div>
                      )}
                      {service.price_xaf && (
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-primary" />
                          <span className="font-semibold">{service.price_xaf.toLocaleString()} GNF</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href="/rendez-vous">Réserver</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          {/* Training Services */}
          <div id={categoryInfo.training.id}>
            <div className="mb-8 text-center">
              <h2 className="mb-3 font-serif text-3xl font-bold">{categoryInfo.training.title}</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground leading-relaxed">
                {categoryInfo.training.description}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {servicesByCategory.training.map((service) => (
                <Card
                  key={service.id}
                  className="group overflow-hidden border-border hover:border-primary transition-all"
                >
                  <CardHeader className="pb-4">
                    <h3 className="text-xl font-semibold">{service.name}</h3>
                    <Badge variant="secondary" className="w-fit">
                      Formation
                    </Badge>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <p className="mb-4 text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {service.price_xaf && (
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-primary" />
                          <span className="font-semibold">{service.price_xaf.toLocaleString()} GNF</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full bg-transparent" variant="outline">
                      <Link href="/formations">En savoir plus</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold">Prête à Réserver ?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90 leading-relaxed">
            Choisissez votre service et prenez rendez-vous en quelques clics
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
