import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground">El-Mister</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Empowering educators and students worldwide through innovative technology.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors font-bold text-lg">
                f
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors font-bold text-lg">
                𝕏
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors font-bold text-lg">
                in
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors font-bold text-lg">
                📷
              </Link>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#features" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#security" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Security
                </Link>
              </li>
              <li>
                <Link href="#blog" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#about" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#careers" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#press" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-primary text-lg mt-0.5 flex-shrink-0">✉</span>
                <div>
                  <p className="text-sm text-muted-foreground">support@elmister.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary text-lg mt-0.5 flex-shrink-0">📞</span>
                <div>
                  <p className="text-sm text-muted-foreground">+1 (800) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary text-lg mt-0.5 flex-shrink-0">📍</span>
                <div>
                  <p className="text-sm text-muted-foreground">San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2025 El-Mister. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="#cookies" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
