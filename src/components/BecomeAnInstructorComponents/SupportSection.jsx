"use client";

import Image from "next/image";
import { FaArrowRight, FaPhone, FaHeadphones } from "react-icons/fa6";
import SupportSectionImage  from "@/assets/images/SupportSection.jpg";

export default function SupportSection({
  title = "Don't worry we're always here to help you",
  subtitle = "Mauris aliquet ornare turpis, a mollis enim luctus quis. Phasellus nec augue malesuada, sagittis ligula vel, faucibus metus. Nam viverra metus eget nunc dignissim.",
  features = [
    "Set nec ultricies arcu eget nisl nulla, eleifend sit amet aliquam ut",
    "Phasellus ultricies augue vel erat fringilla imperdiet",
    "Nulla euismod consequat lorem, a posuere eros tincidunt in",
  ],
  email = "help.eduguard@gmail.com",
  imageSrc = SupportSectionImage,
  imageAlt = "Support agent with headset",
}) {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-pink-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -inset-10 bg-gradient-to-tr from-pink-300/30 to-purple-300/20 blur-3xl -z-10"></div>

              <Image
                src={imageSrc}
                alt={imageAlt}
                width={600}
                height={700}
                className="rounded-3xl shadow-2xl w-full object-cover border border-gray-100"
                priority
                unoptimized
              />
            </div>
          </div>

          <div className="order-1 lg:order-2 text-center lg:text-left">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              {title}
            </h2>

            <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-2xl">
              {subtitle}
            </p>

            <div className="space-y-6 mb-12">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <FaArrowRight className="w-6 h-6 text-[#FF4667] mt-1 flex-shrink-0" />
                  <p className="text-gray-700 text-base lg:text-lg leading-relaxed">
                    {feature}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-4 bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto lg:mx-0 border border-gray-100">
                <FaHeadphones className="w-7 h-7 text-[#FF4667]" />
              <div>
                <p className="text-sm text-gray-500">Email us anytime at</p>
                <a
                  href={`mailto:${email}`}
                  className="text-lg font-semibold text-gray-900 hover:text-orange-600 transition-colors"
                >
                  {email}
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}