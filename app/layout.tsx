import './globals.css'
import { Inter, Playfair_Display } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata = {
  title: "Whittico's Collision - Premium Auto Body Repair & Insurance Partnership",
  description: 'Premium collision repair services with 60+ years of expertise. Trusted by insurance companies and rental partners for quality auto body repair, painting, and restoration.',
  keywords: 'auto body repair, collision repair, insurance partnership, car painting, auto restoration, premium collision services',
  authors: [{ name: "Whittico's Collision" }],
  openGraph: {
    title: "Whittico's Collision - Premium Auto Body Repair",
    description: 'Premium collision repair services with 60+ years of expertise.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased bg-white text-gray-900 overflow-x-hidden`}>
        {children}
      </body>
    </html>
  )
}
