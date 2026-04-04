'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import type { Product } from '@/lib/data'
import { useCart } from '@/contexts/cart-context'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    toast({
      title: 'Aggiunto al carrello',
      description: `${product.name} e stato aggiunto al carrello.`,
    })
  }

  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-secondary">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-foreground/0 transition-colors group-hover:bg-foreground/5" />
        <Button
          size="icon"
          onClick={handleAddToCart}
          className="absolute bottom-3 right-3 h-9 w-9 rounded-full bg-primary text-primary-foreground opacity-0 shadow-lg transition-all hover:bg-primary/90 group-hover:opacity-100"
          aria-label={`Aggiungi ${product.name} al carrello`}
        >
          <ShoppingBag className="h-4 w-4" />
        </Button>
        {product.stock < 10 && product.stock > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-2 py-1 text-xs font-medium text-accent-foreground">
            Ultimi pezzi
          </span>
        )}
      </div>
      <div className="mt-3 space-y-1">
        {product.brand && (
          <p className="text-xs font-medium uppercase tracking-wider text-primary">
            {product.brand}
          </p>
        )}
        <h3 className="text-sm font-medium text-foreground leading-tight line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm font-semibold text-foreground">
          {product.price.toFixed(2)} &euro;
        </p>
      </div>
    </Link>
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[3/4] rounded-xl bg-secondary" />
      <div className="mt-3 space-y-2">
        <div className="h-3 w-16 rounded bg-secondary" />
        <div className="h-4 w-full rounded bg-secondary" />
        <div className="h-4 w-12 rounded bg-secondary" />
      </div>
    </div>
  )
}
