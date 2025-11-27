
import { Hero } from "@/components/homeComponents/Hero"
<<<<<<< HEAD
import { Footer } from "@/components/shared/Footer"
import { Header } from "@/components/shared/Header"
=======
import { Features } from "@/components/homeComponents/Features"
import { FAQ } from "@/components/homeComponents/Faq"
import { Testimonials } from "@/components/homeComponents/Testimonials"
>>>>>>> origin/feature/homepage-components

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features/>
        <FAQ/>
        <Testimonials/>
      </main>
      <Footer />
    </div>
  )
}
