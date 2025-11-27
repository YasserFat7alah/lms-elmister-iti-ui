
import { Hero } from "@/components/homeComponents/Hero"
import { Footer } from "@/components/shared/Footer"
import { Header } from "@/components/shared/Header"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
      </main>
      <Footer />
    </div>
  )
}
