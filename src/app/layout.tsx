import React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "@/styles/globals.css"

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "WatchGPT",
    template: "%s | WatchGPT"
  },
  description: "Obten recomendaciones de cine y TV con AI",
  icons: {
    icon: "/favicon.png"
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1
  },
  openGraph: {
    title: "WatchGPT",
    type: "website",
    url: "https://watchgpt.vercel.app"
    // images: [
    //   {
    //     url: "https://dkast.dev/og.jpg",
    //     width: 1200,
    //     height: 675
    //   }
    // ]
  }
  //   twitter: {
  //     title: "Daniel Castillejo",
  //     card: "summary_large_image",
  //     description: "Sitio personal de Daniel Castillejo",
  //     creator: "@dkast",
  //     images: ["https://dkast.dev/og.jpg"]
  //   }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head />
      <body className="bg-gradient-to-b from-gray-950 to-gray-900 min-h-screen text-gray-400">{children}</body>
    </html>
  )
}
