import Link from 'next/link'
import { CheckCircle, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { OrderTimeline } from '@/components/order-timeline'

export default function OrderSuccessPage() {
  // Mock order data
  const orderNumber = 'ORD-' + Math.random().toString(36).substring(2, 8).toUpperCase()

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 lg:px-8">
      {/* Success Icon */}
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
        <CheckCircle className="h-10 w-10 text-success" />
      </div>

      {/* Success Message */}
      <h1 className="mt-8 font-serif text-3xl font-medium text-foreground sm:text-4xl">
        Grazie per il tuo ordine!
      </h1>
      <p className="mt-4 text-muted-foreground">
        Il tuo ordine e stato confermato e sara spedito a breve.
      </p>

      {/* Order Number */}
      <div className="mt-8 rounded-2xl bg-card border border-border p-6">
        <p className="text-sm text-muted-foreground">Numero Ordine</p>
        <p className="mt-1 text-lg font-medium text-foreground">{orderNumber}</p>
      </div>

      {/* Order Summary */}
      <div className="mt-8 rounded-2xl bg-card border border-border p-6 text-left">
        <h2 className="text-lg font-medium text-foreground mb-6">Stato Ordine</h2>
        <OrderTimeline status="processing" />
        <div className="mt-8 space-y-4 border-t border-border pt-6">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Consegna Stimata</span>
            <span className="text-foreground">3-5 Giorni Lavorativi</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Indirizzo di Spedizione</span>
            <span className="text-foreground text-right">Verra inviato via email</span>
          </div>
        </div>
      </div>

      {/* Confirmation Email */}
      <p className="mt-8 text-sm text-muted-foreground">
        Una email di conferma e stata inviata al tuo indirizzo con tutti i dettagli dell&apos;ordine.
      </p>

      {/* Thank You */}
      <div className="mt-6 flex items-center justify-center gap-2 text-sm text-primary">
        <Heart className="h-4 w-4" />
        <span>Grazie per aver scelto Bellezza</span>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
        <Link href="/orders">
          <Button variant="outline" className="rounded-full w-full sm:w-auto" size="lg">
            Vedi Ordini
          </Button>
        </Link>
        <Link href="/">
          <Button className="rounded-full w-full sm:w-auto" size="lg">
            Continua lo Shopping
          </Button>
        </Link>
      </div>
    </div>
  )
}
