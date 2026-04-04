'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Package, ShoppingCart, Plus, Edit, Truck } from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'
import { products, mockOrders } from '@/lib/data'
import { AdminProductForm } from '@/components/admin-product-form'
import { OrderTimeline } from '@/components/order-timeline'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

type Tab = 'products' | 'orders' | 'add-product'

const statusLabels: Record<string, string> = {
  processing: 'In Elaborazione',
  shipped: 'Spedito',
  delivered: 'Consegnato',
}

export default function AdminPage() {
  const { isAuthenticated, isAdmin } = useAuth()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState<Tab>('products')
  const [orders, setOrders] = useState(mockOrders)

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
          <Package className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="mt-6 font-serif text-3xl font-medium text-foreground">Accesso Admin Richiesto</h1>
        <p className="mt-4 text-muted-foreground">
          Accedi con un account admin per visualizzare questa pagina.
        </p>
        <Link href="/login">
          <Button className="mt-8 rounded-full" size="lg">
            Accedi
          </Button>
        </Link>
      </div>
    )
  }

  const handleStatusUpdate = (orderId: string, newStatus: 'processing' | 'shipped' | 'delivered') => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    )
    toast({
      title: 'Ordine aggiornato',
      description: `Stato ordine ${orderId} aggiornato a ${statusLabels[newStatus]}.`,
    })
  }

  const handleTrackingUpdate = (orderId: string, trackingNumber: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, trackingNumber } : order
      )
    )
    toast({
      title: 'Tracking aggiunto',
      description: `Numero tracking ${trackingNumber} aggiunto all'ordine ${orderId}.`,
    })
  }

  const tabs = [
    { id: 'products' as Tab, name: 'Prodotti', icon: Package },
    { id: 'orders' as Tab, name: 'Ordini', icon: ShoppingCart },
    { id: 'add-product' as Tab, name: 'Importa Prodotto', icon: Plus },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-medium text-foreground">Dashboard Admin</h1>
        <p className="mt-1 text-muted-foreground">Gestisci i tuoi prodotti e ordini</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-4 mb-8">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'ghost'}
              onClick={() => setActiveTab(tab.id)}
              className="gap-2"
            >
              <Icon className="h-4 w-4" />
              {tab.name}
            </Button>
          )
        })}
      </div>

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-foreground">Catalogo Prodotti</h2>
            <Button onClick={() => setActiveTab('add-product')} className="gap-2">
              <Plus className="h-4 w-4" />
              Aggiungi Prodotto
            </Button>
          </div>

          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Prodotto</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-foreground hidden sm:table-cell">Categoria</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Prezzo</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-foreground hidden md:table-cell">Disponibili</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-foreground">Azioni</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-secondary">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                        <div className="min-w-0">
                          {product.brand && (
                            <p className="text-xs font-medium uppercase tracking-wider text-primary">
                              {product.brand}
                            </p>
                          )}
                          <span className="font-medium text-foreground block truncate">{product.name}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-muted-foreground hidden sm:table-cell">
                      {product.category}
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-foreground">{product.price.toFixed(2)} &euro;</td>
                    <td className="px-4 py-4 text-sm text-muted-foreground hidden md:table-cell">
                      {product.stock}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <h2 className="text-lg font-medium text-foreground">Gestione Ordini</h2>

          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl bg-card border border-border p-6 shadow-sm"
              >
                {/* Order Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-6">
                  <div>
                    <p className="font-medium text-foreground">{order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.shippingAddress.name} - {order.shippingAddress.city}, {order.shippingAddress.country}
                    </p>
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

                {/* Order Items */}
                <div className="py-6 border-b border-border">
                  <p className="text-sm font-medium text-foreground mb-4">Articoli</p>
                  <div className="flex flex-wrap gap-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-secondary">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        </div>
                        <div>
                          <p className="text-sm text-foreground">{item.name}</p>
                          <p className="text-xs text-muted-foreground">Qta: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Admin Actions */}
                <div className="pt-6 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusUpdate(order.id, 'processing')}
                      disabled={order.status === 'processing'}
                    >
                      In Elaborazione
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusUpdate(order.id, 'shipped')}
                      disabled={order.status === 'shipped'}
                    >
                      <Truck className="mr-2 h-4 w-4" />
                      Spedito
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusUpdate(order.id, 'delivered')}
                      disabled={order.status === 'delivered'}
                    >
                      Consegnato
                    </Button>
                  </div>

                  {/* Tracking Number Input */}
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Label htmlFor={`tracking-${order.id}`} className="sr-only">
                        Numero Tracking
                      </Label>
                      <Input
                        id={`tracking-${order.id}`}
                        placeholder="Inserisci numero tracking"
                        defaultValue={order.trackingNumber || ''}
                      />
                    </div>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        const input = document.getElementById(`tracking-${order.id}`) as HTMLInputElement
                        if (input?.value) {
                          handleTrackingUpdate(order.id, input.value)
                        }
                      }}
                    >
                      Aggiungi Tracking
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Product Tab */}
      {activeTab === 'add-product' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium text-foreground">Importa Prodotto</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Importa prodotti da fonti esterne o aggiungili manualmente
            </p>
          </div>
          <AdminProductForm />
        </div>
      )}
    </div>
  )
}
