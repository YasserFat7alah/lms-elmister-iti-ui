
import { Hero } from "@/components/homeComponents/Hero"
import  Features  from "@/components/homeComponents/Features"
import { FAQ } from "@/components/homeComponents/Faq"
import Testimonials  from "@/components/homeComponents/Testimonials"
import { Header } from "@/components/shared/Header"
import { Footer } from "@/components/shared/Footer"
import Subjects from "@/components/homeComponents/Subjects"
import Goals from "@/components/homeComponents/Goals"
import Instructors from "@/components/homeComponents/Instructors"
import TrustedBy from "@/components/homeComponents/TrustedBy"
import NewsletterSection from "@/components/homeComponents/NewsletterSection"
import Blog from "@/components/homeComponents/Blog"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <Subjects/>
        <Goals/>
        <Features/>
        <Instructors/>
        <TrustedBy/>
        <Testimonials/>
         <NewsletterSection/>
        <FAQ/>
        <Blog/>
      </main>
      <Footer />
    </div>
  )
}
