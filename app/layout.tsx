import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Pondok Pesantren Ashshirathal Mustaqim DDI',
  description: 'Website resmi Pondok Pesantren Ashshirathal Mustaqim DDI Baru-Baru Tanga',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={`${poppins.className} bg-white text-gray-800 antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}