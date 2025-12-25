"use client";
import Link from "next/link";
import { RiMailLine, RiPhoneLine, RiMapPinLine, RiFacebookCircleFill, RiGithubFill, RiInstagramLine, RiLinkedinFill } from "react-icons/ri";
import Image from "next/image";

import { useState } from "react";
import { useSubscribeMutation } from "@/redux/api/endPoints/newsletterApiSlice";
import { toast } from "react-hot-toast";

export function Footer() {
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
      toast.success("Subscribed successfully!");
      setEmail("");
    } catch (err) {
      const errorMessage = err?.data?.message || "Failed to subscribe. Please try again.";

      if (errorMessage.toLowerCase().includes("already subscribed")) {
        toast.error("You have already subscribed to our newsletter.");
      } else {
        toast.error(errorMessage);
      }
    }
  };

  return (
    <footer className="bg-[#0f172a] text-white border-t border-[#1e293b]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* BRAND & DESCRIPTION */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="El-Mister Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Empowering education through technology. A platform designed to manage, deliver, and track learning experiences seamlessly.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="https://www.linkedin.com/in/yasserfat7alah/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-[#0077B5] hover:text-white transition-all text-gray-400">
                <RiLinkedinFill size={20} />
              </a>
              <a href="https://www.instagram.com/yasserfat7alah/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-[#E4405F] hover:text-white transition-all text-gray-400">
                <RiInstagramLine size={20} />
              </a>
              <a href="https://www.facebook.com/YasserFat7alah/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-[#1877F2] hover:text-white transition-all text-gray-400">
                <RiFacebookCircleFill size={20} />
              </a>
              <a href="https://github.com/yasserfat7alah" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-[#333] hover:text-white transition-all text-gray-400">
                <RiGithubFill size={20} />
              </a>
            </div>
          </div>

          {/* LINKS - Navigations */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-gray-100">Navigations</h3>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="/" className="hover:text-[#FF0055] transition-colors inline-block">Home</Link></li>
              <li><Link href="/courses" className="hover:text-[#FF0055] transition-colors inline-block">Courses</Link></li>
              <li><Link href="/teachers" className="hover:text-[#FF0055] transition-colors inline-block">Teachers</Link></li>
              <li><Link href="/contact" className="hover:text-[#FF0055] transition-colors inline-block">Contact Us</Link></li>
              <li><Link href="/about" className="hover:text-[#FF0055] transition-colors inline-block">About Us</Link></li>
            </ul>
          </div>

          {/* LINKS - Actions */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-gray-100">Actions</h3>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="/login" className="hover:text-[#FF0055] transition-colors inline-block">Login</Link></li>
              <li><Link href="/signup" className="hover:text-[#FF0055] transition-colors inline-block">Signup as a Parent</Link></li>
              <li><Link href="/becomeAnInstrcutor" className="hover:text-[#FF0055] transition-colors inline-block">Become an Instructor</Link></li>
            </ul>
          </div>

          {/* CONTACT & NEWSLETTER */}
          <div className="space-y-8">
            {/* Newsletter */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-gray-100">Newsletter</h3>
              <p className="text-gray-400 text-sm mb-4">Subscribe to get the latest updates and news.</p>
              <form className="flex flex-col gap-3" onSubmit={handleSubscribe}>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:border-[#FF0055] focus:bg-white/10 transition-colors text-white"
                  />
                  <button
                    disabled={isLoading}
                    className="absolute right-1.5 top-1.5 bottom-1.5 bg-[#FF0055] hover:bg-[#D90045] text-white px-4 rounded-lg text-sm font-semibold transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "..." : "Join"}
                  </button>
                </div>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-start gap-3 group cursor-default">
                <RiMapPinLine className="text-[#FF0055] text-lg mt-0.5 group-hover:scale-110 transition-transform" />
                <span>Information Technology Institute, Tanta</span>
              </div>
              <a href="mailto:yasserfat7alah@gmail.com" className="flex items-center gap-3 group cursor-pointer hover:text-white transition-colors">
                <RiMailLine className="text-[#FF0055] text-lg group-hover:scale-110 transition-transform" />
                <span>yasserfat7alah@gmail.com</span>
              </a>
              <a href="tel:+201019719364" className="flex items-center gap-3 group cursor-pointer hover:text-white transition-colors">
                <RiPhoneLine className="text-[#FF0055] text-lg group-hover:scale-110 transition-transform" />
                <span>+20 1019 719 364</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>© {new Date().getFullYear()} El-Mister. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-[#FF0055] transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-[#FF0055] transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-[#FF0055] transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}