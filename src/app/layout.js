import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import StoreProvider from "@/redux/StoreProvider"; 
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
      <body className="font-sans antialiased">
        <StoreProvider>
          <Header />
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  )
}
