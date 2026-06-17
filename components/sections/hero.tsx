"use client"

import { useState } from "react"
import { MapPin, ArrowRight, PhoneCall, ShieldCheck, Wrench, Clock, Tv, Wind, Sun, BatteryCharging, Sparkles, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type PageKey = "home" | "catalog" | "services" | "contact"

type HeroProps = {
  isNepali: boolean
  setActivePage: (p: PageKey) => void
  phoneProduct: string
  phoneService: string
  brands: { name: string; logo: string; tooltipEn: string; tooltipNp: string }[]
}

export default function Hero({ isNepali, setActivePage, phoneProduct, phoneService, brands }: HeroProps) {
  const [activeGuideIdx, setActiveGuideIdx] = useState(0)
  const [currentReview, setCurrentReview] = useState(0)

  const careGuides = [
    {
      titleEn: "Is it Worth Repairing?",
      titleNp: "के मर्मत गर्नु उपयुक्त छ?",
      descEn: "Standard rule: If the repair cost is less than 50% of the price of a brand new appliance, and the unit is under 5 years old, always repair it! It saves money and reduces electronic waste.",
      descNp: "साधारण नियम: यदि मर्मत खर्च नयाँ सामानको मूल्यको ५०% भन्दा कम छ र सामान ५ वर्षभन्दा पुरानो छैन भने मर्मत गर्नु नै फाइदाजनक हुन्छ। यसले पैसा बचत गर्छ र वातावरणीय प्रदूषण घटाउँछ।"
    },
    {
      titleEn: "Winter Solar Water Geyser Care Alert",
      titleNp: "हिउँदमा सोलार वाटर हिटरको हेरचाह",
      descEn: "Dust and smog block sunlight from heating the vacuum tubes. Wipe the tubes gently with water and a soft cloth every autumn. Also, flush the solar tank to remove scale build-up for 30% hotter water.",
      descNp: "धूलो र कुहिरोले सोलारका भ्याकुम ट्युबहरू तातो हुन दिँदैन। हरेक शरद ऋतुमा ट्युबहरूलाई नरम कपडा र पानीले बिस्तारै पुछ्नुहोस्। साथै, ३०% बढी तातो पानी पाउन सोलार ट्याङ्क भित्र जमेको लेदो सफा गर्नुहोस्।"
    },
    {
      titleEn: "Chimney Oil Cup Warning",
      titleNp: "किचन चिम्नी ओइल कप चेतावनी",
      descEn: "Never let the grease collector cup overflow! Sticky oil build-up increases motor resistance, causing overheating, and can catch fire if gas flames rise too high. Clean it every 2 weeks.",
      descNp: "चिम्नीको तेल जम्मा हुने कपलाई कहिल्यै भरिन नदिनुहोस्! जमेको चिल्लोले गर्दा मोटर तात्ने र ग्यासको आगो ठूलो हुँदा आगलागी हुने उच्च जोखिम हुन्छ। यसलाई हरेक २ हप्तामा सफा गर्नुहोस्।"
    },
    {
      titleEn: "Magnesium Anode: The Silent Solar Protector",
      titleNp: "म्याग्नेसियम एनोड: सोलारको मौन रक्षक",
      descEn: "Hard water eats away the inner steel tank of solar heaters. The magnesium anode rod attracts rust, sacrificing itself to protect your tank. Replace this rod every 2 years to prevent expensive tank cracks.",
      descNp: "कडा पानीले सोलार हिटरको भित्री स्टील ट्याङ्कलाई बिस्तारै नष्ट गर्छ। म्याग्नेसियम एनोड रडले खियालाई आफैंतिर आकर्षित गरी ट्याङ्क सुरक्षित राख्छ। ट्याङ्क फुट्न नदिन हरेक २ वर्षमा यो रड फेर्नुहोस्।"
    },
    {
      titleEn: "TV Screen Spray Warning",
      titleNp: "टिभी स्क्रिनमा स्प्रे गर्दा सावधानी",
      descEn: "Never spray glass cleaners or water directly onto LED screen surfaces! Liquid runs down into the bottom board (T-Con), causing instant circuit board burnout and vertical lines. Spray onto a microfiber cloth first.",
      descNp: "LED टिभी स्क्रिनमा कहिल्यै पनि सिधै ग्लास क्लिनर वा पानी स्प्रे नगर्नुहोस्! तरल पदार्थ बगेर तल्लो बोर्ड (T-Con) मा पुग्दा सर्ट भई स्क्रिनमा ठाडो रेखाहरू आउने वा टिभी जल्दछ। सधैं पहिले कपडामा स्प्रे गर्नुहोस्।"
    }
  ]

  const reviews = [
    {
      name: "Ram Krishna Shrestha",
      location: "Thankot, KTM",
      textEn: "Excellent chimney cleaning service. The team was highly professional, worked fast, and left the kitchen clean.",
      textNp: "उत्कृष्ट चिम्नी सफाइ सेवा। टोली धेरै व्यावसायिक थिए, छिटो काम गरे र भान्सा सफा राखे।",
      stars: 5
    },
    {
      name: "Sabina Thapa",
      location: "Kalanki, KTM",
      textEn: "Highly recommend for TV repair. They diagnosed the power board issue and fixed my LED screen on the same day!",
      textNp: "टिभी मर्मतको लागि धेरै सिफारिस गर्दछु। उनीहरूले पावर बोर्डको समस्या पत्ता लगाई सोही दिन मेरो LED स्क्रिन बनाए!",
      stars: 5
    },
    {
      name: "Rajesh KC",
      location: "Sitapaila, KTM",
      textEn: "Best solar service in town. Genuine pricing and the backup system has been working flawlessly through winters.",
      textNp: "सहरकै उत्कृष्ट सोलार सेवा। वास्तविक मूल्य र ब्याकअप प्रणालीले हिउँदभरि पनि राम्रोसँग काम गरिरहेको छ।",
      stars: 5
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

  const categories = [
    { icon: Tv, en: "Electronics", np: "इलेक्ट्रोनिक्स", target: "catalog" as PageKey },
    { icon: Wind, en: "Kitchen Chimneys", np: "किचन चिम्नी", target: "catalog" as PageKey },
    { icon: Sun, en: "Solar Systems", np: "सोलार प्रणाली", target: "catalog" as PageKey },
    { icon: Wrench, en: "Expert Services", np: "मर्मत तथा जडान", target: "services" as PageKey }
  ]

  // Workflow steps
  const steps = [
    {
      labelEn: "1. Request Service",
      labelNp: "१. सेवा अनुरोध",
      titleEn: "Easy Booking",
      titleNp: "सजिलो बुकिङ",
      descEn: "Call us directly or send a booking request via WhatsApp in 30 seconds. No complex registration needed.",
      descNp: "हामीलाई सिधै कल गर्नुहोस् वा ३० सेकेन्डमै ह्वाट्सएप मार्फत बुकिङ गर्नुहोस्। कुनै झन्झटिलो दर्ता आवश्यक छैन।"
    },
    {
      labelEn: "2. Booking Confirmed",
      labelNp: "२. बुकिङ निश्चित",
      titleEn: "Instant Dispatch",
      titleNp: "तुरुन्त व्यवस्थापन",
      descEn: "We review details, confirm parts availability, and coordinate the perfect visit time matching your schedule.",
      descNp: "हामी विवरण समीक्षा गर्छौं, स्पेयर पार्टस्को उपलब्धता निश्चित गर्छौं र तपाईंको समय तालिका अनुसार समय मिलाउँछौं।"
    },
    {
      labelEn: "3. Technician Visit",
      labelNp: "३. प्राविधिक आगमन",
      titleEn: "On-Site Repair",
      titleNp: "घरमै मर्मत सेवा",
      descEn: "Our expert technician arrives at your door across Kathmandu with advanced equipment and genuine spare parts.",
      descNp: "हाम्रा विशेषज्ञ प्राविधिक अत्याधुनिक उपकरण र सक्कली पार्ट्स लिएर काठमाडौँ उपत्यकाभित्र तपाईंको ढोकामै आउँछन्।"
    },
    {
      labelEn: "4. Done & Warranted",
      labelNp: "४. काम सम्पन्न र वारेन्टी",
      titleEn: "Satisfaction Guaranteed",
      titleNp: "सन्तुष्टिको ग्यारेन्टी",
      descEn: "Test the appliance, complete the payment, and enjoy official service warranty support for added peace of mind.",
      descNp: "सामान परिक्षण गर्नुहोस्, भुक्तानी गर्नुहोस् र थप ढुक्क हुनको लागि आधिकारिक मर्मत वारेन्टी सेवा पाउनुहोस्।"
    }
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

      {/* Hero section */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24 lg:px-8">
        
        {/* Left column text */}
        <div className="animate-in fade-in slide-in-from-bottom-5 duration-700">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-semibold text-foreground backdrop-blur-md">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            {isNepali ? "काठमाडौँ उपत्यका · वि.सं. २०६९ देखि" : "Kathmandu Valley · Since 2069 B.S."}
          </span>
          
          <h1 className="mt-6 text-balance font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {isNepali ? (
              <>
                तपाईंको घरका लागि <span className="text-primary animate-pulse">भरपर्दो इलेक्ट्रोनिक्स</span> र सेवा
              </>
            ) : (
              <>
                Trusted <span className="text-primary animate-pulse">Electronics</span> &amp; Service for Your Home
              </>
            )}
          </h1>
          
          <p className="mt-5 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
            {isNepali
              ? "किचन उपकरण, हिटिङ, सोलार र इलेक्ट्रोनिक्स — बिक्री, जडान र मर्मत सबै एकै ठाउँमा। काठमाडौँको भरपर्दो र विश्वसनीय पसल।"
              : "Kitchen appliances, heating, solar and electronics — sales, installation and repair, all in one place. Kathmandu's trusted local service."}
          </p>

          {/* Call-to-actions */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              size="lg"
              onClick={() => setActivePage("catalog")}
              className="gap-2 rounded-full font-bold shadow-lg transition-transform hover:scale-105"
            >
              {isNepali ? "उत्पादन हेर्नुहोस्" : "Browse Products"}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              render={<a href={`tel:${phoneService}`} />}
              size="lg"
              variant="outline"
              className="gap-2 rounded-full font-bold bg-card/40 backdrop-blur-sm border-border hover:bg-muted transition-transform hover:scale-105"
            >
              <PhoneCall className="h-4 w-4 text-primary" />
              {isNepali ? "मर्मत कल गर्नुहोस्" : "Call for Repair"}
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

        {/* Right column category visualizer */}
        <div className="relative animate-in fade-in zoom-in-95 duration-700 lg:justify-self-end">
          <div className="grid grid-cols-2 gap-4">
            {categories.map((c, i) => {
              const Icon = c.icon
              return (
                <button
                  key={i}
                  onClick={() => setActivePage(c.target)}
                  className={`group flex flex-col items-center justify-center gap-3 rounded-3xl border border-border bg-card/50 p-8 text-center shadow-sm backdrop-blur-sm transition-all duration-500 hover:border-primary/25 hover:shadow-md hover:bg-card focus:outline-none ${
                    i % 2 === 1
                      ? "translate-y-6 hover:translate-y-4"
                      : "hover:-translate-y-2"
                  }`}
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-6">
                    <Icon className="h-8 w-8" />
                  </span>
                  <span className="font-heading text-sm font-bold text-card-foreground transition-colors duration-300 group-hover:text-primary">
                    {isNepali ? c.np : c.en}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Auto-scroll partner marquee */}
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


      {/* Interactive "Did You Know?" Care Carousel */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-border/60 animate-slide-up-fade">
        <div className="mx-auto max-w-2xl text-center mb-8">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            {isNepali ? "के तपाईंलाई थाहा छ?" : "Did You Know? Appliance Care"}
          </span>
          <h3 className="mt-4 font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
            {isNepali ? "उपकरण हेरचाह र मर्मत निर्देशिका" : "Crucial Appliance Maintenance Guides"}
          </h3>
        </div>

        <div className="max-w-2xl mx-auto relative px-10">
          <Card className="border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 p-6 md:p-8 rounded-3xl shadow-sm text-center relative overflow-hidden min-h-[12rem] flex flex-col justify-between">
            {/* Carousel Content */}
            <div key={activeGuideIdx} className="animate-in fade-in duration-300">
              <h4 className="font-heading text-sm font-extrabold text-primary mb-3">
                {isNepali ? careGuides[activeGuideIdx].titleNp : careGuides[activeGuideIdx].titleEn}
              </h4>
              <p className="text-xs leading-relaxed text-muted-foreground font-medium md:text-sm">
                {isNepali ? careGuides[activeGuideIdx].descNp : careGuides[activeGuideIdx].descEn}
              </p>
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

      {/* Swipeable Testimonials Carousel */}
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

            <div className="mt-6 border-t border-border/60 pt-4">
              <h4 className="font-heading text-sm font-bold text-card-foreground">
                {reviews[currentReview].name}
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                {reviews[currentReview].location}
              </p>
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
