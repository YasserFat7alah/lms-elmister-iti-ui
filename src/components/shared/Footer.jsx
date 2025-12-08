import Link from "next/link";
import { RiMailLine, RiPhoneLine, RiMapPinLine } from "react-icons/ri";
import Image from "next/image";
import logo from "@/assets/images/logo.svg";

export function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          <div className="space-y-6">
            <div className="flex items-center gap-3">

            <Image 
               src={logo} 
               alt="El-Mister Logo" 
               className="h-12 w-auto"
            />              
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Platform designed to help organizations, educators, and learners manage, deliver, and track learning and training activities.
            </p>
          </div>

          {/*  For Instructor */}
          <div>
            <h3 className="font-semibold text-lg mb-6">For Instructor</h3>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="#" className="hover:text-white transition">Search Mentors</Link></li>
              <li><Link href="#" className="hover:text-white transition">Login</Link></li>
              <li><Link href="#" className="hover:text-white transition">Register</Link></li>
              <li><Link href="#" className="hover:text-white transition">Booking</Link></li>
              <li><Link href="#" className="hover:text-white transition">Students</Link></li>
              <li><Link href="#" className="hover:text-white transition">Dashboard</Link></li>
            </ul>
          </div>

          {/* For Student */}
          <div>
            <h3 className="font-semibold text-lg mb-6">For Student</h3>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="#" className="hover:text-white transition">Appointments</Link></li>
              <li><Link href="#" className="hover:text-white transition">Chat</Link></li>
              <li><Link href="#" className="hover:text-white transition">Login</Link></li>
              <li><Link href="#" className="hover:text-white transition">Register</Link></li>
              <li><Link href="#" className="hover:text-white transition">Instructor Dashboard</Link></li>
            </ul>
          </div>

          <div className="space-y-8">
            {/* Newsletter */}
            <div>
              <h3 className="font-semibold text-lg mb-6">Newsletter</h3>
              <form className="flex gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 bg-white/10 border border-white/20 rounded-full px-5 py-3 text-sm placeholder-gray-400 focus:outline-none focus:border-purple-500 transition"
                />
             <button className="bg-[#392C7D] hover:bg-[#4a3a9e] text-white font-medium px-6 py-3 rounded-full transition whitespace-nowrap">
                  Subscribe
             </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 text-sm text-gray-400">
              <div className="flex items-center gap-3">
                <RiMapPinLine className="text-purple-400 text-lg" />
                <span>3556 Beach Street, San Francisco, California, CA 94108</span>
              </div>
              <div className="flex items-center gap-3">
                <RiMailLine className="text-purple-400 text-lg" />
                <span>dreamslms@example.com</span>
              </div>
              <div className="flex items-center gap-3">
                <RiPhoneLine className="text-purple-400 text-lg" />
                <span>+1 923-456-7890</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>© 2025 DreamsLMS. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-white transition">Terms & Conditions</Link>
              <Link href="#" className="hover:text-white transition">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}