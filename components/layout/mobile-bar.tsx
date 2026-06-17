"use client"

import { Home, ShoppingBag, Wrench, Phone, PhoneCall, MessageCircle } from "lucide-react"

type PageKey = "home" | "catalog" | "services" | "contact"

type MobileBarProps = {
  isNepali: boolean
  activePage: PageKey
  setActivePage: (p: PageKey) => void
  whatsappNumber: string
  phoneNumber: string
}

export default function MobileBar({
  isNepali,
  activePage,
  setActivePage,
  whatsappNumber,
  phoneNumber
}: MobileBarProps) {
  const tabs = [
    { key: "home" as PageKey, icon: Home, en: "Home", np: "गृह" },
    { key: "catalog" as PageKey, icon: ShoppingBag, en: "Products", np: "उत्पादन" },
    { key: "services" as PageKey, icon: Wrench, en: "Services", np: "सेवा" },
    { key: "contact" as PageKey, icon: Phone, en: "Contact", np: "सम्पर्क" }
  ]

  const activeIdx = tabs.findIndex((t) => t.key === activePage)

  return (
    <>
      {/* Floating Action Shortcuts - Call & WhatsApp (Only visible on mobile/tablet screen) */}
      <div className="fixed right-4 bottom-20 z-40 flex flex-col gap-3 md:hidden">
        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="h-6.5 w-6.5 fill-current" />
        </a>

        {/* Call Button */}
        <a
          href={`tel:${phoneNumber}`}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95"
          aria-label="Call Now"
        >
          <PhoneCall className="h-5.5 w-5.5" />
        </a>
      </div>

      {/* Sticky Bottom Navigation Bar (Hidden on desktop) */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 pb-safe backdrop-blur-md md:hidden">
        <div className="relative flex h-16 items-center justify-around px-2">
          
          {/* Sliding Highlight Pill */}
          {activeIdx !== -1 && (
            <div
              className="absolute top-2.5 h-10 rounded-2xl bg-primary/10 transition-all duration-300 -z-10"
              style={{
                width: "56px",
                left: `calc(${(activeIdx * 100) / tabs.length}% + ${100 / (tabs.length * 2)}% - 28px)`
              }}
            />
          )}

          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activePage === tab.key

            return (
              <button
                key={tab.key}
                onClick={() => setActivePage(tab.key)}
                className="relative flex flex-col items-center justify-center w-16 h-full gap-0.5 text-center focus:outline-none"
              >
                <span
                  className={`flex items-center justify-center transition-all duration-300 ${
                    isActive ? "text-primary scale-110" : "text-muted-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span
                  className={`text-[10px] font-semibold tracking-wide transition-colors ${
                    isActive ? "text-primary font-bold" : "text-muted-foreground"
                  }`}
                >
                  {isNepali ? tab.np : tab.en}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}
