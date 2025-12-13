"use client"

import Image from "next/image"
import faqHero from "@/assets/images/faq.png";

export default function FAQPageHeader() {
  const title = "Frequently Asked Questions"
  const description = "Find answers to common questions about our services"

  return (
    <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-white py-5 lg:py-10 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          {/* Text */}
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              {title}
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl">
              {description}
            </p>
          </div>

          {/* Image */}
          <div className="flex justify-center lg:justify-end">
            <Image
              src={faqHero}
              alt="FAQ Illustration"
              width={420}
              height={420}
              className="object-contain"
              priority
            />
          </div>

        </div>
      </div>
    </div>
  )
}
