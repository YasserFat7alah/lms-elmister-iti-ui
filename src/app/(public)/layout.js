// app/(public)/layout.js
import { Header } from "@/components/shared/Header"
import { Footer } from "@/components/shared/Footer"

export default function PublicLayout({ children }) {
  return (
    <>
        <Header/>
        <main className="min-h-screen"> 
           {children} 
        </main>
        <Footer/>
    </>
  )
}