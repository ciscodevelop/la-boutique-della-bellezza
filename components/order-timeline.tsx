'use client'

import { Package, Truck, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface OrderTimelineProps {
  status: 'processing' | 'shipped' | 'delivered'
}

const steps = [
  { id: 'processing', name: 'In Elaborazione', icon: Package },
  { id: 'shipped', name: 'Spedito', icon: Truck },
  { id: 'delivered', name: 'Consegnato', icon: CheckCircle },
]

export function OrderTimeline({ status }: OrderTimelineProps) {
  const currentStepIndex = steps.findIndex((step) => step.id === status)

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon
          const isCompleted = index <= currentStepIndex
          const isCurrent = index === currentStepIndex

          return (
            <div key={step.id} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors',
                    isCompleted
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-muted bg-background text-muted-foreground'
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span
                  className={cn(
                    'mt-2 text-xs font-medium',
                    isCurrent ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {step.name}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'mx-2 h-0.5 flex-1',
                    index < currentStepIndex ? 'bg-primary' : 'bg-muted'
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
