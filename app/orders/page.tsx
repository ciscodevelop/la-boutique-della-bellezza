'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Package, ChevronRight } from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'
import { mockOrders } from '@/lib/data'
import { OrderTimeline } from '@/components/order-timeline'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const statusLabels: Record<string, string> = {
  processing: 'In Elaborazione',
  shipped: 'Spedito',
  delivered: 'Consegnato',
}

export default function OrdersPage() {
  const { isAuthenticated, user } = useAuth()

  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
          <Package className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="mt-6 font-serif text-3xl font-medium text-foreground">Accedi per vedere gli ordini</h1>
        <p className="mt-4 text-muted-foreground">
          Effettua il login per visualizzare lo storico dei tuoi ordini.
        </p>
        <Link href="/login">
          <Button className="mt-8 rounded-full" size="lg">
            Accedi
          </Button>
        </Link>
      </div>
    )
  }

  const orders = mockOrders

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-medium text-foreground">I Tuoi Ordini</h1>
          <p className="mt-1 text-muted-foreground">Traccia e gestisci i tuoi ordini</p>
        </div>
        <p className="text-sm text-muted-foreground">Bentornata, {user?.name}</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
            <Package className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="mt-6 text-lg font-medium text-foreground">Nessun ordine</h2>
          <p className="mt-2 text-muted-foreground">
            Quando effettuerai ordini, appariranno qui.
          </p>
          <Link href="/">
            <Button className="mt-6 rounded-full" size="lg">
              Inizia lo Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl bg-card border border-border p-6 shadow-sm"
            >
              {/* Order Header */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-6">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-medium text-foreground">{order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      Effettuato il {new Date(order.createdAt).toLocaleDateString('it-IT')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge
                    variant="secondary"
                    className={cn(
                      'rounded-full',
                      order.status === 'delivered' && 'bg-success/10 text-success',
                      order.status === 'shipped' && 'bg-primary/10 text-primary',
                      order.status === 'processing' && 'bg-muted text-muted-foreground'
                    )}
                  >
                    {statusLabels[order.status]}
                  </Badge>
                  <p className="font-semibold text-foreground">{order.total.toFixed(2)} &euro;</p>
                </div>
              </div>

              {/* Order Timeline */}
              <div className="py-6 border-b border-border">
                <OrderTimeline status={order.status} />
              </div>

              {/* Order Items Preview */}
              <div className="flex items-center justify-between pt-6">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {order.items.slice(0, 3).map((item, index) => (
                      <div
                        key={item.id}
                        className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-card bg-secondary"
                        style={{ zIndex: 3 - index }}
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-card bg-secondary text-xs font-medium text-muted-foreground">
                        +{order.items.length - 3}
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {order.items.reduce((sum, item) => sum + item.quantity, 0)} articoli
                  </p>
                </div>

                {order.trackingNumber && (
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Numero Tracking</p>
                      <p className="text-sm font-medium text-foreground">{order.trackingNumber}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
