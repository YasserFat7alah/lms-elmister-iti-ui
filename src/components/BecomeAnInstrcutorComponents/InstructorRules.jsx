"use client";

import Image from "next/image";
import { FaCheck } from "react-icons/fa";
import InstructorRulesImage from "@/assets/images/InstructorRulesImage.jpg";

export default function InstructorRules({
  title = "Guidelines & Best Practices",
  subtitle = "We've established clear guidelines to ensure quality education and a positive experience for both instructors and students. Follow these principles to build a successful teaching career.",
  rules = [
    "Create original, high-quality content that provides real value to students",
    "Maintain professional communication and respond to student inquiries promptly",
    "Follow our content policies and respect intellectual property rights",
    "Engage with your students actively and provide constructive feedback",
  ],
  imageSrc = InstructorRulesImage,
  imageAlt = "Female teacher teaching online",
}) {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          <div className="order-2 lg:order-1">
            <div className="inline-block px-4 py-2 bg-mainBlue/10 rounded-full border border-mainBlue/20 mb-6">
              <span className="text-sm font-semibold text-mainBlue">Guidelines</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {title}
            </h2>

            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              {subtitle}
            </p>

            <ul className="space-y-5">
              {rules.map((rule, index) => (
                <li key={index} className="flex items-start gap-4 bg-gray-50 p-5 rounded-xl border border-gray-100 hover:border-mainBlue/30 transition-colors">
                  <div className="w-12 h-12 bg-gradient-to-br from-mainBlue to-[#5a4ab0] rounded-full flex items-center justify-center shrink-0 mt-1 shadow-md">
                    <FaCheck className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-700 text-base lg:text-lg leading-relaxed pt-2">
                    {rule}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-mainBlue/20 to-mainPink/20 rounded-3xl blur-2xl -z-10"></div>
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={600}
                height={700}
                className="rounded-3xl shadow-2xl w-full object-cover border-4 border-white"
                priority
                unoptimized
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
