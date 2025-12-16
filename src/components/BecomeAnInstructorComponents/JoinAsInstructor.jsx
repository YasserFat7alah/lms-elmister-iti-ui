"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import instructor from "@/assets/images/instructor.jpg";

export default function JoinAsInstructor({
  title = "Ready to Start Your Teaching Journey?",
  subtitle = "Join thousands of instructors who are making a difference. Create engaging courses, reach students worldwide, and build your teaching career with us.",
  buttonText = "Register as Instructor",
  imageSrc = instructor,
  imageAlt = "Happy female teacher",
}) {
  const router = useRouter();

  const handleRegister = () => {
    router.push('/signup?role=teacher');
  };

  const benefits = [
    "Set your own schedule and pace",
    "Earn competitive revenue share",
    "Access comprehensive teaching resources",
    "Connect with a global student community"
  ];

  return (
    <section id="registration-section" className="relative bg-gradient-to-br from-mainBlue via-[#4a3a9a] to-[#5a4ab0] py-20 lg:py-28 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-mainPink/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-mainPink/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left space-y-6 lg:space-y-8">
            <div className="inline-block px-4 py-2 bg-mainPink/20 backdrop-blur-sm rounded-full border border-mainPink/30">
              <span className="text-sm font-semibold text-white">Get Started Today</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {title}
            </h2>

            <p className="text-lg sm:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {subtitle}
            </p>

            <div className="space-y-4 py-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <FaCheckCircle className="w-6 h-6 text-mainPink mt-1 flex-shrink-0" />
                  <p className="text-gray-200 text-base lg:text-lg leading-relaxed">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>

            <Button
              onClick={handleRegister}
              size="lg"
              className="bg-gradient-to-r from-mainPink to-[#ff3366] hover:from-[#ff3366] hover:to-mainPink text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group w-full sm:w-auto"
            >
              {buttonText}
              <FaArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <p className="text-sm text-gray-300 pt-4">
              Already have an account?{" "}
              <a href="/login" className="text-mainPink hover:underline font-semibold">
                Sign in here
              </a>
            </p>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute top-1/2 -translate-y-1/2 right-4 lg:right-12 w-56 h-72 lg:w-72 lg:h-80 bg-mainPink/20 rounded-3xl blur-2xl -z-10"></div>
            <div className="absolute top-6 left-6 lg:top-10 lg:left-12 w-28 h-36 lg:w-36 lg:h-44 bg-mainPink/10 rounded-3xl blur-xl -z-10"></div>

            <div className="relative w-full max-w-md lg:max-w-lg h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
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