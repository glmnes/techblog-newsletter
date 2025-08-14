import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "@/styles/prism.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
// import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: 'TechBlog - Modern Tech Insights',
    template: '%s | TechBlog'
  },
  description: 'Exploring technology, AI, and digital innovation. Practical guides and insights for builders.',
  keywords: ['technology', 'AI', 'digital innovation', 'web development', 'automation', 'tech insights'],
  authors: [{ name: 'TechBlog Team' }],
  creator: 'TechBlog',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com',
    siteName: 'TechBlog',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'TechBlog',
      }
    ],
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'),
  twitter: {
    card: 'summary_large_image',
    creator: '@yourhandle',
    images: ['/api/og'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
        {children}
      </body>
    </html>
  )
}
