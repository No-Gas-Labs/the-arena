import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'THE ARENA - Unified Cognitive Operating System',
  description: 'Quad-exposure to 4 AI models, multi-channel publishing, and blockchain seniority claiming.',
  keywords: ['AI', 'Ensemble', 'Blockchain', 'Publishing', 'Cognitive'],
  authors: [{ name: 'NO_GAS_LABS' }],
  openGraph: {
    title: 'THE ARENA',
    description: 'Unified Cognitive Operating System',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-darker text-text">
        {children}
      </body>
    </html>
  )
}
