"use client"

import { useState, useEffect } from "react"
import { Search, Tv, Wind, Sun, BatteryCharging, CircleCheckBig, Phone, CookingPot, Microwave, Droplets, Snowflake, Zap, Sparkles, Flame, HelpCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type Category = "kitchen" | "heating" | "electronics"

type Product = {
  id: number
  cat: Category
  iconName?: string
  imageUrl?: string
  en: { name: string; specs: string[]; advantages: string[] }
  np: { name: string; specs: string[]; advantages: string[] }
}

const iconMap: Record<string, React.ComponentType<any>> = {
  Sun,
  Flame,
  CookingPot,
  Microwave,
  Droplets,
  Snowflake,
  BatteryCharging,
  Tv,
  Wind,
  Zap,
  CircleCheckBig,
  Phone
}

function getIconComponent(iconName: string) {
  return iconMap[iconName] || HelpCircle
}

type ProductsProps = {
  isNepali: boolean
  phoneNumber: string
}

const categoryBenefits: Record<Category, {
  en: { title: string; items: string[] };
  np: { title: string; items: string[] };
}> = {
  kitchen: {
    en: {
      title: "Enjoy a Smoke-Free Kitchen with Auto-Clean Chimneys",
      items: [
        "Lung Protection: Captures hazardous oil mist, heat, and carbon monoxide.",
        "Spotless Cabinets: Prevents grease particles from sticking to walls and tiles.",
        "Odor Elimination: Rapid suction pulls cooking smells instantly."
      ]
    },
    np: {
      title: "अटो-क्लिन चिम्नीको साथमा धुवाँ-रहित सफा भान्साको आनन्द लिनुहोस्",
      items: [
        "फोक्सोको सुरक्षा: हानिकारक चिल्लो, धुवाँ र कार्वन मोनोअक्साइड सोसेर लिन्छ।",
        "सफा क्याबिनेट र भित्ता: भित्ता र टायलहरूमा चिल्लो लेदो जम्न दिँदैन।",
        "गन्ध निवारण: मसला र खानाको कडा गन्धलाई तुरुन्तै बाहिर फाल्छ।"
      ]
    }
  },
  heating: {
    en: {
      title: "Why Switch to Solar Water Heating Systems?",
      items: [
        "Zero Energy Bills: Free solar energy offsets up to 90% of water heating costs.",
        "Continuous Supply: Double-walled vacuum tubes retain water temperature in winter.",
        "Eco-Friendly: Clean renewable energy that reduces your carbon footprint."
      ]
    },
    np: {
      title: "सोलार वाटर हिटिङ सिस्टमका मुख्य फाइदाहरू",
      items: [
        "शून्य बिजुली महसुल: तातो पानीको खर्चलाई ९०% सम्म कम गर्दछ।",
        "निरन्तर तातो पानी: डबल-वाल भ्याकुम ट्युबले हिउँदमा पनि पानी तातो राख्छ।",
        "पर्यावरण मैत्री: कार्बन उत्सर्जन घटाउने स्वच्छ ऊर्जा स्रोत।"
      ]
    }
  },
  electronics: {
    en: {
      title: "Upgrade Your Home Entertainment & Protection",
      items: [
        "Crystal-Clear 4K: Theater-like visuals in your living room at home.",
        "Smart Connectivity: Built-in WiFi, apps, and seamless internet access.",
        "Voltage Protection: V-Guard stabilizers shield your appliances from surges."
      ]
    },
    np: {
      title: "घरायसी मनोरञ्जन र सुरक्षा स्तरोन्नति गर्नुहोस्",
      items: [
        "क्रिस्टल-क्लियर ४K: घरमै हल जस्तै सिनेमाको अनुभव।",
        "स्मार्ट जडान: बिल्ट-इन वाईफाई, एप्स र इन्टरनेट पहुँच।",
        "भोल्टेज सुरक्षा: भि-गार्ड स्टेबिलाइजरले सामानलाई भोल्टेज उतारचढावबाट बचाउँछ।"
      ]
    }
  }
}

const defaultProducts: Product[] = [
  {
    id: 5,
    cat: "heating",
    iconName: "Sun",
    en: {
      name: "Solar Water Heating System",
      specs: ["100–300 L tank options", "Year-round hot water", "Low running cost"],
      advantages: ["Once paid, unlimited free hot water", "Zero electricity bills", "Works efficiently even in cold winter days"]
    },
    np: {
      name: "सोलार वाटर हिटिङ प्रणाली",
      specs: ["१००–३०० लिटर ट्याङ्क विकल्प", "वर्षभरि तातो पानी", "कम सञ्चालन खर्च"],
      advantages: ["एक पटकको लगानी, सधैंको लागि निःशुल्क तातो पानी", "शून्य बिजुली महसुल", "चिसो हिउँदमा पनि प्रभावकारी काम"]
    }
  },
  {
    id: 1,
    cat: "kitchen",
    iconName: "Flame",
    en: {
      name: "Auto-Clean Kitchen Chimney",
      specs: ["Powerful 1200 m³/hr suction", "Touch & auto-clean control", "Hindware / Brio authorized"],
      advantages: ["Protects lungs from harmful oil fumes & smoke", "Prevents sticky yellow walls & cabinets", "Zero maintenance auto-clean heating coils"]
    },
    np: {
      name: "अटो-क्लिन किचन चिम्नी",
      specs: ["१२०० m³/घण्टा शक्तिशाली सक्सन", "टच र अटो-क्लिन सुविधा", "हिन्दवेयर / ब्रियो अधिकृत"],
      advantages: ["धुवाँ र हानिकारक चिल्लोबाट फोक्सोको सुरक्षा", "भित्ता र क्याबिनेटमा चिल्लो जम्न नदिने", "बिना झन्झट अटो-क्लिन प्रविधि"]
    }
  },
  {
    id: 2,
    cat: "kitchen",
    iconName: "CookingPot",
    en: {
      name: "Toughened Glass Gas Cooktop",
      specs: ["Brass burners, 2–4 hobs", "Anti-skid heat resistant body", "Auto-ignition available"],
      advantages: ["Heavy-duty toughened glass, scratch resistant", "High thermal efficiency brass burners", "Safe heat-resistant structure"]
    },
    np: {
      name: "टफन्ड ग्लास ग्यास चुलो",
      specs: ["ब्रास बर्नर, २–४ चुलो", "एन्टि-स्किड तातो प्रतिरोधी बडी", "अटो-इग्निसन उपलब्ध"],
      advantages: ["मजबुत र स्क्र्याच-प्रतिरोधी ग्लास", "उच्च ताप क्षमता भएको ब्रास बर्नर", "सुरक्षित र तातो-प्रतिरोधी डिजाइन"]
    }
  },
  {
    id: 3,
    cat: "kitchen",
    iconName: "Microwave",
    en: {
      name: "Convection Microwave Oven",
      specs: ["Bake, grill & reheat modes", "25–30 L family capacity", "Easy-clean cavity"],
      advantages: ["Instant baking, grilling & reheating", "Saves cooking time compared to regular stove", "Healthy oil-free cooking support"]
    },
    np: {
      name: "कन्भेक्सन माइक्रोवेभ ओभन",
      specs: ["बेक, ग्रिल र रिहिट मोड", "२५–३० लिटर परिवार क्षमता", "सजिलो सफाइ"],
      advantages: ["तुरुन्तै बेक, ग्रिल र रिहिट सुविधा", "नियमित चुलोको तुलनामा समय र ऊर्जा बचत", "स्वस्वस्थ र तेल-रहित खाना पकाउन सहयोगी"]
    }
  },
  {
    id: 4,
    cat: "kitchen",
    iconName: "Droplets",
    en: {
      name: "RO + UV Water Purifier",
      specs: ["Multi-stage RO + UV purity", "Mineral retention technology", "Wall-mount installation"],
      advantages: ["100% pure & safe drinking water", "Eliminates heavy metals and bacteria", "Retains essential natural minerals"]
    },
    np: {
      name: "RO + UV वाटर प्युरिफायर",
      specs: ["मल्टि-स्टेज RO + UV शुद्धता", "मिनरल रिटेन्सन प्रविधि", "भित्ता-माउन्ट जडान"],
      advantages: ["१००% शुद्ध र सुरक्षित पिउने पानी", "हानिकारक ब्याक्टेरिया र धातुहरू हटाउने", "आवश्यक प्राकृतिक खनिजहरू कायम राख्ने"]
    }
  },
  {
    id: 6,
    cat: "heating",
    iconName: "Zap",
    en: {
      name: "Instant Electric Geyser",
      specs: ["Rapid heating element", "Rust-proof inner tank", "V-Guard authorized"],
      advantages: ["Instant hot water in seconds", "Highly energy-efficient heating coils", "Compact rust-proof layout"]
    },
    np: {
      name: "इन्स्ट्यान्ट इलेक्ट्रिक गिजर",
      specs: ["छिटो तातो हुने एलिमेन्ट", "खिया नलाग्ने भित्री ट्याङ्क", "भि-गार्ड अधिकृत"],
      advantages: ["सेकेन्डमै तुरुन्तै तातो पानी", "कम बिजुली खपत गर्ने हिटिङ एलिमेन्ट", "खिया नलाग्ने सुरक्षित डिजाइन"]
    }
  },
  {
    id: 7,
    cat: "heating",
    iconName: "Snowflake",
    en: {
      name: "Room Heater & Fan Heater",
      specs: ["Tip-over safety cut-off", "Adjustable thermostat", "Energy-efficient coils"],
      advantages: ["Rapid warmth distribution in winter rooms", "Built-in tip-over safety cut-off switch", "Lightweight and fully portable"]
    },
    np: {
      name: "रुम हिटर र फ्यान हिटर",
      specs: ["ढल्किँदा अटो बन्द हुने", "मिलाउन मिल्ने थर्मोस्ट्याट", "ऊर्जा-कुशल कोइल"],
      advantages: ["कोठामा तुरुन्तै समान रूपमा तातो फैलाउने", "ढल्किँदा आफैं बन्द हुने सुरक्षा स्विच", "हल्का र सजिलै सार्न मिल्ने"]
    }
  },
  {
    id: 8,
    cat: "heating",
    iconName: "BatteryCharging",
    en: {
      name: "Solar Panel + Backup System",
      specs: ["On-grid & off-grid setups", "Inverter + battery backup", "Free site assessment"],
      advantages: ["Uninterrupted power during load-shedding", "Reduces high grid electricity bills", "Eco-friendly clean energy source"]
    },
    np: {
      name: "सोलार प्यानल + ब्याकअप प्रणाली",
      specs: ["अन-ग्रिड र अफ-ग्रिड सेटअप", "इन्भर्टर + ब्याट्री ब्याकअप", "निःशुल्क साइट निरीक्षण"],
      advantages: ["लोडसेडिङको समयमा पनि निरन्तर बिजुली", "उच्च बिजुली महसुल घटाउने", "पर्यावरण-मैत्री स्वच्छ ऊर्जा"]
    }
  },
  {
    id: 9,
    cat: "electronics",
    iconName: "Tv",
    en: {
      name: "Smart 4K LED Television",
      specs: ["32\"–65\" screen sizes", "Built-in apps & WiFi", "1-year warranty support"],
      advantages: ["Stunning theater-like cinema visuals at home", "Built-in smart apps & WiFi connectivity", "Reduces family outdoor entertainment costs"]
    },
    np: {
      name: "स्मार्ट ४K LED टेलिभिजन",
      specs: ["३२\"–६५\" स्क्रिन आकार", "बिल्ट-इन एप्स र वाईफाई", "१ वर्ष वारेन्टी सहयोग"],
      advantages: ["घरमै हल जस्तै सिनेमाको अनुभूति", "बिल्ट-इन स्मार्ट एप्स र वाईफाई जडान", "पारिवारिक मनोरञ्जनको खर्च बचत"]
    }
  },
  {
    id: 11,
    cat: "electronics",
    iconName: "Wind",
    en: {
      name: "DishHome & FiberNet Setup",
      specs: ["TV + internet connection", "Same-day installation", "Authorized partner"],
      advantages: ["All-in-one high-speed internet & TV connection", "Same-day installation & local support", "Perfect for students & remote work"]
    },
    np: {
      name: "डिशहोम र फाइबरनेट जडान",
      specs: ["टिभी + इन्टरनेट जडान", "सोही दिन जडान", "अधिकृत साझेदार"],
      advantages: ["इन्टरनेट र टिभी जडान एकै ठाउँमा", "सोही दिन जडान र स्थानीय प्राविधिक सहयोग", "विद्यार्थी र घरबाट काम गर्नेलाई उपयुक्त"]
    }
  },
  {
    id: 12,
    cat: "electronics",
    iconName: "Zap",
    en: {
      name: "Voltage Stabilizer",
      specs: ["Protects TV, fridge & AC", "Wide voltage range", "V-Guard authorized"],
      advantages: ["Protects TV, Fridge & AC motherboard from damage", "Prevents appliance burnouts during voltage spikes", "Extends lifespan of electronics"]
    },
    np: {
      name: "भोल्टेज स्टेबिलाइजर",
      specs: ["टिभी, फ्रिज र AC सुरक्षा", "फराकिलो भोल्टेज दायरा", "भि-गार्ड अधिकृत"],
      advantages: ["टिभी, फ्रिज र AC को मदरबोर्ड सुरक्षा", "भोल्टेज तलमाथि हुँदा सामान बिग्रिन नदिने", "इलेक्ट्रोनिक्स सामानको आयु बढाउने"]
    }
  }
]

export default function Products({ isNepali, phoneNumber }: ProductsProps) {
  const [query, setQuery] = useState("")
  const [tab, setTab] = useState<"all" | Category>("all")
  const [products, setProducts] = useState<Product[]>(defaultProducts)

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data)
        }
      })
      .catch((err) => console.error("Error loading products catalog:", err))
  }, [])

  const categoriesList: { key: "all" | Category; en: string; np: string }[] = [
    { key: "all", en: "All Products", np: "सबै उत्पादनहरू" },
    { key: "kitchen", en: "Kitchen Chimneys & Hobs", np: "किचन चिम्नी र चुलो" },
    { key: "heating", en: "Heating & Solar Systems", np: "हिटिङ र सोलार प्रणाली" },
    { key: "electronics", en: "Home Electronics & TV", np: "घरायसी इलेक्ट्रोनिक्स र टिभी" }
  ]

  const filteredProducts = products.filter((p) => {
    const matchTab = tab === "all" || p.cat === tab
    const q = query.trim().toLowerCase()
    const data = isNepali ? p.np : p.en
    const matchQuery =
      q === "" ||
      data.name.toLowerCase().includes(q) ||
      data.specs.some((spec) => spec.toLowerCase().includes(q))
    return matchTab && matchQuery
  })

  const catLabels: Record<Category, { en: string; np: string }> = {
    kitchen: { en: "Kitchen", np: "किचन" },
    heating: { en: "Heating & Solar", np: "हिटिङ र सोलार" },
    electronics: { en: "Electronics", np: "इलेक्ट्रोनिक्स" }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
          {isNepali ? "उत्पादन शोकेस" : "Product Catalog"}
        </span>
        <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          {isNepali ? "हाम्रा उत्पादनहरू" : "Explore Our Products"}
        </h2>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
          {isNepali
            ? "उत्पादनको विवरण बुझ्न र अर्डरका लागि हामीलाई सिधै कल गर्नुहोस्। हामी उत्तम परामर्श दिन्छौं।"
            : "Call us directly for product queries, dimensions, and expert assistance in selecting your appliance."}
        </p>
      </div>

      {/* Search Bar */}
      <div className="mx-auto mb-6 max-w-xl">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isNepali ? "उत्पादन खोज्नुहोस्..." : "Search products..."}
            className="h-12 rounded-full pl-11 bg-card border-border"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {categoriesList.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`rounded-full border px-5 py-2 text-sm font-semibold transition-colors focus:outline-none ${
              tab === t.key
                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                : "border-border bg-card text-foreground hover:bg-muted"
            }`}
          >
            {isNepali ? t.np : t.en}
          </button>
        ))}
      </div>

      {/* Dynamic Category Benefits Banner */}
      {tab !== "all" && (
        <div className="mb-8 rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/5 via-primary/10 to-accent/5 p-6 shadow-sm animate-in fade-in slide-in-from-top-3 duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-primary">
                <Sparkles className="h-3 w-3 fill-current animate-pulse text-primary animate-float" />
                {isNepali ? "श्रेणीगत फाइदाहरू" : "Category Advantages"}
              </span>
              <h3 className="font-heading text-base font-extrabold text-foreground">
                {isNepali ? categoryBenefits[tab].np.title : categoryBenefits[tab].en.title}
              </h3>
            </div>
            <ul className="grid gap-2 sm:grid-cols-3 md:flex-1 md:justify-end">
              {(isNepali ? categoryBenefits[tab].np.items : categoryBenefits[tab].en.items).map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5 rounded-xl bg-card border border-border/80 p-3 shadow-xs">
                  <span className="text-primary font-bold mt-0.5">✓</span>
                  <span className="text-xs font-semibold text-foreground leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((p, idx) => {
            const Icon = getIconComponent(p.iconName || "")
            const data = isNepali ? p.np : p.en
            return (
              <Card
                key={p.id}
                style={{ animationDelay: `${idx * 75}ms` }}
                className="group card-shine overflow-hidden border-border p-0 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/20 hover:shadow-lg rounded-2xl animate-slide-up-fade"
              >
                <div className="relative flex h-44 items-center justify-center bg-gradient-to-br from-muted to-accent/20">
                  {p.imageUrl ? (
                    <img
                      src={p.imageUrl}
                      alt={data.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-card text-primary shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                      <Icon className="h-10 w-10" />
                    </span>
                  )}
                  <Badge className="absolute left-3 top-3 bg-card text-card-foreground shadow-sm hover:bg-card">
                    {isNepali ? catLabels[p.cat].np : catLabels[p.cat].en}
                  </Badge>
                </div>
                
                <div className="p-5 flex flex-col justify-between h-[calc(100%-11rem)] min-h-[16rem]">
                  <div>
                    <h3 className="font-heading text-lg font-bold leading-snug text-card-foreground group-hover:text-primary transition-colors">
                      {data.name}
                    </h3>
                    
                    {/* Specs / Features */}
                    <ul className="mt-4 space-y-2">
                      {data.specs.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <CircleCheckBig className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary/70" />
                          <span className="leading-relaxed font-medium">{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    render={<a href={`tel:${phoneNumber}`} />}
                    className="mt-5 w-full gap-2 rounded-full font-semibold focus:outline-none"
                  >
                    <Phone className="h-4 w-4" />
                    {isNepali ? "सोधपुछका लागि कल" : "Call to Inquire"}
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border py-16 text-center text-muted-foreground bg-card">
          {isNepali ? "कुनै उत्पादन फेला परेन। कृपया कल गर्नुहोस्।" : "No matching products found. Call us for custom availability."}
        </div>
      )}
    </div>
  )
}
