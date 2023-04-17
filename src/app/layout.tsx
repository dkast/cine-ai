import React, { type PropsWithChildren } from "react"
// import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "@/styles/globals.css"

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "CineAI",
    template: "%s | CineAI"
  },
  themeColor: "#09090b",
  description: "Obtén recomendaciones de cine y TV con AI",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1
  },
  openGraph: {
    title: "CineAI",
    type: "website",
    url: "https://cine-ai.vercel.app"
  }
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head />
      <body className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-400">
        {children}
        {/* <Analytics /> */}
      </body>
    </html>
  )
}
