'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const success = await login(formData.email, formData.password)

    if (success) {
      toast({
        title: 'Bentornata!',
        description: 'Accesso effettuato con successo.',
      })
      router.push('/')
    } else {
      toast({
        title: 'Errore',
        description: 'Email o password non validi.',
        variant: 'destructive',
      })
    }

    setIsLoading(false)
  }

  return (
    <div className="mx-auto max-w-md px-4 py-20 sm:px-6 lg:px-8">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Torna allo Shop
      </Link>

      <div className="text-center mb-8">
        <p className="font-serif text-3xl font-medium text-primary mb-2">Bellezza</p>
        <h1 className="font-serif text-2xl font-medium text-foreground">Bentornata</h1>
        <p className="mt-2 text-muted-foreground">
          Accedi al tuo account per continuare
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="maria@esempio.it"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Inserisci la password"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-full py-6 text-base"
          size="lg"
        >
          {isLoading ? 'Accesso in corso...' : 'Accedi'}
        </Button>
      </form>

      {/* Demo Accounts */}
      <div className="mt-8 rounded-xl bg-secondary/50 p-4">
        <p className="text-sm font-medium text-foreground mb-2">Account Demo</p>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>Utente: <span className="font-mono">user@example.com</span></p>
          <p>Admin: <span className="font-mono">admin@example.com</span></p>
          <p className="text-xs">(qualsiasi password funziona)</p>
        </div>
      </div>
    </div>
  )
}
