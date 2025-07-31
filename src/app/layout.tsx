import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Universal Skill Translator',
  description: 'See how good you really are—everywhere. Convert your rank, ELO, tier, or handicap across different games and sports.',
  keywords: ['skill translation', 'rank converter', 'ELO calculator', 'gaming ranks', 'sports handicaps'],
  authors: [{ name: 'Universal Skill Translator' }],
  openGraph: {
    title: 'Universal Skill Translator',
    description: 'See how good you really are—everywhere. Convert your rank, ELO, tier, or handicap across different games and sports.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Universal Skill Translator',
    description: 'See how good you really are—everywhere. Convert your rank, ELO, tier, or handicap across different games and sports.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
          {children}
        </div>
      </body>
    </html>
  )
} 