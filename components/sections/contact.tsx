"use client"

import { useState } from "react"
import { MapPin, Phone, Mail, ChevronDown, ChevronUp, ShieldCheck, Users } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type ContactProps = {
  isNepali: boolean
  phoneNumberMain: string
  phoneNumberSub: string
  email: string
  fbUrl: string
  mapEmbedUrl: string
  mapLinkUrl: string
}

export default function Contact({
  isNepali,
  phoneNumberMain,
  phoneNumberSub,
  email,
  fbUrl,
  mapEmbedUrl,
  mapLinkUrl
}: ContactProps) {
  
  // FAQs Accordion states
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const leaders = [
    {
      icon: ShieldCheck,
      name: "Dan Bahadur Shrestha",
      roleEn: "Proprietor",
      roleNp: "प्रोप्राइटर",
      phone: phoneNumberMain
    },
    {
      icon: Users,
      name: "Subash Shrestha",
      roleEn: "Manager",
      roleNp: "प्रबन्धक",
      phone: phoneNumberSub
    }
  ]



  const faqs = [
    {
      qEn: "Where is New Good Choice Electronic Center located?",
      qNp: "न्यू गुड च्वाइस इलेक्ट्रोनिक सेन्टर कहाँ अवस्थित छ?",
      aEn: "Our showroom and repair hub is conveniently located at Thankot, Kathmandu, Nepal, serving the surrounding highway sectors and nearby Kathmandu locations.",
      aNp: "हाम्रो शोरूम र मर्मत केन्द्र थानकोट, काठमाडौँ, नेपालमा अवस्थित छ। हामी राजमार्ग क्षेत्र र काठमाडौँका आसपासका स्थानहरूमा सेवा दिन्छौं।"
    },
    {
      qEn: "Do you provide home service all over Kathmandu?",
      qNp: "के तपाईं काठमाडौँभरि घरमै आएर सेवा दिनुहुन्छ?",
      aEn: "Yes! We provide on-site repair, appliance installation, and solar/chimney cleaning visits in Thankot, Kalanki, Sitapaila, Gurjudhara, and across Kathmandu Valley.",
      aNp: "हो! हामी थानकोट, कलङ्की, सितापाइला, गुर्जुधारा लगायत काठमाडौँ उपत्यकाभरि घरमै आएर मर्मत, जडान र सफाइ सेवा दिन्छौं।"
    },
    {
      qEn: "Is there a warranty support on appliance repairs?",
      qNp: "के मर्मत गरिएका उपकरणहरूमा वारेन्टी हुन्छ?",
      aEn: "Yes. All repairs completed using our genuine manufacturer spare parts include a limited service warranty to ensure reliability and peace of mind.",
      aNp: "हो। हाम्रा सक्कली स्पेयर पार्ट्स प्रयोग गरेर गरिएका सबै मर्मतहरूमा सेवा वारेन्टी समावेश हुन्छ, जसले ढुक्क बनाउँछ।"
    },
    {
      qEn: "How can I book a technician visit?",
      qNp: "म कसरी प्राविधिकको घरदैलो सेवा बुक गर्न सक्छु?",
      aEn: "Simply tap the 'Book Service' button or message us via WhatsApp with your phone and requirement. You can also call us directly for emergency technician dispatches.",
      aNp: "सजिलै 'बुक गर्नुहोस्' बटन थिच्नुहोस् वा ह्वाट्सएप मार्फत विवरण पठाउनुहोस्। आपतकालीन सेवाको लागि हामीलाई सिधै फोन पनि गर्न सक्नुहुन्छ।"
    }
  ]



  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
          {isNepali ? "बारेमा र सम्पर्क" : "About & Contact"}
        </span>
        <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          {isNepali ? "हामीलाई चिन्नुहोस्" : "Get to Know Us"}
        </h2>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
          {isNepali
            ? "वि.सं. २०६९ देखि थानकोटमा भरपर्दो र गुणस्तरीय सेवा प्रदान गर्दै आएका छौं।"
            : "Serving Kathmandu with trust, genuine parts, and quality repair service since 2069 B.S. (2012 A.D.)."}
        </p>
      </div>

      {/* Leadership / Team Cards */}
      <div className="mb-12 grid gap-6 sm:grid-cols-2">
        {leaders.map((l) => {
          const Icon = l.icon
          return (
            <Card key={l.name} className="flex items-center gap-5 border-border bg-card/65 p-6 rounded-2xl">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="h-8 w-8" />
              </span>
              <div className="min-w-0">
                <h3 className="font-heading text-lg font-bold text-card-foreground">{l.name}</h3>
                <p className="text-sm text-primary font-semibold">{isNepali ? l.roleNp : l.roleEn}</p>
                <a
                  href={`tel:${l.phone}`}
                  className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="h-3.5 w-3.5" />
                  {l.phone}
                </a>
              </div>
            </Card>
          )
        })}
      </div>


      <div className="grid gap-6 lg:grid-cols-2 items-start">
        {/* Map Embed Card */}
        <Card className="overflow-hidden border-border bg-card/60 p-0 rounded-3xl shadow-sm h-full min-h-[26rem] flex flex-col justify-between">
          <iframe
            title="New Good Choice Electronic Center location map"
            src={mapEmbedUrl}
            className="h-80 w-full border-0 lg:h-full lg:flex-1"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="p-4 border-t border-border bg-card">
            <Button
              render={<a href={mapLinkUrl} target="_blank" rel="noopener noreferrer" />}
              variant="outline"
              className="w-full gap-2 rounded-xl bg-transparent border-border focus:outline-none"
            >
              <MapPin className="h-4 w-4 text-primary" />
              {isNepali ? "गुगल म्यापमा खोल्नुहोस्" : "Open in Google Maps"}
            </Button>
          </div>
        </Card>

        {/* Contact Info and FAQs Accordion */}
        <div className="flex flex-col gap-6">
          <Card className="border-border bg-card/65 p-6 rounded-3xl shadow-sm">
            <h3 className="font-heading text-lg font-bold text-card-foreground">
              {isNepali ? "सम्पर्क विवरणहरू" : "Official Channels"}
            </h3>
            <ul className="mt-4 space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-muted-foreground">
                  {isNepali ? "थानकोट, काठमाडौँ, नेपाल" : "Thankot, Kathmandu, Nepal"}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <a href={`tel:${phoneNumberMain}`} className="text-muted-foreground hover:text-foreground transition-colors">
                  {phoneNumberMain}
                </a>
                <span className="text-border">|</span>
                <a href={`tel:${phoneNumberSub}`} className="text-muted-foreground hover:text-foreground transition-colors">
                  {phoneNumberSub}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a href={`mailto:${email}`} className="break-all text-muted-foreground hover:text-foreground transition-colors">
                  {email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
                <a
                  href={fbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {isNepali ? "हाम्रो फेसबुक पेज" : "Official Facebook Page"}
                </a>
              </li>
            </ul>
          </Card>

          {/* Interactive FAQ Accordion */}
          <Card className="border-border bg-card/65 p-6 rounded-3xl shadow-sm">
            <h3 className="font-heading text-lg font-bold text-card-foreground mb-4">
              {isNepali ? "प्रायः सोधिने प्रश्नहरू" : "Frequently Asked Questions"}
            </h3>
            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx
                return (
                  <div key={idx} className="border-b border-border/60 pb-3">
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="flex w-full items-center justify-between text-left text-sm font-bold text-foreground py-2 focus:outline-none"
                    >
                      <span>{isNepali ? faq.qNp : faq.qEn}</span>
                      {isOpen ? <ChevronUp className="h-4 w-4 text-primary shrink-0" /> : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
                    </button>
                    {isOpen && (
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground animate-in fade-in slide-in-from-top-1 duration-200">
                        {isNepali ? faq.aNp : faq.aEn}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </Card>
        </div>
      </div>

    </div>
  )
}
