import { Mail, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="max-w-[1400px] mx-auto px-4 xl:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
        <p className="text-white/80">Have questions? Contact us, we're excited to hear from you!</p>
        <div className="flex flex-wrap items-center gap-4 text-white/80">
          <a
            href="mailto:infomail@db.com"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Mail className="w-4 h-4" />
            infomail@db.com
          </a>
          <a
            href="tel:+38630013433"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Phone className="w-4 h-4" />
            +386 30 013 433
          </a>
          <span className="text-white/50">|</span>
          <span className="text-white/60">Powered by WIT BKK</span>
        </div>
      </div>
    </footer>
  )
}
