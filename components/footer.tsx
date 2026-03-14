import Link from "next/link"
import { Car, Facebook, Instagram, Twitter, Mail } from "lucide-react"

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "Book a Taxi", href: "#booking" },
  { name: "About Us", href: "#about" },
  { name: "Contact Us", href: "#contact" },
]

const socialLinks = [
  { name: "Facebook", href: "https://facebook.com", icon: Facebook },
  { name: "Instagram", href: "https://instagram.com", icon: Instagram },
  { name: "Twitter", href: "https://twitter.com", icon: Twitter },
]

export function Footer() {
  return (
    <footer id="contact" className="bg-footer text-footer-foreground py-16">
      <div className="korsa-container">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link href="#home" className="flex items-center gap-2 group">
              <div className="p-2 rounded-lg bg-primary/20">
                <Car className="w-6 h-6 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl leading-none text-white">
                  Korsa
                </span>
                <span className="text-xs text-footer-foreground/70">
                  Your Shortcut to Easy Travel
                </span>
              </div>
            </Link>
            <p className="text-sm text-footer-foreground/80 leading-relaxed max-w-xs">
              Your trusted platform for booking grand taxis across Morocco. 
              Experience seamless intercity travel.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="korsa-footer-link"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Contact Us</h3>
            <div className="space-y-3">
              <a
                href="mailto:contact@korsa.ma"
                className="korsa-footer-link flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                contact@korsa.ma
              </a>
            </div>
            <div className="flex items-center gap-4 pt-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="korsa-footer-social"
                >
                  <social.icon className="w-5 h-5 text-footer-foreground" />
                  <span className="sr-only">{social.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-center text-sm text-footer-foreground/60">
            © 2026 Korsa — Your Shortcut to Easy Travel
          </p>
        </div>
      </div>
    </footer>
  )
}
