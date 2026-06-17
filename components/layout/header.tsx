"use client"

import { useState, useRef, useEffect } from "react"
import { Sun, Moon, Phone, Zap, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

type PageKey = "home" | "catalog" | "services" | "contact"

type HeaderProps = {
  isNepali: boolean
  setIsNepali: (v: boolean) => void
  theme: "light" | "dark"
  toggleTheme: () => void
  activePage: PageKey
  setActivePage: (p: PageKey) => void
  phoneNumber: string
}

export default function Header({
  isNepali,
  setIsNepali,
  theme,
  toggleTheme,
  activePage,
  setActivePage,
  phoneNumber
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [pillStyle, setPillStyle] = useState<React.CSSProperties>({ opacity: 0 })

  const navItems: { key: PageKey; en: string; np: string }[] = [
    { key: "home", en: "Home", np: "गृहपृष्ठ" },
    { key: "catalog", en: "Products", np: "उत्पादन" },
    { key: "services", en: "Services", np: "सेवाहरू" },
    { key: "contact", en: "About & Contact", np: "सम्पर्क" }
  ]

  const handleNavClick = (key: PageKey) => {
    setActivePage(key)
    setMobileMenuOpen(false)
  }

  // Calculate sliding highlight coordinates dynamically based on active button
  useEffect(() => {
    if (!containerRef.current) return
    const activeEl = containerRef.current.querySelector('[data-active="true"]') as HTMLButtonElement | null
    if (activeEl) {
      setPillStyle({
        left: `${activeEl.offsetLeft}px`,
        width: `${activeEl.offsetWidth}px`,
        height: `${activeEl.offsetHeight}px`,
        opacity: 1
      })
    } else {
      setPillStyle({ opacity: 0 })
    }
  }, [activePage, isNepali])

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick("home")}
          className="group flex items-center gap-3 text-left focus:outline-none"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md transition-all duration-300 group-hover:scale-105 group-hover:bg-primary/95 group-hover:shadow-lg">
            <Zap className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
          </span>
          <span className="leading-tight">
            <span className="block font-heading text-sm font-extrabold tracking-tight text-foreground sm:text-base">
              New Good Choice
            </span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Electronic Center
            </span>
          </span>
        </button>

        {/* Desktop Navigation with Smooth Hover Highlights */}
        <nav ref={containerRef} className="relative hidden items-center gap-1.5 lg:flex">
          {/* Sliding Highlight Pill */}
          <div
            className="absolute rounded-full bg-primary/10 transition-all duration-300 -z-10"
            style={{
              left: pillStyle.left,
              width: pillStyle.width,
              height: pillStyle.height,
              opacity: pillStyle.opacity,
              top: "50%",
              transform: "translateY(-50%)"
            }}
          />
          {navItems.map((n) => {
            const isActive = activePage === n.key
            return (
              <button
                key={n.key}
                data-active={isActive}
                onClick={() => handleNavClick(n.key)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 focus:outline-none ${
                  isActive
                    ? "text-primary font-bold"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {isNepali ? n.np : n.en}
              </button>
            )
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <button
            onClick={() => setIsNepali(!isNepali)}
            className="rounded-full border border-border px-3 py-1.5 text-xs font-bold text-foreground transition-all hover:bg-muted focus:outline-none"
            aria-label="Toggle language"
          >
            {isNepali ? "EN" : "NP"}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-all hover:bg-muted focus:outline-none"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
          </button>

          {/* Quick Call */}
          <Button
            render={<a href={`tel:${phoneNumber}`} />}
            className="hidden gap-2 rounded-full font-semibold shadow-md sm:inline-flex"
          >
            <Phone className="h-4 w-4" />
            {phoneNumber}
          </Button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground md:hidden focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Standard backup for md screens, since mobile bar is hidden on md) */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background animate-in slide-in-from-top-4 duration-200 ease-out md:hidden">
          <nav className="flex flex-col gap-1 px-4 py-3">
            {navItems.map((n) => (
              <button
                key={n.key}
                onClick={() => handleNavClick(n.key)}
                className={`flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium ${
                  activePage === n.key ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                }`}
              >
                {isNepali ? n.np : n.en}
              </button>
            ))}
            <Button
              render={<a href={`tel:${phoneNumber}`} />}
              className="mt-2 w-full gap-2 rounded-full font-semibold"
            >
              <Phone className="h-4 w-4" />
              {isNepali ? "अहिले कल गर्नुहोस्" : "Call Now"}
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
