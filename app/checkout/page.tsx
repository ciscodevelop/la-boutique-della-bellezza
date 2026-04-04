'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ShoppingBag } from 'lucide-react'
import { useCart } from '@/contexts/cart-context'
import { CheckoutForm } from '@/components/checkout-form'
import { Button } from '@/components/ui/button'

export default function CheckoutPage() {
  const { items, totalPrice } = useCart()

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="mt-6 font-serif text-3xl font-medium text-foreground">Il tuo carrello e vuoto</h1>
        <p className="mt-4 text-muted-foreground">
          Aggiungi prodotti al carrello prima di procedere al checkout.
        </p>
        <Link href="/">
          <Button className="mt-8 rounded-full" size="lg">
            Continua lo Shopping
          </Button>
        </Link>
      </div>
    )
  }

  const shippingCost = totalPrice >= 50 ? 0 : 4.99
  const orderTotal = totalPrice + shippingCost

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Back Button */}
      <Link
        href="/cart"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Torna al Carrello
      </Link>

      <h1 className="font-serif text-3xl font-medium text-foreground mb-8">Checkout</h1>

      <div className="grid gap-12 lg:grid-cols-3">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <CheckoutForm />
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl bg-card border border-border p-6 shadow-sm sticky top-24">
            <h2 className="text-lg font-medium text-foreground">Riepilogo Ordine</h2>
            
            {/* Items */}
            <div className="mt-6 space-y-4 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-secondary">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    {item.brand && (
                      <p className="text-xs font-medium uppercase tracking-wider text-primary">
                        {item.brand}
                      </p>
                    )}
                    <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Qta: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold text-foreground whitespace-nowrap">
                    {(item.price * item.quantity).toFixed(2)} &euro;
                  </p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="mt-6 space-y-3 border-t border-border pt-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotale</span>
                <span className="text-foreground">{totalPrice.toFixed(2)} &euro;</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Spedizione</span>
                <span className="text-foreground">
                  {shippingCost === 0 ? 'Gratuita' : `${shippingCost.toFixed(2)} \u20AC`}
                </span>
              </div>
              <div className="border-t border-border pt-3">
                <div className="flex justify-between font-semibold text-lg">
                  <span className="text-foreground">Totale</span>
                  <span className="text-foreground">{orderTotal.toFixed(2)} &euro;</span>
                </div>
              </div>
            </div>

            {totalPrice < 50 && (
              <p className="mt-4 text-sm text-primary text-center">
                Aggiungi {(50 - totalPrice).toFixed(2)} &euro; per la spedizione gratuita
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
