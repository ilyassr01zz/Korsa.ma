import type { Metadata } from 'next'
import { Inter, Pacifico } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Navbar } from '@/components/navbar'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

const pacifico = Pacifico({ 
  weight: '400',
  subsets: ["latin"],
  variable: '--font-pacifico'
});

export const metadata: Metadata = {
  title: 'Korsa - Your Shortcut to Easy Travel | Grand Taxi Booking Morocco',
  description: 'Book your grand taxi across Morocco with Korsa. Experience seamless intercity travel with real-time availability, secure payments, and user-friendly booking.',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${pacifico.variable}`}>
      <body className="font-sans antialiased scroll-smooth pt-20">
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
