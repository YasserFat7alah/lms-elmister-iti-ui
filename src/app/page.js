import { Header } from "@/components/shared/Header"
import { Footer } from "@/components/shared/Footer"
import { Hero } from "@/components/homeComponents/Hero"

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
