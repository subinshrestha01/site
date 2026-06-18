"use client"

import { useEffect, useState } from "react"
import { Lock, LogOut, Plus, Trash2, Eye, ShieldCheck, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const ADMIN_PASSWORD = "123subash3214"

type Product = {
  id: number
  cat: string
  iconName: string
  imageUrl?: string
  en: { name: string; specs: string[]; advantages: string[] }
  np: { name: string; specs: string[]; advantages: string[] }
}

export default function AdminPage() {
  const [passwordInput, setPasswordInput] = useState("")
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [authError, setAuthError] = useState("")

  // Products state
  const [products, setProducts] = useState<Product[]>([])
  const [loadingProducts, setLoadingProducts] = useState(true)

  // Form states
  const [nameEn, setNameEn] = useState("")
  const [nameNp, setNameNp] = useState("")
  const [category, setCategory] = useState("kitchen")
  const [iconName, setIconName] = useState("Tv")
  const [specsEn, setSpecsEn] = useState("")
  const [specsNp, setSpecsNp] = useState("")
  const [advantagesEn, setAdvantagesEn] = useState("")
  const [advantagesNp, setAdvantagesNp] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)

  // Feedback states
  const [formSuccess, setFormSuccess] = useState("")
  const [formError, setFormError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  // Check sessionStorage for active login on mount
  useEffect(() => {
    const isLogged = sessionStorage.getItem("admin_session") === "authorized"
    if (isLogged) {
      setIsAuthorized(true)
      fetchProducts()
    }
  }, [])

  const fetchProducts = async () => {
    setLoadingProducts(true)
    try {
      const res = await fetch("/api/products")
      const data = await res.json()
      if (Array.isArray(data)) {
        setProducts(data)
      }
    } catch (err) {
      console.error("Error loading products:", err)
    } finally {
      setLoadingProducts(false)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthorized(true)
      sessionStorage.setItem("admin_session", "authorized")
      setAuthError("")
      fetchProducts()
    } else {
      setAuthError("Invalid password. Please try again.")
    }
  }

  const handleLogout = () => {
    setIsAuthorized(false)
    sessionStorage.removeItem("admin_session")
    setPasswordInput("")
  }

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setFormSuccess("")
    setFormError("")

    if (!nameEn || !nameNp) {
      setFormError("Both English and Nepali product names are required.")
      setSubmitting(false)
      return
    }

    try {
      const formData = new FormData()
      formData.append("password", ADMIN_PASSWORD)
      formData.append("nameEn", nameEn)
      formData.append("nameNp", nameNp)
      formData.append("category", category)
      formData.append("iconName", iconName)

      // Split inputs by comma and trim values
      const parsedSpecsEn = specsEn.split(",").map((s) => s.trim()).filter(Boolean)
      const parsedSpecsNp = specsNp.split(",").map((s) => s.trim()).filter(Boolean)
      const parsedAdvantagesEn = advantagesEn.split(",").map((s) => s.trim()).filter(Boolean)
      const parsedAdvantagesNp = advantagesNp.split(",").map((s) => s.trim()).filter(Boolean)

      formData.append("specsEn", JSON.stringify(parsedSpecsEn))
      formData.append("specsNp", JSON.stringify(parsedSpecsNp))
      formData.append("advantagesEn", JSON.stringify(parsedAdvantagesEn))
      formData.append("advantagesNp", JSON.stringify(parsedAdvantagesNp))

      if (imageFile) {
        formData.append("image", imageFile)
      }

      const res = await fetch("/api/products", {
        method: "POST",
        body: formData
      })

      const result = await res.json()

      if (res.ok && result.success) {
        setFormSuccess("Product added successfully!")
        // Clear form
        setNameEn("")
        setNameNp("")
        setSpecsEn("")
        setSpecsNp("")
        setAdvantagesEn("")
        setAdvantagesNp("")
        setImageFile(null)
        // Reset file input
        const fileInput = document.getElementById("imageFileInput") as HTMLInputElement | null
        if (fileInput) fileInput.value = ""
        
        fetchProducts() // Refresh catalog list
      } else {
        setFormError(result.error || "Failed to add product.")
      }
    } catch (err: any) {
      setFormError(err.message || "An unexpected error occurred.")
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteProduct = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product? This will remove its image and specifications permanently.")) {
      return
    }

    try {
      const res = await fetch(`/api/products?id=${id}&password=${ADMIN_PASSWORD}`, {
        method: "DELETE",
        headers: {
          "x-admin-password": ADMIN_PASSWORD
        }
      })
      const result = await res.json()

      if (res.ok && result.success) {
        fetchProducts()
      } else {
        alert(result.error || "Failed to delete product.")
      }
    } catch (err: any) {
      alert(err.message || "An error occurred during deletion.")
    }
  }

  if (!isAuthorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <Card className="w-full max-w-md border-border bg-card p-8 shadow-2xl rounded-3xl">
          <div className="flex flex-col items-center text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
              <Lock className="h-6 w-6" />
            </span>
            <h2 className="font-heading text-2xl font-extrabold text-foreground">
              New Good Choice Portal
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Authorized personnel only. Please unlock the dashboard.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div>
              <Input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password..."
                className="h-12 rounded-xl bg-card border-border pr-10 focus:ring-primary text-center tracking-widest font-bold"
              />
            </div>
            {authError && (
              <p className="text-xs font-semibold text-destructive text-center">
                {authError}
              </p>
            )}
            <Button
              type="submit"
              className="w-full h-12 rounded-xl font-bold bg-primary text-primary-foreground transition-all hover:scale-[1.02]"
            >
              Unlock Dashboard
            </Button>
          </form>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Top Bar */}
      <header className="border-b border-border/80 bg-card/65 backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <ShieldCheck className="h-5.5 w-5.5" />
            </span>
            <div>
              <h1 className="font-heading text-base font-extrabold leading-tight text-foreground">
                Good Choice Admin Portal
              </h1>
              <p className="text-[10px] font-semibold text-muted-foreground">
                Product Catalog Management
              </p>
            </div>
          </div>

          <Button
            onClick={handleLogout}
            variant="outline"
            className="rounded-xl gap-2 font-bold text-xs bg-card border-border hover:bg-muted focus:outline-none"
          >
            <LogOut className="h-3.5 w-3.5" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content Dashboard */}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 grid gap-8 lg:grid-cols-12">
        {/* Left Column: Form */}
        <section className="lg:col-span-5 space-y-6">
          <Card className="border-border bg-card/60 p-6 rounded-3xl shadow-sm">
            <h2 className="font-heading text-lg font-bold text-foreground flex items-center gap-2 mb-5">
              <Plus className="h-5 w-5 text-primary" />
              Add New Product
            </h2>

            <form onSubmit={handleAddProduct} className="space-y-4 text-xs font-semibold text-foreground">
              {/* Product Names */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-muted-foreground mb-1">English Name *</label>
                  <Input
                    required
                    value={nameEn}
                    onChange={(e) => setNameEn(e.target.value)}
                    placeholder="e.g. Smart LED TV"
                    className="rounded-xl bg-card border-border"
                  />
                </div>
                <div>
                  <label className="block text-muted-foreground mb-1">Nepali Name *</label>
                  <Input
                    required
                    value={nameNp}
                    onChange={(e) => setNameNp(e.target.value)}
                    placeholder="उदा. स्मार्ट एलइडी टिभी"
                    className="rounded-xl bg-card border-border"
                  />
                </div>
              </div>

              {/* Category & Icon Select */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-muted-foreground mb-1 font-semibold">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="kitchen">Kitchen Chimney & Cooktops</option>
                    <option value="heating">Heating & Solar Systems</option>
                    <option value="electronics">Home Electronics & TVs</option>
                  </select>
                </div>
                <div>
                  <label className="block text-muted-foreground mb-1 font-semibold">Fallback Icon (if no image)</label>
                  <select
                    value={iconName}
                    onChange={(e) => setIconName(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="Tv">TV Icon</option>
                    <option value="Flame">Flame/Gas Icon</option>
                    <option value="CookingPot">Pot/Kitchen Icon</option>
                    <option value="Microwave">Oven Icon</option>
                    <option value="Droplets">Water Purifier Icon</option>
                    <option value="Zap">Stabilizer/Electricity Icon</option>
                    <option value="Snowflake">Heater/AC Icon</option>
                    <option value="BatteryCharging">Backup/Battery Icon</option>
                    <option value="Sun">Solar/Sun Icon</option>
                    <option value="Wind">DishHome/Router Icon</option>
                  </select>
                </div>
              </div>

              {/* Specs comma-separated */}
              <div>
                <label className="block text-muted-foreground mb-1">Specifications (English) - comma separated</label>
                <textarea
                  value={specsEn}
                  onChange={(e) => setSpecsEn(e.target.value)}
                  placeholder="e.g. 1-year warranty, Auto-clean, Touch panel"
                  className="w-full p-3 h-16 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                />
              </div>
              <div>
                <label className="block text-muted-foreground mb-1">Specifications (Nepali) - comma separated</label>
                <textarea
                  value={specsNp}
                  onChange={(e) => setSpecsNp(e.target.value)}
                  placeholder="उदा. १ वर्ष वारेन्टी, अटो-क्लिन, टच प्यानल"
                  className="w-full p-3 h-16 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                />
              </div>

              {/* Advantages comma-separated */}
              <div>
                <label className="block text-muted-foreground mb-1">Advantages (English) - comma separated</label>
                <textarea
                  value={advantagesEn}
                  onChange={(e) => setAdvantagesEn(e.target.value)}
                  placeholder="e.g. Saves energy, Scratch resistant glass"
                  className="w-full p-3 h-16 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                />
              </div>
              <div>
                <label className="block text-muted-foreground mb-1">Advantages (Nepali) - comma separated</label>
                <textarea
                  value={advantagesNp}
                  onChange={(e) => setAdvantagesNp(e.target.value)}
                  placeholder="उदा. बिजुली बचत गर्ने, फुट्न नसक्ने ग्लास"
                  className="w-full p-3 h-16 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-muted-foreground mb-1">Upload Product Image (Recommended)</label>
                <Input
                  id="imageFileInput"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setImageFile(e.target.files[0])
                    }
                  }}
                  className="rounded-xl bg-card border-border file:font-semibold file:text-xs file:bg-muted file:border-0 file:rounded-md file:px-3 file:py-1 file:cursor-pointer"
                />
              </div>

              {/* Action Banner Message */}
              {formError && (
                <div className="p-3 rounded-xl border border-destructive/20 bg-destructive/10 text-destructive text-[11px]">
                  {formError}
                </div>
              )}
              {formSuccess && (
                <div className="p-3 rounded-xl border border-primary/20 bg-primary/10 text-primary text-[11px]">
                  {formSuccess}
                </div>
              )}

              <Button
                type="submit"
                disabled={submitting}
                className="w-full h-11 rounded-xl font-bold bg-primary text-primary-foreground focus:outline-none"
              >
                {submitting ? "Adding Product..." : "Save Product"}
              </Button>
            </form>
          </Card>
        </section>

        {/* Right Column: List of items */}
        <section className="lg:col-span-7 space-y-6">
          <Card className="border-border bg-card/60 p-6 rounded-3xl shadow-sm h-full min-h-[30rem]">
            <div className="flex items-center justify-between border-b border-border/60 pb-4 mb-4">
              <h2 className="font-heading text-lg font-bold text-foreground flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" />
                Catalog Products ({products.length})
              </h2>
              <Button
                onClick={fetchProducts}
                variant="outline"
                className="rounded-xl px-4 py-1 text-xs font-bold bg-card border-border hover:bg-muted focus:outline-none"
              >
                Refresh
              </Button>
            </div>

            {loadingProducts ? (
              <div className="py-20 text-center text-xs text-muted-foreground">
                Loading database catalog...
              </div>
            ) : products.length > 0 ? (
              <div className="space-y-3 max-h-[36rem] overflow-y-auto pr-1">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-4 rounded-2xl border border-border bg-card shadow-xs transition-all hover:border-primary/10"
                  >
                    <div className="flex items-center gap-4">
                      {/* Thumbnail or fallback placeholder */}
                      <div className="h-12 w-12 rounded-xl bg-muted overflow-hidden flex items-center justify-center shrink-0 border border-border">
                        {p.imageUrl ? (
                          <img src={p.imageUrl} alt={p.en.name} className="h-full w-full object-cover" />
                        ) : (
                          <span className="text-primary text-xs font-bold uppercase">{p.iconName.slice(0, 2)}</span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-heading text-sm font-bold text-card-foreground leading-tight">
                          {p.en.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1.5">
                          <Badge variant="outline" className="text-[9px] px-2 py-0 border-border/80 text-muted-foreground uppercase">
                            {p.cat}
                          </Badge>
                          <span className="text-[10px] text-muted-foreground font-semibold">
                            {p.np.name}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteProduct(p.id)}
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive hover:text-destructive-foreground hover:border-transparent transition-all"
                      aria-label={`Delete ${p.en.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center text-xs text-muted-foreground border border-dashed border-border rounded-2xl bg-card">
                No products found. Add products on the left panel.
              </div>
            )}
          </Card>
        </section>
      </main>
    </div>
  )
}
