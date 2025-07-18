import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'; // Import Header
import Footer from '@/components/Footer'; // Import Footer

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Bit Elektronik',
  description: 'High-Quality PCB Prototyping',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}