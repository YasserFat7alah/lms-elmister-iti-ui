import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import StoreProvider from "@/redux/StoreProvider"; 
import { Toaster } from 'react-hot-toast';
import AuthPersist from "@/components/authComponents/AuthPersist";

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
          <AuthPersist>

          {children}
          </AuthPersist>
                  <Toaster position="top-center" />

        </StoreProvider>
      </body>
    </html>
  )
}
