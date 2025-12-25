"use client";

import Image from "next/image";
import { FiMail, FiSend } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";

import { useState } from "react";
import { useSubscribeMutation } from "@/redux/api/endPoints/newsletterApiSlice";
import { toast } from "react-hot-toast";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribe, { isLoading }] = useSubscribeMutation();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      await subscribe({ email }).unwrap();
      toast.success("Welcome aboard! Check your inbox for confirmation.");
      setEmail("");
    } catch (err) {
      const errorMessage = err?.data?.message || "Failed to subscribe. Please try again.";

      if (errorMessage.toLowerCase().includes("already subscribed")) {
        toast.error("You're already part of our community!");
      } else {
        toast.error(errorMessage);
      }
    }
  };

  return (
    <section className="py-20 relative bg-linear-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-16">

          {/* Content Column */}
          <div className="space-y-8 text-center lg:text-left">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <HiSparkles className="text-yellow-400 text-lg" />
              <span className="text-sm font-semibold tracking-wide">Stay Informed</span>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                Never Miss An
                <span className="block bg-linear-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Educational Update
                </span>
              </h2>

              <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Get course recommendations, exclusive insights from top educators, and early access to new programs delivered straight to your inbox.
              </p>
            </div>

            {/* Subscribe Form */}
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="relative flex-1">
                <FiMail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl pointer-events-none" />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-14 pr-5 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all text-base"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="group px-8 py-4 bg-linear-to-r from-purple-600 to-pink-600 rounded-2xl font-bold text-base whitespace-nowrap hover:shadow-2xl hover:shadow-purple-500/50 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  "Subscribing..."
                ) : (
                  <>
                    Subscribe
                    <FiSend className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Trust Badge */}
            <p className="text-sm text-gray-400 flex items-center justify-center lg:justify-start gap-2">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Join 10,000+ educators and parents already subscribed
            </p>
          </div>

          {/* Image Column */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-tr from-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-30 scale-105"></div>
              <Image
                src="/happy-young-man .png"
                alt="Join our educational community"
                width={450}
                height={550}
                className="relative drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}