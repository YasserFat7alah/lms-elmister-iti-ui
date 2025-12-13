import Link from "next/link";
import { RiMailLine, RiPhoneLine, RiMapPinLine, RiFacebookCircleFill, RiTwitterXFill, RiInstagramLine, RiLinkedinFill } from "react-icons/ri";
import Image from "next/image";

export function Footer() {
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
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-[#FF0055] hover:text-white transition-all text-gray-400">
                <RiFacebookCircleFill size={20} />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-[#FF0055] hover:text-white transition-all text-gray-400">
                <RiTwitterXFill size={20} />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-[#FF0055] hover:text-white transition-all text-gray-400">
                <RiInstagramLine size={20} />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-[#FF0055] hover:text-white transition-all text-gray-400">
                <RiLinkedinFill size={20} />
              </a>
            </div>
          </div>

          {/* LINKS - For Instructor */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-gray-100">For Instructor</h3>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="/becomeAnInstrcutor" className="hover:text-[#FF0055] transition-colors inline-block">Become an Instructor</Link></li>
              <li><Link href="/login" className="hover:text-[#FF0055] transition-colors inline-block">Instructor Login</Link></li>
              <li><Link href="#" className="hover:text-[#FF0055] transition-colors inline-block">Instructor Dashboard</Link></li>
              <li><Link href="#" className="hover:text-[#FF0055] transition-colors inline-block">My Students</Link></li>
            </ul>
          </div>

          {/* LINKS - For Student */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-gray-100">For Student</h3>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="/courses" className="hover:text-[#FF0055] transition-colors inline-block">Explore Courses</Link></li>
              <li><Link href="/login" className="hover:text-[#FF0055] transition-colors inline-block">Student Login</Link></li>
              <li><Link href="/signup" className="hover:text-[#FF0055] transition-colors inline-block">Register</Link></li>
              <li><Link href="#" className="hover:text-[#FF0055] transition-colors inline-block">My Learning</Link></li>
            </ul>
          </div>

          {/* CONTACT & NEWSLETTER */}
          <div className="space-y-8">
            {/* Newsletter */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-gray-100">Newsletter</h3>
              <p className="text-gray-400 text-sm mb-4">Subscribe to get the latest updates and news.</p>
              <form className="flex flex-col gap-3">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:border-[#FF0055] focus:bg-white/10 transition-colors text-white"
                  />
                  <button className="absolute right-1.5 top-1.5 bottom-1.5 bg-[#FF0055] hover:bg-[#D90045] text-white px-4 rounded-lg text-sm font-semibold transition-colors">
                    Join
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
              <div className="flex items-center gap-3 group cursor-pointer hover:text-white transition-colors">
                <RiMailLine className="text-[#FF0055] text-lg group-hover:scale-110 transition-transform" />
                <span>hello@elmister.com</span>
              </div>
              <div className="flex items-center gap-3 group cursor-pointer hover:text-white transition-colors">
                <RiPhoneLine className="text-[#FF0055] text-lg group-hover:scale-110 transition-transform" />
                <span>+1 (555) 123-4567</span>
              </div>
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