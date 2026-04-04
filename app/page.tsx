import { products, categories } from "@/lib/data";
import { ProductGrid } from "@/components/product-grid";
import Link from "next/link";
import {
  Scissors,
  MapPin,
  Clock,
  Phone,
  Sparkles,
  Droplets,
} from "lucide-react";

type HomePageProps = {
  searchParams?: Promise<{
    category?: string | string[];
  }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedSearchParams = await searchParams;
  const categoryValue = resolvedSearchParams?.category;
  const categoryParam =
    typeof categoryValue === "string"
      ? categoryValue
      : Array.isArray(categoryValue)
        ? categoryValue[0]
        : null;

  const filteredProducts =
    categoryParam && categoryParam !== "Tutti"
      ? products.filter((p) => p.category === categoryParam)
      : products;

  const boutiqueProducts = products.filter(
    (p) => p.brand === "La Boutique della Bellezza",
  );
  const davinesProducts = products.filter((p) => p.brand === "DAVINES");

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="hero-salon-background absolute inset-0" />
        <div className="absolute inset-0 bg-white/80" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
              Parrucchiera Uomo Donna Bambino
            </p>
            <h1 className="font-serif text-4xl font-medium tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              Boutique della Bellezza
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground text-pretty leading-relaxed">
              Il tuo salone di fiducia a Milano Citta Studi. Cosmetici esclusivi
              a marchio proprio con collagene e bava di lumaca, e vendita
              prodotti DAVINES.
            </p>
            <div className="mt-8 flex items-center justify-center gap-2 text-muted-foreground">
              <MapPin className="h-5 w-5 text-primary" />
              <span>Via Beato Angelico 31, Milano - Citta Studi</span>
            </div>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/?category=Collagene"
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Linea Collagene
              </Link>
              <Link
                href="/?category=Bava di Lumaca"
                className="inline-flex items-center justify-center rounded-full border border-foreground/20 bg-background px-8 py-3 text-sm font-medium text-foreground transition-all hover:bg-secondary"
              >
                <Droplets className="mr-2 h-4 w-4" />
                Linea Bava di Lumaca
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Info Bar */}
      <section className="border-b border-border bg-card px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-8 md:flex-row md:gap-16">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Scissors className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">Servizio Completo</p>
              <p className="text-sm text-muted-foreground">
                Taglio uomo, donna, bambino
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">Cosmetici Esclusivi</p>
              <p className="text-sm text-muted-foreground">
                Linea propria collagene e bava di lumaca
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">Orari</p>
              <p className="text-sm text-muted-foreground">
                Mar-Sab 9:00-19:00
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured: La Boutique della Bellezza Products */}
      {!categoryParam && (
        <section className="bg-secondary/20 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center">
              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
                I Nostri Prodotti Esclusivi
              </p>
              <h2 className="font-serif text-3xl font-medium text-foreground sm:text-4xl">
                Linea La Boutique della Bellezza
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Cosmetici di alta qualita formulati con ingredienti naturali.
                Scopri le nostre linee esclusive al collagene e alla bava di
                lumaca.
              </p>
            </div>
            <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/?category=Collagene"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
              >
                <Sparkles className="h-4 w-4" />
                Linea Collagene
              </Link>
              <Link
                href="/?category=Bava di Lumaca"
                className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-6 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-secondary"
              >
                <Droplets className="h-4 w-4" />
                Linea Bava di Lumaca
              </Link>
            </div>
            <ProductGrid products={boutiqueProducts.slice(0, 5)} />
            <div className="mt-10 text-center">
              <Link
                href="/?category=Collagene"
                className="inline-flex items-center text-sm font-medium text-primary hover:underline"
              >
                Vedi tutti i prodotti La Boutique della Bellezza
                <svg
                  className="ml-1 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Category Pills */}
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 text-center">
            <h2 className="font-serif text-2xl font-medium text-foreground sm:text-3xl">
              {categoryParam ? categoryParam : "Tutti i Prodotti"}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {categoryParam
                ? `Scopri la nostra selezione di prodotti ${categoryParam}`
                : "Cosmetici esclusivi e prodotti professionali DAVINES"}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={cat === "Tutti" ? "/" : `/?category=${cat}`}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  (cat === "Tutti" && !categoryParam) || categoryParam === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="px-4 py-8 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <p className="text-sm text-muted-foreground">
              {filteredProducts.length} prodotti disponibili
            </p>
          </div>
          <ProductGrid products={filteredProducts} />
        </div>
      </section>

      {/* DAVINES Section (only on homepage) */}
      {!categoryParam && (
        <section className="border-t border-border bg-card px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center">
              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-muted-foreground">
                Rivenditore Autorizzato
              </p>
              <h2 className="font-serif text-3xl font-medium text-foreground sm:text-4xl">
                Prodotti DAVINES
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Prodotti professionali italiani per la cura dei capelli. Formule
                sostenibili e ingredienti di alta qualita.
              </p>
            </div>
            <ProductGrid products={davinesProducts.slice(0, 4)} />
            <div className="mt-10 text-center">
              <Link
                href="/?category=Shampoo"
                className="inline-flex items-center text-sm font-medium text-primary hover:underline"
              >
                Vedi tutti i prodotti DAVINES
                <svg
                  className="ml-1 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-border bg-card px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="md:col-span-2">
              <p className="font-serif text-2xl font-medium text-primary">
                Boutique della Bellezza
              </p>
              <p className="mt-4 max-w-sm text-muted-foreground leading-relaxed">
                Il tuo salone di parrucchieria a Milano Citta Studi. Cosmetici
                esclusivi a marchio proprio con collagene e bava di lumaca, e
                vendita prodotti DAVINES.
              </p>
              <div className="mt-6 space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Via Beato Angelico 31, 20133 Milano
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  +39 02 1234567
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  Mar-Sab 9:00-19:00
                </p>
              </div>
            </div>
            <div>
              <p className="font-medium text-foreground">Cosmetici</p>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/?category=Collagene"
                    className="hover:text-foreground transition-colors"
                  >
                    Linea Collagene
                  </Link>
                </li>
                <li>
                  <Link
                    href="/?category=Bava di Lumaca"
                    className="hover:text-foreground transition-colors"
                  >
                    Linea Bava di Lumaca
                  </Link>
                </li>
              </ul>
              <p className="font-medium text-foreground mt-6">
                Capelli DAVINES
              </p>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/?category=Shampoo"
                    className="hover:text-foreground transition-colors"
                  >
                    Shampoo
                  </Link>
                </li>
                <li>
                  <Link
                    href="/?category=Balsamo"
                    className="hover:text-foreground transition-colors"
                  >
                    Balsamo
                  </Link>
                </li>
                <li>
                  <Link
                    href="/?category=Trattamenti Capelli"
                    className="hover:text-foreground transition-colors"
                  >
                    Trattamenti
                  </Link>
                </li>
                <li>
                  <Link
                    href="/?category=Styling"
                    className="hover:text-foreground transition-colors"
                  >
                    Styling
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-foreground">Servizi Salone</p>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>Taglio Uomo</li>
                <li>Taglio Donna</li>
                <li>Taglio Bambino</li>
                <li>Colore e Meches</li>
                <li>Trattamenti Curativi</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-border pt-8">
            <p className="text-center text-sm text-muted-foreground">
              &copy; 2024 Boutique della Bellezza. Via Beato Angelico 31, Milano
              - Citta Studi. Tutti i diritti riservati.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
