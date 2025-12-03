import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })

export const metadata: Metadata = {
  title: "AdCreative Studio - Auto-Generate Ad Creatives",
  description:
    "Upload your brand assets, pick a vibe, and let AI create campaign-ready visuals and captions in seconds.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased bg-gradient-to-br from-teal-900 via-slate-900 to-purple-900`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
