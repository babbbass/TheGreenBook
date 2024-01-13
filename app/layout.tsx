import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Roboto, Lato } from "next/font/google"
import "./globals.css"
import clsx from "clsx"
import { Header } from "@/src/features/layout/Header"
import { Footer } from "@/src/features/layout/Footer"
import { DashBoardWrapper } from "@/context/dashboardContext"
import { CapitalGainChartWrapper } from "@/context/capitalGainChartContext"

const inter = Inter({ subsets: ["latin"] })
const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})
const lato = Lato({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Green Book",
  description: "Analyse tes paris sportifs",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body
        className={clsx(
          lato.className,
          roboto.className,
          inter.className,
          "bg-background"
        )}
      >
        <div className='flex flex-col h-screen py-4 px-2'>
          <Header />
          <CapitalGainChartWrapper>
            <div className='flex-1  max-w-4xl m-auto py-12 w-full'>
              {children}
            </div>
          </CapitalGainChartWrapper>
          <Footer />
        </div>
      </body>
    </html>
  )
}
