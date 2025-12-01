import Image from "next/image"
import { Button } from "@/components/ui/button"
import contacthero from "@/assets/images/contacthero.jpg";

export function ContactHero() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Connect with us</h1>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Need help or have questions? We'd love to hear from you. Whether it's about our services, partnerships, or
              anything else, feel free to reach out to our team.
            </p>
            <Button className="bg-[#FF4667] hover:bg-[#e93d5b] text-white px-8 py-3">Copy Email</Button>
          </div>

          <div className="relative h-96 md:h-full rounded-lg overflow-hidden">
            <Image src={contacthero} alt="Woman smiling and waving" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
