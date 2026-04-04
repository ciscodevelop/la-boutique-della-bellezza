'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Upload, Sparkles, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { categories } from '@/lib/data'

interface ProductFormData {
  name: string
  description: string
  price: string
  category: string
  stock: string
  imageUrl: string
}

export function AdminProductForm() {
  const { toast } = useToast()
  const [importText, setImportText] = useState('')
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    imageUrl: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImportParse = () => {
    if (!importText.trim()) return

    // Simple parsing logic - extract product info from pasted text
    const lines = importText.split('\n').filter((line) => line.trim())
    const firstLine = lines[0] || ''
    const description = lines.slice(1).join(' ').trim()

    // Try to extract price (look for $ or numbers)
    const priceMatch = importText.match(/\$?(\d+(?:\.\d{2})?)/);
    const price = priceMatch ? priceMatch[1] : ''

    // Generate a name from the first line
    const name = firstLine.slice(0, 50).trim()

    setFormData((prev) => ({
      ...prev,
      name: name || prev.name,
      description: description || firstLine,
      price: price || prev.price,
    }))

    toast({
      title: 'Content parsed',
      description: 'Product details have been auto-filled. Please review and edit as needed.',
    })
  }

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: 'Product saved',
      description: `${formData.name} has been added to the catalog.`,
    })
    // Reset form
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      stock: '',
      imageUrl: '',
    })
    setImportText('')
  }

  const clearForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      stock: '',
      imageUrl: '',
    })
    setImportText('')
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Import Section */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-foreground">Import Product</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Paste a product description from social media or other sources
          </p>
        </div>

        {/* Image URL Input */}
        <div className="space-y-2">
          <Label htmlFor="imageUrl">Image URL</Label>
          <div className="flex gap-2">
            <Input
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleImageUrlChange}
              placeholder="https://example.com/image.jpg"
            />
            <Button type="button" variant="outline" size="icon" className="shrink-0">
              <Upload className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Image Preview */}
        {formData.imageUrl && (
          <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-xl bg-muted">
            <Image
              src={formData.imageUrl}
              alt="Product preview"
              fill
              className="object-cover"
              sizes="320px"
              onError={() => {
                toast({
                  title: 'Invalid image URL',
                  description: 'Could not load the image from the provided URL.',
                  variant: 'destructive',
                })
              }}
            />
            <button
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, imageUrl: '' }))}
              className="absolute top-2 right-2 p-1 rounded-full bg-foreground/80 text-background hover:bg-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Import Text Area */}
        <div className="space-y-2">
          <Label htmlFor="importText">Paste Description</Label>
          <Textarea
            id="importText"
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            placeholder="Paste product description from Facebook, Instagram, or other platforms..."
            rows={6}
          />
        </div>

        <Button
          type="button"
          onClick={handleImportParse}
          variant="secondary"
          className="w-full"
          disabled={!importText.trim()}
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Auto-fill from Description
        </Button>
      </div>

      {/* Product Form */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-foreground">Product Details</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Edit the auto-filled details or enter manually
            </p>
          </div>
          <Button type="button" variant="ghost" size="sm" onClick={clearForm}>
            Clear
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Minimal Desk Lamp"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="A beautifully crafted desk lamp..."
              rows={4}
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleChange}
                placeholder="99.00"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={handleChange}
                placeholder="10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
            >
              <option value="">Select category</option>
              {categories.filter((c) => c !== 'All').map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <Button type="submit" className="w-full rounded-full" size="lg">
            Save Product
          </Button>
        </form>
      </div>
    </div>
  )
}
