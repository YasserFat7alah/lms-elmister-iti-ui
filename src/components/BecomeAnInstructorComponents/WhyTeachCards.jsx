"use client";

import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";    
import WhyTeachCardsImage  from "@/assets/images/WhyTeachCards.png";

export default function WhyTeachCards({
  title = "Why You'll Love Teaching With Us",
  subtitle = "Join a platform designed to empower educators. We provide everything you need to create, teach, and grow your online teaching business.",
  features = [
    "Teach your students your way with full creative control",
    "Manage courses, payments, and students all in one place",
    "Connect and chat with your students in real-time",
    "Access powerful analytics to track your success",
  ],
  ctaText = "Start Teaching Today",
  imageSrc = WhyTeachCardsImage ,
  imageAlt = "Teaching platform features",
}) {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-pink-50/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -inset-12 bg-gradient-to-r from-mainPink/20 to-mainBlue/20 blur-3xl -z-10"></div>
              
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={640}
                height={720}
                className="rounded-3xl shadow-2xl border-4 border-white w-full"
                priority
              />
            </div>
          </div>

          <div className="order-1 lg:order-2 text-center lg:text-left">
            <div className="inline-block px-4 py-2 bg-mainPink/10 rounded-full border border-mainPink/20 mb-6">
              <span className="text-sm font-semibold text-mainPink">Benefits</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              {title}
            </h2>

            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {subtitle}
            </p>

            <div className="space-y-5 mb-12">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4 bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-gray-100 hover:border-mainPink/30 transition-colors">
                  <div className="w-10 h-10 bg-gradient-to-br from-mainPink to-[#ff3366] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <FaCheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-gray-700 text-base lg:text-lg leading-relaxed pt-1.5">
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