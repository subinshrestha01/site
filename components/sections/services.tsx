"use client"

import { useState } from "react"
import type { LucideIcon } from "lucide-react"
import { Sparkles, Droplets, Wrench, Hammer, Fan, ShieldCheck, Clock, MessageCircle, Phone, ChevronDown, ChevronUp, AlertTriangle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type ServiceCat = "cleaning" | "repair" | "fitting"

type Service = {
  id: number
  cat: ServiceCat
  icon: LucideIcon
  badgeEn: string
  badgeNp: string
  en: { 
    name: string 
    desc: string 
    time: string 
    frequency: string
    whatServiced: string
    neglectConsequence: string
  }
  np: { 
    name: string 
    desc: string 
    time: string
    frequency: string
    whatServiced: string
    neglectConsequence: string
  }
}

type ServicesProps = {
  isNepali: boolean
  phoneNumberMain: string
  phoneNumberSub: string
  whatsappNumber: string
  openBookingDrawer: (serviceName: string) => void
}

export default function Services({
  isNepali,
  phoneNumberMain,
  phoneNumberSub,
  whatsappNumber,
  openBookingDrawer
}: ServicesProps) {
  const [tab, setTab] = useState<"all" | ServiceCat>("all")

  // State to track which service care detail panel is expanded
  const [expandedCareCard, setExpandedCareCard] = useState<number | null>(null)

  // Before & After Chimney Cleaner Slider Position state
  const [sliderPos, setSliderPos] = useState(50)

  const services: Service[] = [
    {
      id: 2,
      cat: "cleaning",
      icon: Droplets,
      badgeEn: "Solar Service & Cleaning",
      badgeNp: "सोलार सर्भिस र सफाइ",
      en: {
        name: "Solar Water Heater Cleaning & Service",
        desc: "Specialist flushing of solar tank scale and vacuum tube cleaning to restore optimal heating.",
        time: "2–3 Hours",
        frequency: "Every 12–24 Months",
        whatServiced: "Solar tank flushing (rust/scale removal), glass tube cleaning, pressure valve test, plumbing check.",
        neglectConsequence: "Rust and scale buildup will block heating. It can lead to tube leakages, reduced hot water yield, and permanent tank cracks."
      },
      np: {
        name: "सोलार वाटर हिटर सफाइ तथा सर्भिस",
        desc: "तातो पानीको प्रवाह बढाउन सोलार ट्याङ्क र भ्याकुम ट्युब भित्र जमेको कडा खिया र लेदो सफाइ सेवा।",
        time: "२–३ घण्टा",
        frequency: "हरेक १२-२४ महिनामा",
        whatServiced: "सोलार ट्याङ्क भित्रको खिया/स्केल सफाइ, ग्लास ट्युब सफाइ, प्रेसर भल्भ र पाइप चुहावट जाँच।",
        neglectConsequence: "खिया जमेर पानी तातो हुँदैन। पाइप फुट्ने, पानी कम आउने र ट्याङ्क स्थायी रूपमै चर्किने जोखिम हुन्छ।"
      }
    },
    {
      id: 1,
      cat: "cleaning",
      icon: Sparkles,
      badgeEn: "Chimney Cleaning",
      badgeNp: "चिम्नी सफाइ",
      en: {
        name: "Kitchen Chimney Cleaning & Degreasing",
        desc: "Deep degreasing and cleaning of chimney filters and motors to keep your kitchen walls clean.",
        time: "1–2 Hours",
        frequency: "Every 6–12 Months",
        whatServiced: "Baffle filters chemical degreasing, internal blower motor inspection, oil collector cleaning, outer hood polish.",
        neglectConsequence: "Sticky yellow oil drips on gas cooktop, major suction loss, high motor overheating risk, and potential fire hazard."
      },
      np: {
        name: "किचन चिम्नी सफाइ तथा मर्मत",
        desc: "किचनको भित्ता सफा राख्न चिम्नी फिल्टर र मोटर भित्र जमेको चिल्लो रासायनिक विधिद्वारा सफा गर्ने सेवा।",
        time: "१–२ घण्टा",
        frequency: "हरेक ६-१२ महिनामा",
        whatServiced: "फिल्टर सफाइ, मोटर सुरक्षा परीक्षण, भित्री क्यानोपी र पङ्खाको सफाइ, ओइल कलेक्टर बक्स सफाइ।",
        neglectConsequence: "चुलोमा चिल्लो खस्ने, चिम्नीले धुवाँ नतान्ने (सक्सन घट्ने), मोटर जल्दने जोखिम र आगलागीको खतरा हुन्छ।"
      }
    },
    {
      id: 3,
      cat: "repair",
      icon: Wrench,
      badgeEn: "Repair",
      badgeNp: "मर्मत",
      en: {
        name: "TV & Laptop Repair Service",
        desc: "Fast diagnostics and motherboard/screen repairs for smart LED TVs and laptops.",
        time: "Same-Day / 24 hrs",
        frequency: "On demand (when issues occur)",
        whatServiced: "Display panel diagnostic, power board repairs, cooling fan servicing, software diagnostics.",
        neglectConsequence: "Minor electrical shorts can permanently damage the main processor, resulting in expensive replacement costs."
      },
      np: {
        name: "टिभी र ल्यापटप मर्मत सेवा",
        desc: "स्मार्ट LED टिभी र ल्यापटपको बिग्रेको स्क्रिन, मदरबोर्ड तथा पावर सम्बन्धी समस्याको छिटो मर्मत सेवा।",
        time: "सोही दिन / २४ घण्टा",
        frequency: "खराबी देखिएको समयमा",
        whatServiced: "डिस्प्ले, पावर बोर्ड र मदरबोर्ड मर्मत, भित्री धूलो सफाइ र सेन्सर जाँच।",
        neglectConsequence: "सानो सर्किट सर्टले मदरबोर्ड नै पूर्ण रूपमा नष्ट गराई पछि अत्यधिक मर्मत खर्च बढाउन सक्छ।"
      }
    },
    {
      id: 4,
      cat: "fitting",
      icon: Hammer,
      badgeEn: "Fitting",
      badgeNp: "जडान",
      en: {
        name: "Fitting New Home Appliances",
        desc: "Professional wall bracket mounting and plumbing connection for chimneys, solar, and geysers.",
        time: "1–2 Hours",
        frequency: "Once during initial installation",
        whatServiced: "Wall bracket fitting, alignment testing, electrical safety ground check, water pipe leakage test.",
        neglectConsequence: "Poor/loose installation will cause heavy appliance falls, plumbing leaks, short circuits, or gas line hazards."
      },
      np: {
        name: "नयाँ उपकरणहरू जडान",
        desc: "चिम्नी, गिजर र सोलार प्रणालीको सुरक्षित भित्ता माउन्ट र पाइप जडान सम्बन्धी प्राविधिक सेवा।",
        time: "१–२ घण्टा",
        frequency: "सामान जडान गर्ने समयमा",
        whatServiced: "सुरक्षित भित्ता जडान, मिलाउने काम, अर्थिङ र पानी चुहावट परीक्षण।",
        neglectConsequence: "असुरक्षित जडानले भारी सामानहरू खस्ने, पानी चुहिने वा ग्यास/बिजुली सर्ट भई दुर्घटना हुने खतरा हुन्छ।"
      }
    },
    {
      id: 5,
      cat: "repair",
      icon: Fan,
      badgeEn: "Home Visit",
      badgeNp: "घरदैलो सेवा",
      en: {
        name: "Technician Home Visit & Inspection",
        desc: "Have our experienced appliance technician come directly to your house in Kathmandu to inspect issues.",
        time: "Flexible Scheduling",
        frequency: "During yearly checkups or device faults",
        whatServiced: "Full electrical circuit diagnostics, wiring insulation checking, sensor calibrations, performance check.",
        neglectConsequence: "Undetected minor issues worsen, leading to unexpected device breakdowns and complete replacement requirements."
      },
      np: {
        name: "प्राविधिक घरदैलो निरीक्षण",
        desc: "मर्मत सम्बन्धी समस्या जाँच गर्न हाम्रा अनुभवी प्राविधिक तपाईको घरमै आउने घरदैलो सेवा।",
        time: "सजिलो समय तालिका",
        frequency: "वार्षिक जाँच वा खराबी देखिएको बेला",
        whatServiced: "विद्युतीय सर्किट र तारहरूको जाँच, सेन्सर क्यालिबरेसन, समग्र कार्यक्षमता परीक्षण।",
        neglectConsequence: "सानातिना खराबी समयमै नबनाउँदा पछि पुरै मेसिन फेर्नुपर्ने ठूलो नोक्सानी हुन सक्छ।"
      }
    },
    {
      id: 6,
      cat: "fitting",
      icon: ShieldCheck,
      badgeEn: "Genuine Parts",
      badgeNp: "सक्कली पार्टस्",
      en: {
        name: "Original Spare Parts & Upgrade",
        desc: "We supply and fit genuine manufacturer heating elements, sensors, and filters with warranty support.",
        time: "Instant Availability",
        frequency: "During repairs or component upgrades",
        whatServiced: "Replacement of worn components with official Faber, Hindware, V-Guard genuine items.",
        neglectConsequence: "Using fake local spare parts voids your warranty, damages the main motor/board, and increases safety risks."
      },
      np: {
        name: "ओरिजिनल स्पेयर पार्ट्स जडान",
        desc: "हामी इलेक्ट्रोनिक्सका लागि आधिकारिक वारेन्टीसहित सक्कली स्पेयर पार्ट्स फेर्ने र जडान गर्ने सेवा दिन्छौं।",
        time: "तुरुन्तै उपलब्ध",
        frequency: "पार्ट्स फेर्नुपर्ने अवस्थामा",
        whatServiced: "कमजोर भएका पार्ट्स झिकी आधिकारिक कम्पनीका सक्कली कम्पोनेन्ट जडान।",
        neglectConsequence: "कमसल नक्कली सामानले वारेन्टी खारेज गराउँछ र मेसिन छिटो बिगारेर विद्युतीय खतरा बढाउँछ।"
      }
    }
  ]

  const serviceCategories: { key: "all" | ServiceCat; en: string; np: string }[] = [
    { key: "all", en: "All Services", np: "सबै सेवाहरू" },
    { key: "cleaning", en: "Cleaning & Care", np: "सफाइ तथा हेरचाह" },
    { key: "repair", en: "Expert Repairs", np: "कुशल मर्मत सेवा" },
    { key: "fitting", en: "Installation & Spare Parts", np: "जडान र स्पेयर पार्ट्स" }
  ]

  const filteredServices = services.filter((s) => tab === "all" || s.cat === tab)

  const toggleCareDetails = (id: number) => {
    setExpandedCareCard(expandedCareCard === id ? null : id)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="mx-auto mb-10 max-w-2xl text-center animate-slide-up-fade">
        <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
          {isNepali ? "हाम्रा सेवाहरू" : "Our Services"}
        </span>
        <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          {isNepali ? "जडान, सफाइ र मर्मत" : "Installation, Cleaning & Repair"}
        </h2>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
          {isNepali
            ? "काठमाडौँ उपत्यकाभरि मर्मत र सफाइका लागि — सोध्न कल वा ह्वाट्सएप मार्फत तुरुन्तै बुक गर्नुहोस्।"
            : "Direct on-site support across Kathmandu. Click Book to launch our quick schedule helper."}
        </p>
      </div>

      {/* Chimney Before/After Interactive Slider */}
      <section className="mb-14 max-w-2xl mx-auto animate-slide-up-fade">
        <div className="text-center mb-5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
            <Sparkles className="h-3.5 w-3.5 fill-current animate-pulse text-primary animate-float" />
            {isNepali ? "चिम्नी सफाइको नतिजा (अघि र पछि)" : "Visual Chimney Care (Before & After)"}
          </span>
          <p className="text-xs text-muted-foreground mt-1.5 font-medium">
            {isNepali ? "तपाईंको चिम्नीको सफाइ स्तर हेर्न स्लाइडर सार्नुहोस्:" : "Drag the slider to reveal the difference professional degreasing makes:"}
          </p>
        </div>

        <div className="relative aspect-video rounded-3xl border border-border bg-card shadow-sm overflow-hidden select-none">
          {/* Before Layer (Dirty Chimney) */}
          <div className="absolute inset-0 w-full h-full">
            <svg viewBox="0 0 800 450" className="w-full h-full object-cover" style={{ backgroundColor: "#1e1e24" }}>
              <line x1="50" y1="0" x2="50" y2="450" stroke="#2a2a35" strokeWidth="2" strokeDasharray="5 5" />
              <line x1="750" y1="0" x2="750" y2="450" stroke="#2a2a35" strokeWidth="2" strokeDasharray="5 5" />
              <line x1="0" y1="380" x2="800" y2="380" stroke="#2a2a35" strokeWidth="4" />

              <path d="M 350 380 Q 330 330 360 280 T 380 180" fill="none" stroke="rgba(180, 150, 80, 0.4)" strokeWidth="60" strokeLinecap="round" className="animate-pulse" />
              <path d="M 450 380 Q 480 340 440 290 T 420 180" fill="none" stroke="rgba(120, 110, 80, 0.3)" strokeWidth="50" strokeLinecap="round" className="animate-pulse" />
              
              <rect x="360" y="30" width="80" height="150" fill="#3a3a45" />
              <path d="M 370 50 Q 375 90 372 130" fill="none" stroke="#221e10" strokeWidth="6" strokeLinecap="round" />
              <path d="M 430 80 Q 425 110 428 150" fill="none" stroke="#2b2310" strokeWidth="8" strokeLinecap="round" />
              
              <path d="M 320 180 L 480 180 L 620 310 L 180 310 Z" fill="#4a4a58" />
              <circle cx="280" cy="270" r="25" fill="#2d2208" opacity="0.85" />
              <circle cx="500" cy="250" r="35" fill="#1f1805" opacity="0.9" />
              <circle cx="350" cy="220" r="18" fill="#35290b" opacity="0.8" />
              <circle cx="430" cy="280" r="30" fill="#2d2208" opacity="0.85" />

              <path d="M 220 310 Q 225 330 222 340" fill="none" stroke="#1f1805" strokeWidth="4" strokeLinecap="round" />
              <path d="M 390 310 Q 393 325 391 335" fill="none" stroke="#2d2208" strokeWidth="5" strokeLinecap="round" />
              <path d="M 580 310 Q 585 335 582 345" fill="none" stroke="#1c1402" strokeWidth="4" strokeLinecap="round" />

              <rect x="220" y="310" width="160" height="20" fill="#695627" rx="3" />
              <rect x="420" y="310" width="160" height="20" fill="#584820" rx="3" />
              <line x1="220" y1="320" x2="380" y2="320" stroke="#1f1805" strokeWidth="3" />
              <line x1="420" y1="320" x2="580" y2="320" stroke="#1f1805" strokeWidth="3" />

              <rect x="30" y="30" width="100" height="36" rx="18" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2" />
              <text x="80" y="53" fill="#ef4444" fontSize="13" fontWeight="bold" textAnchor="middle">
                {isNepali ? "सफाइ अघि" : "BEFORE"}
              </text>
            </svg>
          </div>

          {/* After Layer (Clean Chimney) - Clipped */}
          <div className="absolute inset-y-0 left-0 w-full h-full overflow-hidden z-10" style={{ width: `${sliderPos}%` }}>
            <svg viewBox="0 0 800 450" className="w-[800px] h-full object-cover" style={{ backgroundColor: "#0f172a" }}>
              <line x1="50" y1="0" x2="50" y2="450" stroke="#1e293b" strokeWidth="2" strokeDasharray="5 5" />
              <line x1="750" y1="0" x2="750" y2="450" stroke="#1e293b" strokeWidth="2" strokeDasharray="5 5" />
              <line x1="0" y1="380" x2="800" y2="380" stroke="#1e293b" strokeWidth="4" />

              <path d="M 300 380 C 330 350 350 320 370 310" fill="none" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="8" strokeLinecap="round" />
              <path d="M 500 380 C 470 350 450 320 430 310" fill="none" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="8" strokeLinecap="round" />
              <path d="M 400 380 L 400 310" fill="none" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="12" strokeLinecap="round" />

              <rect x="360" y="30" width="80" height="150" fill="url(#metalGrad)" />
              <rect x="375" y="30" width="10" height="150" fill="rgba(255, 255, 255, 0.15)" />

              <path d="M 320 180 L 480 180 L 620 310 L 180 310 Z" fill="url(#metalGrad)" />
              
              <path d="M 325 185 L 475 185 L 600 305 L 200 305 Z" fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="2" />
              <line x1="260" y1="210" x2="290" y2="300" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="6" strokeLinecap="round" />
              <line x1="540" y1="210" x2="510" y2="300" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="8" strokeLinecap="round" />

              <path d="M 230 240 Q 230 250 240 250 Q 230 250 230 260 Q 230 250 220 250 Q 230 250 230 240 Z" fill="#cbd5e1" />
              <path d="M 570 230 Q 570 238 578 238 Q 570 238 570 246 Q 570 238 562 238 Q 570 238 570 230 Z" fill="#cbd5e1" />
              <path d="M 400 210 Q 400 215 405 215 Q 400 215 400 220 Q 400 215 395 215 Q 400 215 400 210 Z" fill="#38bdf8" />

              <rect x="220" y="310" width="160" height="20" fill="#475569" rx="3" stroke="#64748b" strokeWidth="1" />
              <rect x="420" y="310" width="160" height="20" fill="#475569" rx="3" stroke="#64748b" strokeWidth="1" />
              <line x1="220" y1="320" x2="380" y2="320" stroke="#334155" strokeWidth="2" />
              <line x1="420" y1="320" x2="580" y2="320" stroke="#334155" strokeWidth="2" />
              
              <line x1="240" y1="313" x2="250" y2="313" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="440" y1="313" x2="450" y2="313" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.5" strokeLinecap="round" />

              <defs>
                <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#94a3b8" />
                  <stop offset="30%" stopColor="#cbd5e1" />
                  <stop offset="50%" stopColor="#64748b" />
                  <stop offset="70%" stopColor="#cbd5e1" />
                  <stop offset="100%" stopColor="#475569" />
                </linearGradient>
              </defs>

              <rect x="30" y="30" width="100" height="36" rx="18" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2" />
              <text x="80" y="53" fill="#22c55e" fontSize="13" fontWeight="bold" textAnchor="middle">
                {isNepali ? "सफाइ पछि" : "AFTER"}
              </text>
            </svg>
          </div>

          {/* Slider Line Divider */}
          <div className="absolute inset-y-0 w-1 bg-primary z-20 pointer-events-none" style={{ left: `${sliderPos}%` }}>
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary border-4 border-card shadow-lg flex items-center justify-center pointer-events-none">
              <span className="text-primary-foreground font-black text-xs">↔</span>
            </div>
          </div>

          {/* Range Slider Overlay */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPos}
            onChange={(e) => setSliderPos(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
          />
        </div>
      </section>


      {/* Modern Horizontal Service Categories Tabs */}
      <div className="mb-8 flex overflow-x-auto gap-2 pb-2 scrollbar-none [mask-image:linear-gradient(to_right,black_85%,transparent)] sm:justify-center">
        {serviceCategories.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`shrink-0 rounded-full border px-5 py-2 text-xs font-semibold transition-colors focus:outline-none ${
              tab === t.key
                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                : "border-border bg-card text-foreground hover:bg-muted"
            }`}
          >
            {isNepali ? t.np : t.en}
          </button>
        ))}
      </div>

      {/* Service Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredServices.map((s, idx) => {
          const Icon = s.icon
          const data = isNepali ? s.np : s.en
          const isCareOpen = expandedCareCard === s.id
          const waMessage = isNepali
            ? `नमस्ते Good Choice, म काठमाडौँ बाट ${data.name} सेवा बुकिङ सम्बन्धी सोधपुछ गर्न चाहन्छु।`
            : `Hello Good Choice, I would like to inquire about booking the ${data.name} service in Kathmandu.`
          const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waMessage)}`

          return (
            <Card
              key={s.id}
              style={{ animationDelay: `${idx * 75}ms` }}
              className="group flex flex-col border-border bg-card/65 p-6 transition-all duration-300 ease-out hover:border-primary/25 hover:shadow-md rounded-2xl animate-slide-up-fade"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-350 ease-out group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <Badge variant="secondary" className="font-semibold text-xs bg-muted text-muted-foreground">
                  {isNepali ? s.badgeNp : s.badgeEn}
                </Badge>
              </div>

              <h3 className="mt-4 font-heading text-base font-bold text-card-foreground transition-colors duration-200 group-hover:text-primary">
                {data.name}
              </h3>
              
              <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">
                {data.desc}
              </p>

              {/* Expandable Care/Maintenance Detail Toggle */}
              <div className="mt-3.5 border-t border-border/40 pt-3">
                <button
                  onClick={() => toggleCareDetails(s.id)}
                  className="flex w-full items-center justify-between text-[11px] font-extrabold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors focus:outline-none"
                >
                  <span>{isNepali ? "मर्मत र हेरचाह जानकारी" : "Care & Maintenance Info"}</span>
                  {isCareOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                </button>
                
                {/* Buttery-Smooth Height Transition Panel using CSS Grid */}
                <div className={`expandable-panel ${isCareOpen ? "open" : ""}`}>
                  <div className="expandable-panel-inner">
                    <div className="mt-3 space-y-2.5 rounded-xl bg-muted/40 border border-border/50 p-3">
                      <div>
                        <span className="block text-[9px] font-extrabold uppercase tracking-wider text-muted-foreground">
                          {isNepali ? "सिफारिस गरिएको अन्तराल:" : "Recommended Frequency:"}
                        </span>
                        <span className="text-xs font-bold text-foreground">{data.frequency}</span>
                      </div>
                      
                      <div>
                        <span className="block text-[9px] font-extrabold uppercase tracking-wider text-muted-foreground">
                          {isNepali ? "के के सफा/सर्भिस गरिन्छ:" : "What gets Serviced:"}
                        </span>
                        <p className="text-xs text-foreground font-medium leading-tight">{data.whatServiced}</p>
                      </div>

                      <div className="border-t border-border/40 pt-2.5">
                        <span className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-wider text-destructive">
                          <AlertTriangle className="h-3 w-3 text-destructive" />
                          {isNepali ? "नियमित सफाइ नगरेमा:" : "If Neglected:"}
                        </span>
                        <p className="text-xs text-destructive font-bold leading-tight mt-0.5">{data.neglectConsequence}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service metadata (duration) */}
              <div className="mt-4 border-t border-border/60 pt-4 text-xs">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span>{isNepali ? `समय: ${data.time}` : `Duration: ${data.time}`}</span>
                </div>
              </div>

              {/* CTA Booking Triggers */}
              <div className="mt-4 flex flex-col gap-2">
                <Button
                  onClick={() => openBookingDrawer(isNepali ? s.np.name : s.en.name)}
                  className="w-full rounded-xl text-sm font-semibold shadow-sm focus:outline-none"
                >
                  {isNepali ? "अहिले बुक गर्नुहोस्" : "Book Service Now"}
                </Button>
                
                <Button
                  render={<a href={waLink} target="_blank" rel="noopener noreferrer" />}
                  variant="outline"
                  className="w-full gap-2 rounded-xl text-sm font-semibold bg-transparent transition-all border-border hover:bg-muted focus:outline-none"
                >
                  <MessageCircle className="h-4 w-4 fill-current text-[#25D366]" />
                  {isNepali ? "ह्वाट्सएप सोधपुछ" : "WhatsApp Chat"}
                </Button>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Call Banner */}
      <div className="mt-12 overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card via-card to-accent/20 p-8 sm:p-10 animate-slide-up-fade">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Phone className="h-7 w-7" />
          </span>
          <div className="flex-1">
            <h3 className="font-heading text-xl font-bold text-foreground">
              {isNepali ? "तत्काल मर्मत कल आवश्यक छ?" : "Need Urgent Technical Help?"}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {isNepali
                ? "हाम्रो हटलाइनमा सिधै सम्पर्क गर्नुहोस् — हामी २४ घण्टाभित्रै प्राविधिक खटाउनेछौं।"
                : "Call our technicians directly for same-day urgent visits and diagnosis."}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 sm:justify-end">
            <Button
              render={<a href={`tel:${phoneNumberSub}`} />}
              className="gap-2 rounded-full font-bold shadow-md focus:outline-none"
            >
              <Phone className="h-4 w-4" />
              {phoneNumberSub}
            </Button>
            <Button
              render={<a href={`tel:${phoneNumberMain}`} />}
              variant="outline"
              className="gap-2 rounded-full font-bold bg-transparent focus:outline-none"
            >
              <Phone className="h-4 w-4" />
              {phoneNumberMain}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
