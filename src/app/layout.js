import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/shared/Header"
import { Footer } from "@/components/shared/Footer"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata = {
  title: "El-Mister - Online Private Lessons Management",
  description:
    "Transform the way you teach and learn with El-Mister, the leading platform for managing private lessons and connecting with students worldwide.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Header/>
          <main className="flex-1">
            {children}
          </main>
        <Footer/>
      </body>
    </html>
  )
}
