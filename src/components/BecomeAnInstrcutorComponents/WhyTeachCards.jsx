"use client";

import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";    
import WhyTeachCardsImage  from "@/assets/images/WhyTeachCards.png";

export default function WhyTeachCards({
  title = "Why you'll start teaching on Dreams",
  subtitle = "Present congue ornare nibh sed ullamcorper. Proin venenatis libero non turpis sollicitudin, vitae auctor arcu ornare. Cras vitae nulla a purus mollis venenatis.",
  features = [
    "Teach your students as you want.",
    "Manage your course, payment in one place.",
    "Chat with your students.",
  ],
  ctaText = "Start Teaching Today",
  imageSrc = WhyTeachCardsImage ,
  imageAlt = "Eduguard teaching platform",
}) {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 via-white to-pink-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -inset-12 bg-gradient-to-r from-purple-400/20 to-pink-400/20 blur-3xl -z-10"></div>
              
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={640}
                height={720}
                className="rounded-3xl shadow-2xl border border-gray-100 w-full"
                priority
              />
            </div>
          </div>

          <div className="order-1 lg:order-2 text-center lg:text-left">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              {title}
            </h2>

            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto lg:mx-0">
              {subtitle}
            </p>

            <div className="space-y-6 mb-12">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <FaCheckCircle className="w-7 h-7 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 text-base lg:text-lg leading-relaxed">
                    {feature}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}