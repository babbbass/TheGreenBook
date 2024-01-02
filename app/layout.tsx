import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import clsx from "clsx"
import { Header } from "@/src/features/layout/Header"
import { Footer } from "@/src/features/layout/Footer"
import { DashBoardWrapper } from "@/context/dashboardContext"

const inter = Inter({ subsets: ["latin"] })

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
      <body className={clsx(inter.className, "bg-background h-full")}>
        <DashBoardWrapper>
          <div className='flex flex-col h-full py-4 px-2'>
            <Header />
            <div className='flex-1 max-w-3xl m-auto py-12 w-full'>
              {children}
            </div>
            <Footer />
          </div>
        </DashBoardWrapper>
      </body>
    </html>
  )
}
