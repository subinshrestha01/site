"use client"

import { useEffect, useState } from "react"
import { X, MessageCircle, Phone, ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type BookingDrawerProps = {
  isOpen: boolean
  onClose: () => void
  isNepali: boolean
  selectedService: string
  setSelectedService: (s: string) => void
  servicesList: { id: number; enName: string; npName: string }[]
  whatsappNumber: string
  phoneNumber: string
}

// Smart substring comparison function to match service cards to select options seamlessly
function isServiceMatch(optionEn: string, optionNp: string, selected: string): boolean {
  if (!selected) return false;

  const clean = (str: string) => {
    return str
      .toLowerCase()
      .replace(/[&|()+\-,;]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  const selClean = clean(selected);
  const optEnClean = clean(optionEn);
  const optNpClean = clean(optionNp);

  // 1. Direct exact or substring matches
  if (selClean === optEnClean || selClean === optNpClean) return true;
  if (selClean.includes(optEnClean) || optEnClean.includes(selClean)) return true;
  if (selClean.includes(optNpClean) || optNpClean.includes(selClean)) return true;

  // 2. Word overlap for more complex matches (e.g. Solar & Water Heater vs Solar Water Heater Cleaning)
  const getWords = (str: string) => {
    return str.split(" ").filter(w => w.length > 2 && w !== "and" && w !== "service" && w !== "services");
  };

  const selWords = getWords(selClean);
  const optEnWords = getWords(optEnClean);
  const optNpWords = getWords(optNpClean);

  if (selWords.length > 0) {
    const enOverlap = optEnWords.filter(w => selWords.includes(w));
    if (enOverlap.length >= 2 || (optEnWords.length === 1 && enOverlap.length === 1)) {
      return true;
    }
    const npOverlap = optNpWords.filter(w => selWords.includes(w));
    if (npOverlap.length >= 2 || (optNpWords.length === 1 && npOverlap.length === 1)) {
      return true;
    }
  }

  // 3. Key terms fallback
  const keyTerms = [
    { keys: ["chimney", "चिम्नी"], optionId: 1 },
    { keys: ["solar", "heater", "सोलार", "गिजर"], optionId: 2 },
    { keys: ["tv", "laptop", "टिभी", "ल्यापटप"], optionId: 3 },
    { keys: ["fitting", "appliances", "जडान"], optionId: 4 },
    { keys: ["visit", "technician", "प्राविधिक", "घरमै"], optionId: 5 },
    { keys: ["parts", "spare", "स्पेयर"], optionId: 6 }
  ];

  for (const term of keyTerms) {
    const optionMatches = optEnClean.includes(term.keys[0]) || optNpClean.includes(term.keys[2] || "");
    const selectedMatches = term.keys.some(k => selClean.includes(k));
    if (optionMatches && selectedMatches) {
      return true;
    }
  }

  return false;
}

export default function BookingDrawer({
  isOpen,
  onClose,
  isNepali,
  selectedService,
  setSelectedService,
  servicesList,
  whatsappNumber,
  phoneNumber
}: BookingDrawerProps) {
  const [step, setStep] = useState(1)
  const [phoneInput, setPhoneInput] = useState("")
  const [nameInput, setNameInput] = useState("")
  const [addressInput, setAddressInput] = useState("")

  // Reset steps when opening
  useEffect(() => {
    if (isOpen) {
      setStep(1)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  const formatNepaliPhone = (value: string) => {
    const digits = value.replace(/\D/g, "")
    if (digits.length <= 3) return digits
    return `${digits.slice(0, 3)}-${digits.slice(3, 10)}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNepaliPhone(e.target.value)
    setPhoneInput(formatted)
  }

  const isPhoneValid = (phone: string) => {
    const digits = phone.replace(/\D/g, "")
    return digits.length === 10 && (digits.startsWith("98") || digits.startsWith("97"))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isPhoneValid(phoneInput)) return

    const msg = isNepali
      ? `नमस्ते Good Choice, म काठमाडौँ (KTM) बाट सेवा बुकिङ गर्न चाहन्छु।\n\n• नाम: ${nameInput || "उल्लेख नगरिएको"}\n• सेवा: ${selectedService}\n• फोन: ${phoneInput}\n• ठेगाना: ${addressInput || "काठमाडौँ"}`
      : `Hello Good Choice, I would like to book a service in Kathmandu (KTM).\n\n• Name: ${nameInput || "Not specified"}\n• Service: ${selectedService}\n• Phone: ${phoneInput}\n• Address: ${addressInput || "Kathmandu"}`

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`
    window.open(url, "_blank")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
      />

      {/* Drawer Content */}
      <div
        className="relative z-10 w-full max-w-lg rounded-t-3xl border border-border bg-card p-6 shadow-2xl animate-in slide-in-from-bottom-1/2 duration-300 md:rounded-3xl md:animate-in md:zoom-in-95 max-h-[85dvh] overflow-y-auto"
      >
        {/* Drag handle decoration for mobile */}
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-muted-foreground/30 md:hidden" />

        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <h3 className="font-heading text-lg font-bold text-card-foreground">
              {isNepali ? "छिटो बुकिङ विजार्ड (KTM)" : "Quick Booking Wizard (KTM)"}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {isNepali ? `चरण ${step}/३: ` : `Step ${step}/3: `}
              {step === 1 && (isNepali ? "सेवा चयन गर्नुहोस्" : "Select requested service")}
              {step === 2 && (isNepali ? "सम्पर्क विवरण हाल्नुहोस्" : "Enter your contact details")}
              {step === 3 && (isNepali ? "विवरण रुजु गर्नुहोस्" : "Review and send request")}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground transition-all hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Wizard Stepper Progress Bar */}
        <div className="mt-4 flex gap-1 h-1 w-full bg-border rounded-full overflow-hidden">
          <div className={`h-full bg-primary transition-all duration-300 ${step === 1 ? "w-1/3" : step === 2 ? "w-2/3" : "w-full"}`} />
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Step 1: Select Service */}
          {step === 1 && (
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              <label className="block text-xs font-bold text-muted-foreground mb-2">
                {isNepali ? "कुन सेवा चाहिन्छ? (तलको सूचीबाट छनौट गर्नुहोस्):" : "Choose the service you need:"}
              </label>
              {servicesList.map((s) => {
                const serviceVal = isNepali ? s.npName : s.enName
                const isSelected = isServiceMatch(s.enName, s.npName, selectedService)
                return (
                  <button
                    type="button"
                    key={s.id}
                    onClick={() => setSelectedService(serviceVal)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                      isSelected
                        ? "border-primary bg-primary/5 text-primary shadow-xs"
                        : "border-border bg-card text-foreground hover:bg-muted"
                    }`}
                  >
                    <span>{isNepali ? s.npName : s.enName}</span>
                    {isSelected && <span className="text-primary text-sm">✓</span>}
                  </button>
                )
              })}
            </div>
          )}

          {/* Step 2: Contact Details */}
          {step === 2 && (
            <div className="space-y-4">
              {/* Customer Name */}
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  {isNepali ? "तपाईंको नाम (वैकल्पिक)" : "Your Name (Optional)"}
                </label>
                <Input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder={isNepali ? "नाम हाल्नुहोस्" : "Enter your name"}
                  className="rounded-xl bg-card border-border focus:ring-primary"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  {isNepali ? "सम्पर्क फोन नम्बर (९७/९८ बाट सुरु हुने १० अंक)" : "Your Phone Number (10-digit starting with 98 or 97)"}
                </label>
                <Input
                  type="tel"
                  required
                  value={phoneInput}
                  onChange={handlePhoneChange}
                  placeholder={isNepali ? "९८X-XXXXXXX" : "98X-XXXXXXX"}
                  className="rounded-xl bg-card border-border focus:ring-primary font-bold"
                />
                {phoneInput.replace(/\D/g, "").length > 0 && !isPhoneValid(phoneInput) && (
                  <p className="text-[10px] text-destructive font-bold mt-1">
                    {isNepali ? "⚠ कृपया मान्य १० अंकको नेपाली नम्बर हाल्नुहोस्।" : "⚠ Please enter a valid 10-digit Nepali mobile number."}
                  </p>
                )}
              </div>

              {/* Address / Location */}
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  {isNepali ? "काठमाडौँ ठेगाना / टोल (वैकल्पिक)" : "Kathmandu Area / Address (Optional)"}
                </label>
                <Input
                  type="text"
                  value={addressInput}
                  onChange={(e) => setAddressInput(e.target.value)}
                  placeholder={isNepali ? "जस्तै: कलङ्की, थानकोट..." : "e.g., Kalanki, Thankot..."}
                  className="rounded-xl bg-card border-border focus:ring-primary"
                />
              </div>
            </div>
          )}

          {/* Step 3: Review Details */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-border bg-muted/40 p-4 space-y-3 text-xs">
                <div className="flex justify-between border-b border-border/40 pb-2">
                  <span className="text-muted-foreground font-semibold">{isNepali ? "चयन गरिएको सेवा:" : "Requested Service:"}</span>
                  <span className="font-extrabold text-foreground">{selectedService}</span>
                </div>
                <div className="flex justify-between border-b border-border/40 pb-2">
                  <span className="text-muted-foreground font-semibold">{isNepali ? "तपाईंको नाम:" : "Customer Name:"}</span>
                  <span className="font-extrabold text-foreground">{nameInput || (isNepali ? "उल्लेख नगरिएको" : "Not Specified")}</span>
                </div>
                <div className="flex justify-between border-b border-border/40 pb-2">
                  <span className="text-muted-foreground font-semibold">{isNepali ? "फोन नम्बर:" : "Phone Number:"}</span>
                  <span className="font-extrabold text-foreground">{phoneInput}</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-muted-foreground font-semibold">{isNepali ? "ठेगाना (काठमाडौँ):" : "Address Area:"}</span>
                  <span className="font-extrabold text-foreground">{addressInput || (isNepali ? "काठमाडौँ" : "Kathmandu")}</span>
                </div>
              </div>

              <div className="bg-primary/5 rounded-2xl border border-primary/20 p-3 text-[10px] text-primary font-bold text-center">
                💬 {isNepali ? "बुकिङ निश्चित गर्दा ह्वाट्सएप एपमा म्यासेज पठाइनेछ।" : "Proceeding will direct you to WhatsApp to send this booking details."}
              </div>
            </div>
          )}

          {/* Actions Footer */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            {/* Step 1 buttons */}
            {step === 1 && (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => window.open(`tel:${phoneNumber}`)}
                  className="w-full gap-2 rounded-xl font-semibold border-border hover:bg-muted"
                >
                  <Phone className="h-4 w-4" />
                  {isNepali ? "सिधै कल" : "Direct Call"}
                </Button>
                <Button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full gap-2 rounded-xl font-bold bg-primary text-primary-foreground shadow-xs"
                >
                  {isNepali ? "अर्को चरण" : "Next Step"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </>
            )}

            {/* Step 2 buttons */}
            {step === 2 && (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="w-full gap-2 rounded-xl font-semibold border-border hover:bg-muted"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {isNepali ? "पछाडि" : "Back"}
                </Button>
                <Button
                  type="button"
                  disabled={!isPhoneValid(phoneInput)}
                  onClick={() => setStep(3)}
                  className="w-full gap-2 rounded-xl font-bold bg-primary text-primary-foreground shadow-xs disabled:opacity-50"
                >
                  {isNepali ? "अर्को चरण" : "Next Step"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </>
            )}

            {/* Step 3 buttons */}
            {step === 3 && (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="w-full gap-2 rounded-xl font-semibold border-border hover:bg-muted"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {isNepali ? "पछाडि" : "Back"}
                </Button>
                <Button
                  type="submit"
                  className="w-full gap-2 rounded-xl font-bold bg-primary text-primary-foreground shadow-xs"
                >
                  <MessageCircle className="h-4 w-4 fill-current" />
                  {isNepali ? "बुकिङ पठाउनुहोस्" : "Confirm & Send"}
                </Button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
