"use client";

import Image from "next/image";
import { FaCheck } from "react-icons/fa";
import InstructorRulesImage from "@/assets/images/InstructorRulesImage.jpg";

export default function InstructorRules({
  title = "Teacher rules & regulations",
  subtitle = "Sed auctor, nisi non elementum ornare, turpis orci consequat eros, et accumsan quam leo nec libero. Aenean mollis turpis velit, id tempor quam tempor a. Etiam et imperdiet quam.",
  rules = [
    "Sed elementum libero quis condimentum pellentesque",
    "Nam leo tortor, tempus et felis non.",
    "Porttitor faucibus erat. Integer eget purus non massa ultricies pretium.",
    "Vestibulum ultricies commodo luctus. Etiam eu luctus elit amet turpis.",
  ],
  imageSrc = InstructorRulesImage,
  imageAlt = "Female teacher teaching online",
}) {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          <div className="order-2 lg:order-1">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {title}
            </h2>

            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              {subtitle}
            </p>

            <ul className="space-y-5">
              {rules.map((rule, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="mt-1 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <FaCheck className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="text-gray-700 text-base lg:text-lg leading-relaxed">
                    {rule}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -inset-8 bg-gradient-to-br from-purple-300/20 to-pink-300/20 blur-3xl -z-10"></div>
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

        </div>
      </div>
    </section>
  );
}
