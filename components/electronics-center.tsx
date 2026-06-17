"use client"

import { useEffect, useState } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import MobileBar from "@/components/layout/mobile-bar"
import BookingDrawer from "@/components/ui/booking-drawer"

// Sections
import Hero from "@/components/sections/hero"
import Products from "@/components/sections/products"
import Services from "@/components/sections/services"
import Contact from "@/components/sections/contact"

type PageKey = "home" | "catalog" | "services" | "contact"

/* -------------------------------------------------------------------------- */
/*  CONSTANTS — business details                                               */
/* -------------------------------------------------------------------------- */
const PHONE_PRODUCT = "98410385987"
const PHONE_SERVICE = "9813950050"
const WHATSAPP = "97798410385987"
const EMAIL = "gcecyber@gmail.com"
const FB_URL = "https://www.facebook.com/GoodChoiceElectronicCenter/"
const MAP_LINK = "https://maps.app.goo.gl/zGQ8aeT6ix9BCStT7"
const MAP_EMBED =
  "https://www.google.com/maps?q=New+Good+Choice+Electronic+Center+Thankot+Kathmandu&output=embed"

const brands = [
  {
    name: "Bluestone",
    logo: "/imgs/bluestone.png",
    tooltipEn: "Specialist repairs for Bluestone chimneys & cooktops",
    tooltipNp: "ब्लूस्टोन चिम्नी र चुलोको विशेषज्ञ मर्मत सेवा"
  },
  {
    name: "DishHome",
    logo: "/imgs/dh.png",
    tooltipEn: "Authorized DishHome connection setup & diagnostics",
    tooltipNp: "अधिकृत डिशहोम कनेक्सन जडान र मर्मत"
  },
  {
    name: "DishHome FiberNet",
    logo: "/imgs/dhfiber.png",
    tooltipEn: "Superfast FiberNet connection & router diagnostic",
    tooltipNp: "डिशहोम फाइबरनेट इन्टरनेट जडान र राउटर मर्मत"
  },
  {
    name: "Electron",
    logo: "/imgs/electron.png",
    tooltipEn: "Electron Voltage Stabilizers & electrical protection",
    tooltipNp: "इलेक्ट्रोन भोल्टेज स्टेबिलाइजर जडान र मर्मत"
  },
  {
    name: "Faber",
    logo: "/imgs/faber.png",
    tooltipEn: "Faber auto-clean chimney servicing & clean walls care",
    tooltipNp: "फेबर अटो-क्लिन चिम्नी सफाइ र हेरचाह"
  },
  {
    name: "LG",
    logo: "/imgs/lg.png",
    tooltipEn: "LG Smart TV display panel & motherboard service",
    tooltipNp: "LG स्मार्ट टिभी डिस्प्ले र मदरबोर्ड मर्मत सेवा"
  }
]

const servicesList = [
  { id: 1, enName: "Kitchen Chimney Cleaning", npName: "किचन चिम्नी सफाइ" },
  { id: 2, enName: "Solar & Water Heater Service", npName: "सोलार र पानी गिजर सर्भिस" },
  { id: 3, enName: "TV & Laptop Repair", npName: "टिभी र ल्यापटप मर्मत" },
  { id: 4, enName: "Fitting New Appliances", npName: "नयाँ सामान जडान" },
  { id: 5, enName: "Technician Home Visit", npName: "प्राविधिक घरमै आउने" },
  { id: 6, enName: "Original Spare Parts", npName: "ओरिजिनल स्पेयर पार्ट्स" }
]

export default function ElectronicsCenter() {
  const [activePage, setActivePage] = useState<PageKey>("home")
  const [isNepali, setIsNepali] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("light")
  
  // Booking Drawer State
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [selectedService, setSelectedService] = useState(servicesList[0].enName)

  // Initialize theme from system preference
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const initial = prefersDark ? "dark" : "light"
    setTheme(initial)
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(initial)
  }, [])

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark"
      document.documentElement.classList.remove("light", "dark")
      document.documentElement.classList.add(next)
      return next
    })
  }

  const goTo = (p: PageKey) => {
    setActivePage(p)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleOpenBooking = (serviceName: string) => {
    setSelectedService(serviceName)
    setIsBookingOpen(true)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`)
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`)
  }

  return (
    <div
      className="flex min-h-dvh flex-col bg-background mouse-glow-container overflow-x-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Ambient Mouse tracking light glow background */}
      <div className="mouse-glow-bg hidden md:block -z-10" />

      {/* Premium Header */}
      <Header
        isNepali={isNepali}
        setIsNepali={setIsNepali}
        theme={theme}
        toggleTheme={toggleTheme}
        activePage={activePage}
        setActivePage={goTo}
        phoneNumber={PHONE_PRODUCT}
      />

      {/* Main Page Container with Smooth Mounting Transitions */}
      <main className="flex-1 w-full relative min-h-[calc(100vh-8rem)]">
        <div key={activePage} className="animate-in fade-in zoom-in-98 duration-300">
          {activePage === "home" && (
            <Hero
              isNepali={isNepali}
              setActivePage={goTo}
              phoneProduct={PHONE_PRODUCT}
              phoneService={PHONE_SERVICE}
              brands={brands}
            />
          )}

          {activePage === "catalog" && (
            <Products isNepali={isNepali} phoneNumber={PHONE_PRODUCT} />
          )}

          {activePage === "services" && (
            <Services
              isNepali={isNepali}
              phoneNumberMain={PHONE_PRODUCT}
              phoneNumberSub={PHONE_SERVICE}
              whatsappNumber={WHATSAPP}
              openBookingDrawer={handleOpenBooking}
            />
          )}

          {activePage === "contact" && (
            <Contact
              isNepali={isNepali}
              phoneNumberMain={PHONE_PRODUCT}
              phoneNumberSub={PHONE_SERVICE}
              email={EMAIL}
              fbUrl={FB_URL}
              mapEmbedUrl={MAP_EMBED}
              mapLinkUrl={MAP_LINK}
            />
          )}
        </div>
      </main>

      {/* Footer (Dynamic switches tabs) */}
      <Footer
        isNepali={isNepali}
        setActivePage={goTo}
        phoneNumberMain={PHONE_PRODUCT}
        phoneNumberSub={PHONE_SERVICE}
        email={EMAIL}
        fbUrl={FB_URL}
        brands={brands}
      />

      {/* Sticky Mobile Navigation Bar */}
      <MobileBar
        isNepali={isNepali}
        activePage={activePage}
        setActivePage={goTo}
        whatsappNumber={WHATSAPP}
        phoneNumber={PHONE_SERVICE}
      />

      {/* Quick Booking Bottom Sheet Drawer */}
      <BookingDrawer
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        isNepali={isNepali}
        selectedService={selectedService}
        setSelectedService={setSelectedService}
        servicesList={servicesList}
        whatsappNumber={WHATSAPP}
        phoneNumber={PHONE_SERVICE}
      />
    </div>
  )
}
