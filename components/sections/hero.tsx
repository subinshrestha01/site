"use client"

import { useState } from "react"
import { MapPin, ArrowRight, ShieldCheck, Wrench, Clock, Tv, Sun, Star, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type PageKey = "home" | "catalog" | "services" | "contact"

type HeroProps = {
  isNepali: boolean
  setActivePage: (p: PageKey) => void
  phoneProduct: string
  phoneService: string
  brands: { name: string; logo: string; tooltipEn: string; tooltipNp: string }[]
  openBookingDrawer: (service: string) => void
}

export default function Hero({ isNepali, setActivePage, phoneProduct, phoneService, brands, openBookingDrawer }: HeroProps) {
  const [activeGuideIdx, setActiveGuideIdx] = useState(0)
  const [currentReview, setCurrentReview] = useState(0)

  // Scannable Appliance Care Tips (Outcome-based and scannable neighborly tone)
  const careGuides = [
    {
      titleEn: "Is it Worth Repairing?",
      titleNp: "के मर्मत गर्नु उपयुक्त छ?",
      descEn: "• **Standard Rule**: Repair if the cost is less than 50% of buying a new unit.\n• **Age Check**: Best to repair if the appliance is under 5 years old.\n• **Value**: Saves money and reduces electronics waste.",
      descNp: "• **साधारण नियम**: यदि मर्मत खर्च नयाँ मूल्यको ५०% भन्दा कम छ भने मर्मत गर्नुहोस्।\n• **उमेर जाँच**: ५ वर्षभन्दा कम पुराना उपकरण मर्मत गर्नु सबैभन्दा उत्तम हुन्छ।\n• **बचत**: यसले पैसा बचाउँछ र वातावरणीय प्रदूषण पनि घटाउँछ।"
    },
    {
      titleEn: "Solar Water Heater Winter Care",
      titleNp: "हिउँदमा सोलार वाटर हिटरको हेरचाह",
      descEn: "• **Wipe Clean**: Clean tubes with water and a soft cloth every autumn to remove dust.\n• **Flushing**: Flush the tank once a year to clear scale build-up.\n• **Performance**: Restores up to 30% hotter water supply.",
      descNp: "• **नियमित सफाइ**: धुलो हटाउन हरेक शरद ऋतुमा ट्युबहरूलाई नरम कपडा र पानीले पुछ्नुहोस्।\n• **ट्याङ्क सफा**: भित्र जमेको लेदो हटाउन वर्षमा एक पटक ट्याङ्क सफा गर्नुहोस्।\n• **उत्कृष्ट काम**: ३०% सम्म बढी तातो पानी पाउन मद्दत गर्दछ।"
    },
    {
      titleEn: "Kitchen Chimney Oil Cup Alert",
      titleNp: "किचन चिम्नी ओइल कप चेतावनी",
      descEn: "• **Empty Regularly**: Clean the grease collector cup every 2 weeks.\n• **Prevent Fire**: Overflowing grease increases fire hazard under hot stoves.\n• **Motor Health**: Dirty cups increase motor load and risk overheating.",
      descNp: "• **नियमित खाली**: तेल जम्मा हुने कपलाई हरेक २ हप्तामा सफा गर्नुहोस्।\n• **आगलागीबाट बच्नुहोस्**: कप भरिएर चिल्लो चुलोमा खस्दा आगो लाग्ने खतरा हुन्छ।\n• **मोटर सुरक्षा**: धेरै चिल्लो जम्दा मोटर तातेर बिग्रिने जोखिम हुन्छ।"
    },
    {
      titleEn: "TV Screen Care Warning",
      titleNp: "टिभी स्क्रिन सफा गर्दा सावधानी",
      descEn: "• **Never Spray Directly**: Spraying liquid directly onto LED panels causes circuit burnout.\n• **Use Microfiber**: Always spray cleaner onto a microfiber cloth first, then wipe.\n• **Dry Wipe**: Ensure no moisture drips into the bottom screen borders.",
      descNp: "• **सिधै स्प्रे नगर्नुहोस्**: स्क्रिनमा पानी वा ग्लास क्लिनर स्प्रे गर्दा भित्री सर्किट बल्न सक्छ।\n• **कपडा प्रयोग**: सधैं पहिले माइक्रोफाइबर कपडामा स्प्रे गरेर मात्र सफा गर्नुहोस्।\n• **सुक्खा पुछ्ने**: स्क्रिनको तल्लो किनारामा कुनै पनि तरल पदार्थ जान नदिनुहोस्।"
    }
  ]

  const reviews = [
    {
      name: "Ram Krishna Shrestha",
      location: "Thankot, KTM",
      textEn: "Excellent chimney cleaning service. The team was highly professional, worked fast, and left the kitchen clean.",
      textNp: "उत्कृष्ट चिम्नी सफाइ सेवा। टोली धेरै व्यावसायिक थिए, छिटो काम गरे र भान्सा सफा राखे।",
      stars: 5,
      avatar: "RS"
    },
    {
      name: "Sabina Thapa",
      location: "Kalanki, KTM",
      textEn: "Highly recommend for TV repair. They diagnosed the power board issue and fixed my LED screen on the same day!",
      textNp: "टिभी मर्मतको लागि धेरै सिफारिस गर्दछु। उनीहरूले पावर बोर्डको समस्या पत्ता लगाई सोही दिन मेरो LED स्क्रिन बनाए!",
      stars: 5,
      avatar: "ST"
    },
    {
      name: "Rajesh KC",
      location: "Sitapaila, KTM",
      textEn: "Best solar service in town. Genuine pricing and the backup system has been working flawlessly through winters.",
      textNp: "सहरकै उत्कृष्ट सोलार सेवा। वास्तविक मूल्य र ब्याकअप प्रणालीले हिउँदभरि पनि राम्रोसँग काम गरिरहेको छ।",
      stars: 5,
      avatar: "RK"
    }
  ]

  const stats = [
    { v: "2069", en: "Established (B.S.)", np: "स्थापना (वि.सं.)" },
    { v: "5000+", en: "Happy Customers", np: "सन्तुष्ट ग्राहक" },
    { v: "14+", en: "Years of Trust", np: "वर्षको विश्वास" }
  ]

  const highlights = [
    {
      icon: ShieldCheck,
      en: { t: "Authorized Dealer", d: "Genuine products with official warranty." },
      np: { t: "अधिकृत डिलर", d: "अधिकारिक वारेन्टीसहित असली उत्पादन।" }
    },
    {
      icon: Wrench,
      en: { t: "Expert Repair", d: "In-house technicians for fast service." },
      np: { t: "विशेषज्ञ मर्मत", d: "छिटो सेवाका लागि घरकै प्राविधिक।" }
    },
    {
      icon: Clock,
      en: { t: "Quick Service", d: "Same-day local installation & support." },
      np: { t: "छिटो सेवा", d: "सोही दिन स्थानीय जडान र सहयोग।" }
    }
  ]

  // Benefit-driven category shortcuts with Flame icon replacing Wind for chimneys
  const categories = [
    { icon: Tv, en: "Home Electronics & TV", np: "घरायसी इलेक्ट्रोनिक्स र टिभी", target: "catalog" as PageKey },
    { icon: Flame, en: "Smoke-Free Kitchen Chimneys", np: "धुवाँ-रहित भान्सा (चिम्नी)", target: "catalog" as PageKey },
    { icon: Sun, en: "Heating & Solar Systems", np: "सोलार र हिटिङ प्रणाली", target: "catalog" as PageKey },
    { icon: Wrench, en: "Fix Your Appliances Today", np: "आधिकारिक मर्मत सेवा", target: "services" as PageKey }
  ]

  const marqueeRow = [...brands, ...brands]

  return (
    <div className="relative overflow-hidden bg-background">
      {/* Premium ambient light glow meshes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 55% at 10% 10%, color-mix(in oklab, var(--primary) 18%, transparent), transparent), radial-gradient(50% 50% at 95% 15%, color-mix(in oklab, var(--primary) 12%, transparent), transparent), radial-gradient(60% 60% at 80% 95%, color-mix(in oklab, var(--primary) 10%, transparent), transparent)"
        }}
      />

      {/* Hero section - Optimized for First Impressions & Authentic Storefront Image */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24 lg:px-8">
        
        {/* Left column text */}
        <div className="animate-in fade-in slide-in-from-bottom-5 duration-700">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-semibold text-foreground backdrop-blur-md">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            {isNepali ? "थानकोट, काठमाडौँ उपत्यका · वि.सं. २०६९ देखि" : "Thankot, Kathmandu Valley · Since 2069 B.S."}
          </span>
          
          {/* Crisp, one-sentence value proposition (Reason 1) */}
          <h1 className="mt-6 text-balance font-heading text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {isNepali ? (
              <>
                १४ वर्षभन्दा बढी समयदेखि काठमाडौँको <span className="text-primary">भरपर्दो अधिकृत इलेक्ट्रोनिक्स</span> साझेदार र विशेषज्ञ मर्मत केन्द्र
              </>
            ) : (
              <>
                Kathmandu’s <span className="text-primary">Trusted Authorized Electronics</span> Partner &amp; Expert Repair Center for Over 14 Years
              </>
            )}
          </h1>
          
          <p className="mt-5 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
            {isNepali
              ? "स्मार्ट टिभी, अटो-क्लिन चिम्नी, सोलार वाटर हिटर र भोल्टेज स्टेबिलाइजरको आधिकारिक विक्रेता र मर्मत सेवा। थानकोट र काठमाडौँ उपत्यकाभर सेवारत।"
              : "Authorized dealer and professional support for smart TVs, auto-clean chimneys, solar water heaters, and power stabilizers. Serving Thankot, Kalanki, and Kathmandu Valley since 2069 B.S."}
          </p>

          {/* Primary High-Contrast Call-to-Action only (Reason 1) */}
          <div className="mt-8">
            <Button
              size="lg"
              onClick={() => openBookingDrawer("General Diagnostics & Repair")}
              className="gap-2.5 rounded-full font-bold px-8 py-6 text-base shadow-xl transition-all duration-300 hover:scale-105 bg-primary text-primary-foreground border-transparent hover:bg-primary/95"
            >
              <Wrench className="h-5 w-5" />
              {isNepali ? "मर्मत अनुरोध गर्नुहोस्" : "Request a Repair"}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Counter stats */}
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4">
            {stats.map((s) => (
              <div
                key={s.v}
                className="rounded-2xl border border-border bg-card/40 p-4 text-center backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-primary/20 hover:bg-card/75 hover:shadow-md"
              >
                <dt className="font-heading text-2xl font-extrabold text-foreground">{s.v}</dt>
                <dd className="mt-1 text-[11px] text-muted-foreground">{isNepali ? s.np : s.en}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right column: Authentic storefront and team image (Reason 1) */}
        <div className="relative animate-in fade-in zoom-in-95 duration-700 lg:justify-self-end">
          <Card className="overflow-hidden rounded-3xl border-primary/20 bg-card shadow-2xl transition-all duration-300 hover:scale-[1.01] hover:border-primary/35 max-w-lg">
            <img 
              src="/imgs/storefront.png" 
              alt="New Good Choice Electronic Center Thankot Storefront & Team" 
              className="w-full h-auto object-cover"
            />
            <div className="p-5 bg-muted/30 border-t border-border">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary block mb-1">
                {isNepali ? "हाम्रो आधिकारिक शोरूम - थानकोट, काठमाडौँ" : "Our Authorized Showroom - Thankot, Kathmandu"}
              </span>
              <h4 className="font-heading text-base font-bold text-foreground">
                {isNepali ? "न्यू गुड च्वाइस इलेक्ट्रोनिक्स" : "New Good Choice Electronic Center"}
              </h4>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                {isNepali 
                  ? "हाम्रो शोरूममा आउनुहोस् वा सोही दिन घरमै प्राविधिक सेवा पाउन मर्मत अनुरोध पठाउनुहोस्।" 
                  : "Visit our showroom in Thankot or send a repair request online for same-day professional home-visit support."}
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Category Shortcuts Section (Reason 2 - Visual Icons) */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 border-t border-border/60">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {categories.map((c, i) => {
            const Icon = c.icon
            return (
              <button
                key={i}
                onClick={() => setActivePage(c.target)}
                className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card/45 p-6 text-center shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-primary/25 hover:scale-105 hover:bg-card focus:outline-none"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="font-heading text-xs font-bold text-foreground transition-colors duration-300 group-hover:text-primary leading-tight">
                  {isNepali ? c.np : c.en}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      {/* Auto-scroll partner marquee (Trusted partner banner immediately below hero section - Reason 3) */}
      <section className="border-y border-border bg-muted/20 py-10">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          {isNepali ? "हाम्रा अधिकृत साझेदार ब्रान्डहरू" : "Our Authorized Partner Brands"}
        </p>
        <div className="marquee-pause relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="animate-marquee flex shrink-0 items-center gap-6 pr-6">
            {marqueeRow.map((b, i) => (
              <div
                key={i}
                className="relative group/tooltip flex h-20 w-44 items-center justify-center rounded-2xl border border-border bg-card p-4 shadow-sm transition-all duration-500 ease-out hover:scale-105 hover:border-primary/20 hover:shadow-md cursor-help"
              >
                <img
                  src={b.logo}
                  alt={`${b.name} logo`}
                  className="max-h-full max-w-full object-contain filter dark:brightness-90"
                  loading="lazy"
                />
                
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 w-48 scale-95 opacity-0 pointer-events-none group-hover/tooltip:scale-100 group-hover/tooltip:opacity-100 transition-all duration-200 z-50 rounded-xl bg-card border border-border p-2.5 text-center text-[10px] font-bold text-foreground shadow-md">
                  {isNepali ? b.tooltipNp : b.tooltipEn}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-card" />
                </div>
              </div>
            ))}
          </div>
          <div className="animate-marquee flex shrink-0 items-center gap-6 pr-6" aria-hidden="true">
            {marqueeRow.map((b, i) => (
              <div
                key={i}
                className="relative group/tooltip flex h-20 w-44 items-center justify-center rounded-2xl border border-border bg-card p-4 shadow-sm transition-all duration-500 ease-out hover:scale-105 hover:border-primary/20 hover:shadow-md cursor-help"
              >
                <img
                  src={b.logo}
                  alt={`${b.name} logo`}
                  className="max-h-full max-w-full object-contain filter dark:brightness-90"
                  loading="lazy"
                />
                
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 w-48 scale-95 opacity-0 pointer-events-none group-hover/tooltip:scale-100 group-hover/tooltip:opacity-100 transition-all duration-200 z-50 rounded-xl bg-card border border-border p-2.5 text-center text-[10px] font-bold text-foreground shadow-md">
                  {isNepali ? b.tooltipNp : b.tooltipEn}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-card" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights & Values */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-3">
          {highlights.map((h, idx) => (
            <Card
              key={idx}
              className="card-shine group border-border p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/20 hover:shadow-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                <h.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-heading text-lg font-bold text-card-foreground transition-colors duration-300 group-hover:text-primary">
                {isNepali ? h.np.t : h.en.t}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {isNepali ? h.np.d : h.en.d}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Appliance Care Carousel - Outcome-based Neighborly Title (Reason 5) */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-border/60 animate-slide-up-fade">
        <div className="mx-auto max-w-2xl text-center mb-8">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            {isNepali ? "उपकरण सुरक्षा" : "Appliance Care"}
          </span>
          <h3 className="mt-4 font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
            {isNepali ? "सामान धेरै समय टिकाउने तरिकाहरू" : "Ways to Make Your Appliances Last Longer"}
          </h3>
        </div>

        <div className="max-w-2xl mx-auto relative px-10">
          <Card className="border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 p-6 md:p-8 rounded-3xl shadow-sm relative overflow-hidden min-h-[14rem] flex flex-col justify-between">
            {/* Carousel Content */}
            <div key={activeGuideIdx} className="animate-in fade-in duration-300">
              <h4 className="font-heading text-base font-extrabold text-primary mb-3 text-center">
                {isNepali ? careGuides[activeGuideIdx].titleNp : careGuides[activeGuideIdx].titleEn}
              </h4>
              
              {/* Bulleted and scannable tips (Reason 5) */}
              <div className="text-sm leading-relaxed text-muted-foreground space-y-2 max-w-lg mx-auto">
                {(isNepali ? careGuides[activeGuideIdx].descNp : careGuides[activeGuideIdx].descEn).split('\n').map((line, i) => {
                  const cleanLine = line.replace(/^•\s*/, "");
                  const boldParts = cleanLine.split(/\*\*(.*?)\*\*/g);
                  
                  return (
                    <div key={i} className="flex items-start gap-2 text-left">
                      <span className="text-primary mt-1 shrink-0">•</span>
                      <span>
                        {boldParts.map((part, idx) => 
                          idx % 2 === 1 ? <strong key={idx} className="text-foreground font-bold">{part}</strong> : part
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 flex justify-center gap-1">
              {careGuides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveGuideIdx(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeGuideIdx === i ? "w-6 bg-primary" : "w-1.5 bg-border hover:bg-muted-foreground"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </Card>

          {/* Navigation Arrows */}
          <button
            onClick={() => setActiveGuideIdx((prev) => (prev - 1 + careGuides.length) % careGuides.length)}
            className="absolute left-0 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-all hover:bg-muted focus:outline-none"
            aria-label="Previous slide"
          >
            ←
          </button>
          <button
            onClick={() => setActiveGuideIdx((prev) => (prev + 1) % careGuides.length)}
            className="absolute right-0 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-all hover:bg-muted focus:outline-none"
            aria-label="Next slide"
          >
            →
          </button>
        </div>
      </section>

      {/* Swipeable Testimonials Carousel with verified initials avatar (Reason 3) */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-border/60 mb-10 animate-slide-up-fade">
        <div className="mx-auto max-w-2xl text-center mb-8">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            {isNepali ? "ग्राहक समीक्षा" : "Testimonials"}
          </span>
          <h3 className="mt-4 font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
            {isNepali ? "हाम्रा सन्तुष्ट ग्राहकहरू" : "Words from Our Clients"}
          </h3>
        </div>

        <div className="max-w-2xl mx-auto relative px-10">
          <Card className="border-primary/20 bg-gradient-to-br from-card to-accent/5 p-6 md:p-8 rounded-3xl shadow-sm text-center relative overflow-hidden animate-in fade-in duration-300">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(reviews[currentReview].stars)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-primary text-primary animate-pulse" />
              ))}
            </div>

            <p className="text-sm leading-relaxed text-foreground italic md:text-base">
              "{isNepali ? reviews[currentReview].textNp : reviews[currentReview].textEn}"
            </p>

            {/* Testimonials customer initial avatar representation (Reason 3) */}
            <div className="mt-6 border-t border-border/60 pt-4 flex items-center justify-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary font-extrabold text-xs">
                {reviews[currentReview].avatar}
              </div>
              <div className="text-left leading-tight">
                <h4 className="font-heading text-sm font-bold text-card-foreground">
                  {reviews[currentReview].name}
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {reviews[currentReview].location}
                </p>
              </div>
            </div>
          </Card>

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length)}
            className="absolute left-0 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-all hover:bg-muted focus:outline-none"
            aria-label="Previous review"
          >
            ←
          </button>
          <button
            onClick={() => setCurrentReview((prev) => (prev + 1) % reviews.length)}
            className="absolute right-0 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-all hover:bg-muted focus:outline-none"
            aria-label="Next review"
          >
            →
          </button>
        </div>
      </section>
    </div>
  )
}
