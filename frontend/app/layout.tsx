import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Veridian - Pollution Analysis & Prediction Platform',
  description: 'Advanced platform for real-time pollution monitoring, prediction, and bio-urban tree simulation',
  keywords: ['pollution', 'environment', 'prediction', 'air quality', 'bio-urban trees'],
  authors: [{ name: 'Dharmesh Priyadarshi' }],
  openGraph: {
    title: 'Veridian - Pollution Analysis & Prediction',
    description: 'Monitor pollution, predict future levels, and simulate bio-urban tree impact',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
