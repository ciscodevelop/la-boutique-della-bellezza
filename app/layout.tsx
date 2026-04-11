import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { CartProvider } from "@/contexts/cart-context";
import { AuthProvider } from "@/contexts/auth-context";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Boutique della Bellezza - Cosmetici e Prodotti per Capelli",
  description:
    "Scopri la nostra selezione di cosmetici, skincare e prodotti professionali per capelli e parrucchieria. Bellezza autentica, qualita superiore.",
  icons: {
    icon: [
      {
        url: "/2022-05-10.webp",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/2022-05-10.webp",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/2022-05-10.webp",
        type: "image/svg+xml",
      },
    ],
    apple: "/2022-05-10.webp",
  },
};

export const viewport: Viewport = {
  themeColor: "#fdf8f6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="min-h-[calc(100vh-73px)]">{children}</main>
            <Toaster />
          </CartProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
