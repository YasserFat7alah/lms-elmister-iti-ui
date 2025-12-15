"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { FaArrowDown } from "react-icons/fa"
import becomeAnInstrcutor from "@/assets/images/becomeAnInstrcutor.jpg";

export function InstructorHero() {
  const scrollToRegistration = () => {
    const element = document.getElementById('registration-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-mainBlue via-[#4a3a9a] to-[#5a4ab0] text-white py-20 lg:py-32 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-mainPink/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-mainPink/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
            <div className="inline-block px-4 py-2 bg-mainPink/20 backdrop-blur-sm rounded-full border border-mainPink/30 mb-4">
              <span className="text-sm font-semibold text-white">Join Our Teaching Community</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              Become an
              <span className="block text-mainPink mt-2">Instructor</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Share your knowledge with millions of learners around the world. Start teaching today and inspire the next
              generation of professionals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Button 
                onClick={scrollToRegistration}
                size="lg"
                className="bg-gradient-to-r from-mainPink to-[#ff3366] hover:from-[#ff3366] hover:to-mainPink text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                Become an Instructor
                <FaArrowDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-6 justify-center lg:justify-start">
              <div>
                <p className="text-3xl font-bold text-white">20K+</p>
                <p className="text-sm text-gray-300">Active Instructors</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">571K+</p>
                <p className="text-sm text-gray-300">Students</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-mainPink/30 to-mainBlue/30 rounded-3xl blur-2xl -z-10"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
              <Image
                src={becomeAnInstrcutor}
                alt="Instructor teaching online"
                width={600}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}