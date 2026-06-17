"use client"

import { Zap, Phone, Mail, ShieldCheck } from "lucide-react"

type PageKey = "home" | "catalog" | "services" | "contact"

type FooterProps = {
  isNepali: boolean
  setActivePage: (p: PageKey) => void
  phoneNumberMain: string
  phoneNumberSub: string
  email: string
  fbUrl: string
  brands: { name: string; logo: string }[]
}

export default function Footer({
  isNepali,
  setActivePage,
  phoneNumberMain,
  phoneNumberSub,
  email,
  fbUrl,
  brands
}: FooterProps) {
  const navItems: { key: PageKey; en: string; np: string }[] = [
    { key: "home", en: "Home", np: "गृहपृष्ठ" },
    { key: "catalog", en: "Products", np: "उत्पादन" },
    { key: "services", en: "Services", np: "सेवाहरू" },
    { key: "contact", en: "About & Contact", np: "सम्पर्क" }
  ]

  return (
    <footer className="border-t border-border bg-muted/40 pb-20 md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        
        {/* About Column */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Zap className="h-5 w-5" />
            </span>
            <span className="leading-tight">
              <span className="block font-heading text-base font-extrabold text-foreground">
                New Good Choice Electronic Center
              </span>
              <span className="block text-xs text-muted-foreground">
                {isNepali ? "वि.सं. २०६९ देखि · थानकोट" : "Since 2069 B.S. (2012 A.D.) · Thankot"}
              </span>
            </span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            {isNepali
              ? "किचन उपकरण, हिटिङ, सोलार र इलेक्ट्रोनिक्सको बिक्री, जडान र मर्मत। थानकोट, काठमाडौँ, नेपाल।"
              : "Sales, installation and repair of kitchen appliances, heating, solar and electronics. Thankot, Kathmandu, Nepal."}
          </p>
          
          {/* Partners Badges */}
          <div className="mt-5 flex flex-wrap gap-2">
            {brands.map((b) => (
              <span
                key={b.name}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-card-foreground shadow-sm transition-all hover:border-primary/20 hover:scale-105"
              >
                <ShieldCheck className="h-3 w-3 text-primary" />
                {b.name}
              </span>
            ))}
          </div>
        </div>

        {/* Links Column */}
        <div>
          <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-foreground">
            {isNepali ? "पृष्ठहरू" : "Pages"}
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            {navItems.map((n) => (
              <li key={n.key}>
                <button
                  onClick={() => setActivePage(n.key)}
                  className="text-muted-foreground transition-colors hover:text-foreground focus:outline-none"
                >
                  {isNepali ? n.np : n.en}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-foreground">
            {isNepali ? "सम्पर्क" : "Contact"}
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-primary" />
              <a href={`tel:${phoneNumberMain}`} className="hover:text-foreground">
                {phoneNumberMain}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-primary" />
              <a href={`tel:${phoneNumberSub}`} className="hover:text-foreground">
                {phoneNumberSub}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-primary" />
              <a href={`mailto:${email}`} className="break-all hover:text-foreground">
                {email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              <a href={fbUrl} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                Facebook Page
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} New Good Choice Electronic Center.{" "}
        {isNepali ? "सर्वाधिकार सुरक्षित।" : "All rights reserved."}
      </div>
    </footer>
  )
}
