"use client"

import { useState } from "react"
import Link from "next/link"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: "HOME", href: "/" },
    { label: "COURSES", href: "/courses" },
    { label: "PAGES", href: "/pages" },
    { label: "SHORTCODES", href: "/shortcodes" },
    { label: "BLOG", href: "/blog" },
    { label: "GALLERY", href: "/gallery" },
    { label: "SHOP", href: "/shop" },
    { label: "CONTACT", href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-primary border-b border-accent/20 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-secondary">
              LMS
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs font-semibold text-foreground hover:text-secondary transition-colors uppercase tracking-wide"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button className="flex items-center gap-1 px-3 py-2 text-foreground hover:text-secondary transition-colors">
              <span className="text-lg">👤</span>
              <span className="text-sm">Login | Register</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary/20 transition-colors"
          >
            <span className="text-2xl">{isOpen ? "✕" : "☰"}</span>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-accent/20">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-sm font-semibold text-foreground hover:bg-secondary/10 rounded-lg transition-colors uppercase"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-accent/20">
              <button className="w-full px-4 py-2 text-sm font-semibold text-foreground hover:bg-secondary/10 rounded-lg transition-colors uppercase">
                Login | Register
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
