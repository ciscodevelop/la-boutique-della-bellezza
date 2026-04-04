'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '@/contexts/cart-context'
import { Button } from '@/components/ui/button'

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice } = useCart()

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="mt-6 font-serif text-3xl font-medium text-foreground">Il tuo carrello e vuoto</h1>
        <p className="mt-4 text-muted-foreground">
          Non hai ancora aggiunto nessun prodotto al carrello.
        </p>
        <Link href="/">
          <Button className="mt-8 rounded-full" size="lg">
            Continua lo Shopping
          </Button>
        </Link>
      </div>
    )
  }

  const shipping = totalPrice >= 50 ? 0 : 4.99
  const finalTotal = totalPrice + shipping

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Continua lo Shopping
      </Link>

      <h1 className="font-serif text-3xl font-medium text-foreground mb-8">Il tuo Carrello</h1>

      <div className="grid gap-12 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 sm:gap-6 border-b border-border pb-6"
            >
              {/* Product Image */}
              <Link href={`/product/${item.id}`} className="relative h-24 w-24 sm:h-28 sm:w-28 flex-shrink-0 overflow-hidden rounded-xl bg-secondary">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </Link>

              {/* Product Details */}
              <div className="flex flex-1 flex-col justify-between min-w-0">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      {item.brand && (
                        <p className="text-xs font-medium uppercase tracking-wider text-primary">
                          {item.brand}
                        </p>
                      )}
                      <Link href={`/product/${item.id}`} className="block font-medium text-foreground hover:underline truncate">
                        {item.name}
                      </Link>
                    </div>
                    <p className="font-semibold text-foreground whitespace-nowrap">
                      {(item.price * item.quantity).toFixed(2)} &euro;
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-2">
                  {/* Quantity Controls */}
                  <div className="flex items-center rounded-full border border-border">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label="Diminuisci quantita"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                      aria-label="Aumenta quantita"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  {/* Remove Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Rimuovi</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl bg-card border border-border p-6 shadow-sm sticky top-24">
            <h2 className="text-lg font-medium text-foreground">Riepilogo Ordine</h2>
            
            <div className="mt-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotale</span>
                <span className="text-foreground">{totalPrice.toFixed(2)} &euro;</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Spedizione</span>
                <span className="text-foreground">
                  {shipping === 0 ? 'Gratuita' : `${shipping.toFixed(2)} \u20AC`}
                </span>
              </div>
              {totalPrice < 50 && (
                <p className="text-xs text-primary">
                  Aggiungi {(50 - totalPrice).toFixed(2)} euro per la spedizione gratuita
                </p>
              )}
              <div className="border-t border-border pt-4">
                <div className="flex justify-between font-semibold">
                  <span className="text-foreground">Totale</span>
                  <span className="text-foreground">{finalTotal.toFixed(2)} &euro;</span>
                </div>
              </div>
            </div>

            <Link href="/checkout" className="block mt-6">
              <Button className="w-full rounded-full py-6 text-base" size="lg">
                Procedi al Checkout
              </Button>
            </Link>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Pagamento sicuro con Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
