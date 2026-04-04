export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  stock: number
  images: string[]
  brand?: string
}

export interface CartItem extends Product {
  quantity: number
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  status: 'processing' | 'shipped' | 'delivered'
  trackingNumber?: string
  createdAt: string
  shippingAddress: {
    name: string
    address: string
    city: string
    postalCode: string
    country: string
  }
}

export const products: Product[] = [
  // LA BOUTIQUE DELLA BELLEZZA - Linea Collagene
  {
    id: 'bb-1',
    name: 'Siero Viso al Collagene Puro',
    description: 'Siero concentrato al collagene marino puro. Azione anti-age intensiva che riduce visibilmente rughe e linee sottili. Pelle compatta e luminosa fin dalla prima applicazione.',
    price: 45,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop',
    category: 'Collagene',
    stock: 30,
    brand: 'La Boutique della Bellezza',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop',
    ],
  },
  {
    id: 'bb-2',
    name: 'Crema Viso Collagene Notte',
    description: 'Crema notte ricchissima al collagene vegetale. Lavora durante il sonno per rigenerare la pelle in profondita. Risveglio con pelle distesa e tonica.',
    price: 52,
    image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600&h=600&fit=crop',
    category: 'Collagene',
    stock: 25,
    brand: 'La Boutique della Bellezza',
    images: [
      'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600&h=600&fit=crop',
    ],
  },
  {
    id: 'bb-3',
    name: 'Crema Viso Collagene Giorno SPF15',
    description: 'Crema giorno al collagene con protezione solare. Idrata, protegge e contrasta i segni dell invecchiamento. Texture leggera, perfetta sotto il trucco.',
    price: 48,
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=600&h=600&fit=crop',
    category: 'Collagene',
    stock: 35,
    brand: 'La Boutique della Bellezza',
    images: [
      'https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=600&h=600&fit=crop',
    ],
  },
  {
    id: 'bb-4',
    name: 'Maschera Viso Collagene Intensiva',
    description: 'Maschera in tessuto al collagene per un boost di giovinezza immediato. Effetto lifting istantaneo, pelle visibilmente ringiovanita.',
    price: 12,
    image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&h=600&fit=crop',
    category: 'Collagene',
    stock: 60,
    brand: 'La Boutique della Bellezza',
    images: [
      'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&h=600&fit=crop',
    ],
  },
  {
    id: 'bb-5',
    name: 'Contorno Occhi Collagene',
    description: 'Trattamento specifico contorno occhi al collagene. Riduce borse, occhiaie e zampe di gallina. Sguardo fresco e riposato.',
    price: 38,
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=600&fit=crop',
    category: 'Collagene',
    stock: 28,
    brand: 'La Boutique della Bellezza',
    images: [
      'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=600&fit=crop',
    ],
  },

  // LA BOUTIQUE DELLA BELLEZZA - Linea Bava di Lumaca
  {
    id: 'bb-6',
    name: 'Siero Rigenerante Bava di Lumaca',
    description: 'Siero puro alla bava di lumaca 80%. Proprieta rigeneranti eccezionali per cicatrici, macchie e imperfezioni. Pelle levigata e uniforme.',
    price: 42,
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=600&h=600&fit=crop',
    category: 'Bava di Lumaca',
    stock: 32,
    brand: 'La Boutique della Bellezza',
    images: [
      'https://images.unsplash.com/photo-1617897903246-719242758050?w=600&h=600&fit=crop',
    ],
  },
  {
    id: 'bb-7',
    name: 'Crema Viso Bava di Lumaca',
    description: 'Crema viso multiazione alla bava di lumaca. Idratante, nutriente, riparatrice e anti-macchie. Ideale per pelli sensibili e con imperfezioni.',
    price: 46,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=600&fit=crop',
    category: 'Bava di Lumaca',
    stock: 40,
    brand: 'La Boutique della Bellezza',
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=600&fit=crop',
    ],
  },
  {
    id: 'bb-8',
    name: 'Gel Corpo Bava di Lumaca',
    description: 'Gel corpo riparatore alla bava di lumaca. Perfetto per smagliature, cicatrici e pelle secca. Assorbe rapidamente senza ungere.',
    price: 35,
    image: 'https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=600&h=600&fit=crop',
    category: 'Bava di Lumaca',
    stock: 45,
    brand: 'La Boutique della Bellezza',
    images: [
      'https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=600&h=600&fit=crop',
    ],
  },
  {
    id: 'bb-9',
    name: 'Maschera Notte Bava di Lumaca',
    description: 'Maschera notte intensiva alla bava di lumaca. Rigenera la pelle durante il sonno. Risveglio con pelle morbida, levigata e luminosa.',
    price: 40,
    image: 'https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=600&h=600&fit=crop',
    category: 'Bava di Lumaca',
    stock: 22,
    brand: 'La Boutique della Bellezza',
    images: [
      'https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=600&h=600&fit=crop',
    ],
  },
  {
    id: 'bb-10',
    name: 'Contorno Occhi Bava di Lumaca',
    description: 'Contorno occhi alla bava di lumaca. Azione anti-rughe, anti-borse e schiarente. Texture delicata per la zona piu fragile del viso.',
    price: 36,
    image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=600&h=600&fit=crop',
    category: 'Bava di Lumaca',
    stock: 30,
    brand: 'La Boutique della Bellezza',
    images: [
      'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=600&h=600&fit=crop',
    ],
  },

  // DAVINES - Essential Haircare
  {
    id: '1',
    name: 'OI Shampoo',
    description: 'Shampoo multibenefit per tutti i tipi di capelli. Con olio di Roucou, dona morbidezza assoluta e lucentezza straordinaria.',
    price: 28,
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&h=600&fit=crop',
    category: 'Shampoo',
    stock: 40,
    brand: 'DAVINES',
    images: [
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&h=600&fit=crop',
    ],
  },
  {
    id: '2',
    name: 'OI Conditioner',
    description: 'Balsamo multibenefit che districa, nutre e protegge i capelli. Con olio di Roucou per capelli setosi e lucenti.',
    price: 32,
    image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=600&h=600&fit=crop',
    category: 'Balsamo',
    stock: 35,
    brand: 'DAVINES',
    images: [
      'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=600&h=600&fit=crop',
    ],
  },
  {
    id: '3',
    name: 'OI All in One Milk',
    description: 'Latte spray multibenefit che accelera l asciugatura, protegge dal calore e dona morbidezza. Per tutti i tipi di capelli.',
    price: 35,
    image: 'https://images.unsplash.com/photo-1597354984706-fac992d9306f?w=600&h=600&fit=crop',
    category: 'Styling',
    stock: 30,
    brand: 'DAVINES',
    images: [
      'https://images.unsplash.com/photo-1597354984706-fac992d9306f?w=600&h=600&fit=crop',
    ],
  },
  {
    id: '4',
    name: 'OI Oil',
    description: 'Olio assoluto di bellezza per capelli con olio di Roucou. Anti-crespo, dona lucentezza straordinaria senza appesantire.',
    price: 42,
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=600&fit=crop',
    category: 'Trattamenti Capelli',
    stock: 25,
    brand: 'DAVINES',
    images: [
      'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=600&fit=crop',
    ],
  },
  {
    id: '5',
    name: 'NOUNOU Shampoo',
    description: 'Shampoo nutriente per capelli stressati o sfibrati. Con estratto di pomodoro Fiaschetto, nutre in profondita.',
    price: 26,
    image: 'https://images.unsplash.com/photo-1556227702-d1e4e7b5c232?w=600&h=600&fit=crop',
    category: 'Shampoo',
    stock: 45,
    brand: 'DAVINES',
    images: [
      'https://images.unsplash.com/photo-1556227702-d1e4e7b5c232?w=600&h=600&fit=crop',
    ],
  },
  {
    id: '6',
    name: 'NOUNOU Hair Mask',
    description: 'Maschera intensiva riparatrice per capelli molto danneggiati. Con estratto di pomodoro Fiaschetto ricco di antiossidanti.',
    price: 38,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=600&fit=crop',
    category: 'Trattamenti Capelli',
    stock: 20,
    brand: 'DAVINES',
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=600&fit=crop',
    ],
  },
  {
    id: '7',
    name: 'LOVE Curl Shampoo',
    description: 'Shampoo specifico per capelli ricci e mossi. Con estratto di mandorla, dona elasticita e definizione ai ricci.',
    price: 26,
    image: 'https://images.unsplash.com/photo-1594997756045-f27c2d1ec31e?w=600&h=600&fit=crop',
    category: 'Shampoo',
    stock: 35,
    brand: 'DAVINES',
    images: [
      'https://images.unsplash.com/photo-1594997756045-f27c2d1ec31e?w=600&h=600&fit=crop',
    ],
  },
  {
    id: '8',
    name: 'LOVE Curl Cream',
    description: 'Crema elasticizzante per ricci definiti e naturali. Controlla il crespo e dona morbidezza senza appesantire.',
    price: 32,
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=600&h=600&fit=crop',
    category: 'Styling',
    stock: 28,
    brand: 'DAVINES',
    images: [
      'https://images.unsplash.com/photo-1617897903246-719242758050?w=600&h=600&fit=crop',
    ],
  },
  {
    id: '9',
    name: 'Strong Hold Cream Gel',
    description: 'Crema gel a tenuta forte per acconciature definite e durature. Finish lucido, ideale per look strutturati.',
    price: 24,
    image: 'https://images.unsplash.com/photo-1626808642875-0aa545482dfb?w=600&h=600&fit=crop',
    category: 'Styling',
    stock: 40,
    brand: 'DAVINES',
    images: [
      'https://images.unsplash.com/photo-1626808642875-0aa545482dfb?w=600&h=600&fit=crop',
    ],
  },
  {
    id: '10',
    name: 'Sea Salt Spray',
    description: 'Spray al sale marino per un effetto spiaggia naturale. Dona texture e volume con un finish opaco.',
    price: 26,
    image: 'https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=600&h=600&fit=crop',
    category: 'Styling',
    stock: 50,
    brand: 'DAVINES',
    images: [
      'https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=600&h=600&fit=crop',
    ],
  },
  {
    id: '11',
    name: 'MELU Shampoo',
    description: 'Shampoo anti-rottura per capelli lunghi o danneggiati. Con estratto di lenticchia, rinforza la fibra capillare.',
    price: 26,
    image: 'https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=600&h=600&fit=crop',
    category: 'Shampoo',
    stock: 30,
    brand: 'DAVINES',
    images: [
      'https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=600&h=600&fit=crop',
    ],
  },
  {
    id: '12',
    name: 'MELU Conditioner',
    description: 'Balsamo anti-rottura che sigilla le cuticole e previene la formazione delle doppie punte. Per capelli forti e sani.',
    price: 30,
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&h=600&fit=crop',
    category: 'Balsamo',
    stock: 28,
    brand: 'DAVINES',
    images: [
      'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&h=600&fit=crop',
    ],
  },
]

export const categories = ['Tutti', 'Collagene', 'Bava di Lumaca', 'Shampoo', 'Balsamo', 'Trattamenti Capelli', 'Styling']

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    items: [
      { ...products[0], quantity: 1 },
      { ...products[5], quantity: 1 },
    ],
    total: 87,
    status: 'delivered',
    trackingNumber: 'TRK123456789',
    createdAt: '2024-01-15',
    shippingAddress: {
      name: 'Maria Rossi',
      address: 'Via Beato Angelico 31',
      city: 'Milano',
      postalCode: '20133',
      country: 'Italia',
    },
  },
  {
    id: 'ORD-002',
    items: [{ ...products[10], quantity: 2 }],
    total: 56,
    status: 'shipped',
    trackingNumber: 'TRK987654321',
    createdAt: '2024-01-20',
    shippingAddress: {
      name: 'Luca Bianchi',
      address: 'Via Celoria 10',
      city: 'Milano',
      postalCode: '20133',
      country: 'Italia',
    },
  },
  {
    id: 'ORD-003',
    items: [
      { ...products[1], quantity: 1 },
      { ...products[6], quantity: 1 },
    ],
    total: 98,
    status: 'processing',
    createdAt: '2024-01-25',
    shippingAddress: {
      name: 'Anna Verdi',
      address: 'Piazza Leonardo da Vinci 5',
      city: 'Milano',
      postalCode: '20133',
      country: 'Italia',
    },
  },
]
