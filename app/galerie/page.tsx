"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"
import Image from "next/image"

interface GalleryImage {
  id: string
  title: string | null
  category: string
  image_url: string
  description: string | null
}

export default function GaleriePage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("all")

  useEffect(() => {
    const fetchImages = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("[v0] Error fetching gallery images:", error)
      } else {
        setImages(data || [])
      }
      setIsLoading(false)
    }

    fetchImages()
  }, [])

  const filteredImages = activeCategory === "all" ? images : images.filter((img) => img.category === activeCategory)

  const categories = [
    { value: "all", label: "Tous" },
    { value: "hair", label: "Coiffure" },
    { value: "makeup", label: "Maquillage" },
    { value: "event", label: "Événements" },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary via-background to-muted py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl">Galerie de Réalisations</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Découvrez nos créations et laissez-vous inspirer par nos réalisations en coiffure et maquillage
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <TabsList className="mx-auto mb-8 flex w-fit">
              {categories.map((cat) => (
                <TabsTrigger key={cat.value} value={cat.value}>
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {isLoading ? (
              <div className="flex min-h-[400px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredImages.length === 0 ? (
              <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
                <p className="mb-2 text-lg font-semibold">Aucune image disponible</p>
                <p className="text-sm text-muted-foreground">Revenez bientôt pour découvrir nos nouvelles créations</p>
              </div>
            ) : (
              <TabsContent value={activeCategory} className="mt-0">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredImages.map((image) => (
                    <div
                      key={image.id}
                      className="group relative overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary"
                    >
                      <div className="aspect-square overflow-hidden">
                        <Image
                          src={image.image_url || "/placeholder.svg"}
                          alt={image.title || "Gallery image"}
                          width={400}
                          height={400}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          {image.title && <h3 className="mb-1 font-semibold">{image.title}</h3>}
                          {image.description && <p className="text-sm opacity-90">{image.description}</p>}
                          <Badge variant="secondary" className="mt-2">
                            {image.category === "hair"
                              ? "Coiffure"
                              : image.category === "makeup"
                                ? "Maquillage"
                                : "Événement"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold">Inspirée par Nos Créations ?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90 leading-relaxed">
            Réservez votre rendez-vous et laissez-nous sublimer votre beauté
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="bg-background text-foreground hover:bg-background/90"
          >
            <a href="/rendez-vous">Prendre Rendez-vous</a>
          </Button>
        </div>
      </section>
    </div>
  )
}
