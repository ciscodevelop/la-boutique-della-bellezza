'use client'

import { use, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Minus, Plus, Check, Heart } from 'lucide-react'
import { products } from '@/lib/data'
import { useCart } from '@/contexts/cart-context'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()
  const { toast } = useToast()

  const product = products.find((p) => p.id === id)

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="text-2xl font-medium text-foreground">Prodotto non trovato</h1>
        <p className="mt-2 text-muted-foreground">
          Il prodotto che cerchi non esiste.
        </p>
        <Link href="/">
          <Button className="mt-6 rounded-full">Torna allo Shop</Button>
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem(product, quantity)
    toast({
      title: 'Aggiunto al carrello',
      description: `${quantity} x ${product.name} e stato aggiunto al carrello.`,
    })
  }

  const inStock = product.stock > 0

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Torna allo Shop
      </Link>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-secondary">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 h-10 w-10 rounded-full bg-card/80 backdrop-blur hover:bg-card"
              aria-label="Aggiungi ai preferiti"
            >
              <Heart className="h-5 w-5" />
            </Button>
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    'relative h-20 w-20 overflow-hidden rounded-xl border-2 transition-colors',
                    selectedImage === index
                      ? 'border-primary'
                      : 'border-transparent hover:border-muted-foreground/50'
                  )}
                >
                  <Image
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="flex-1">
            {product.brand && (
              <p className="text-sm font-medium uppercase tracking-wider text-primary">
                {product.brand}
              </p>
            )}
            <h1 className="mt-2 font-serif text-3xl font-medium text-foreground sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-4 text-2xl font-semibold text-foreground">
              {product.price.toFixed(2)} &euro;
            </p>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Stock Indicator */}
            <div className="mt-6 flex items-center gap-2">
              {inStock ? (
                <>
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-success">
                    <Check className="h-3 w-3 text-success-foreground" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.stock} disponibili
                  </span>
                </>
              ) : (
                <>
                  <div className="h-2 w-2 rounded-full bg-destructive" />
                  <span className="text-sm text-muted-foreground">Non disponibile</span>
                </>
              )}
            </div>

            {/* Category Badge */}
            <div className="mt-4">
              <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                {product.category}
              </span>
            </div>
          </div>

          {/* Add to Cart Section */}
          <div className="mt-8 space-y-4 border-t border-border pt-8">
            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-foreground">Quantita</span>
              <div className="flex items-center rounded-full border border-border">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  aria-label="Diminuisci quantita"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center text-sm font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                  aria-label="Aumenta quantita"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              disabled={!inStock}
              className="w-full rounded-full py-6 text-base"
              size="lg"
            >
              {inStock ? `Aggiungi al Carrello - ${(product.price * quantity).toFixed(2)} \u20AC` : 'Non Disponibile'}
            </Button>

            {/* Additional Info */}
            <div className="mt-6 space-y-3 rounded-xl bg-secondary/50 p-4 text-sm text-muted-foreground">
              <p>Spedizione gratuita per ordini sopra i 50 euro</p>
              <p>Reso gratuito entro 30 giorni</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
