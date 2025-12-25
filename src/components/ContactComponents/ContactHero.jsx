"use client"

import Image from "next/image"
import { HiMail, HiChatAlt } from "react-icons/hi"
import contacthero from "@/assets/images/contacthero.jpg";

export function ContactHero() {
  const scrollToForm = () => {
    const formSection = document.getElementById('contact-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="py-20 md:py-28 bg-linear-to-br from-purple-50 via-blue-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20 -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full">
              <HiMail className="text-purple-600 text-xl" />
              <span className="text-sm font-semibold text-purple-600 tracking-wide uppercase">Get In Touch</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900">
              Let's Start a
              <span className="block text-purple-600 mt-2">Conversation</span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              Have questions about our platform or need assistance? Our dedicated support team is here to help. Reach out and we'll respond as quickly as possible.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 text-white rounded-2xl font-semibold hover:bg-purple-700 transition-colors shadow-lg shadow-purple-600/20"
              >
                <HiChatAlt className="w-5 h-5" />
                Contact Us
              </button>
              <a
                href="mailto:yasserfat7alah@gmail.com"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-purple-600 text-purple-600 rounded-2xl font-semibold hover:bg-purple-50 transition-colors"
              >
                <HiMail className="w-5 h-5" />
                Send Email
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-500">
            <Image
              src={contacthero}
              alt="Customer support representative"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-br from-purple-600/10 to-blue-600/10"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
