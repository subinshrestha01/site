import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const DATA_PATH = path.join(process.cwd(), "public", "data", "products.json")

// GET: Fetch all products
export async function GET() {
  try {
    if (!fs.existsSync(DATA_PATH)) {
      return NextResponse.json([])
    }
    const fileData = fs.readFileSync(DATA_PATH, "utf8")
    const products = JSON.parse(fileData)
    return NextResponse.json(products)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST: Add new product with optional image upload
export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const password = formData.get("password") as string

    if (password !== "123subash3214") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const nameEn = formData.get("nameEn") as string
    const nameNp = formData.get("nameNp") as string
    const category = formData.get("category") as string
    const iconName = (formData.get("iconName") as string) || "Tv"
    
    // Parse JSON arrays
    const specsEn = JSON.parse((formData.get("specsEn") as string) || "[]")
    const specsNp = JSON.parse((formData.get("specsNp") as string) || "[]")
    const advantagesEn = JSON.parse((formData.get("advantagesEn") as string) || "[]")
    const advantagesNp = JSON.parse((formData.get("advantagesNp") as string) || "[]")

    const imageFile = formData.get("image") as File | null
    let imageUrl = ""

    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const uploadDir = path.join(process.cwd(), "public", "imgs", "uploads")
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true })
      }

      const cleanFilename = `${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`
      const filepath = path.join(uploadDir, cleanFilename)
      fs.writeFileSync(filepath, buffer)
      imageUrl = `/imgs/uploads/${cleanFilename}`
    }

    // Read current products
    let products = []
    if (fs.existsSync(DATA_PATH)) {
      products = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"))
    }

    const nextId = products.reduce((max: number, p: any) => (p.id > max ? p.id : max), 0) + 1

    const newProduct = {
      id: nextId,
      cat: category,
      iconName: iconName,
      imageUrl: imageUrl,
      en: {
        name: nameEn,
        specs: specsEn,
        advantages: advantagesEn
      },
      np: {
        name: nameNp,
        specs: specsNp,
        advantages: advantagesNp
      }
    }

    products.push(newProduct)

    // Ensure directory exists
    const dataDir = path.dirname(DATA_PATH)
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }

    fs.writeFileSync(DATA_PATH, JSON.stringify(products, null, 2), "utf8")

    return NextResponse.json({ success: true, product: newProduct })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// DELETE: Remove product and its associated uploaded image
export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url)
    const id = parseInt(url.searchParams.get("id") || "")
    const headerPassword = request.headers.get("x-admin-password") || url.searchParams.get("password")

    if (headerPassword !== "123subash3214") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 })
    }

    if (!fs.existsSync(DATA_PATH)) {
      return NextResponse.json({ error: "No products database found" }, { status: 404 })
    }

    const fileData = fs.readFileSync(DATA_PATH, "utf8")
    let products = JSON.parse(fileData)

    const productToDelete = products.find((p: any) => p.id === id)
    if (!productToDelete) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Filter out the product
    products = products.filter((p: any) => p.id !== id)
    fs.writeFileSync(DATA_PATH, JSON.stringify(products, null, 2), "utf8")

    // Delete image from disk if it was uploaded locally
    if (productToDelete.imageUrl && productToDelete.imageUrl.startsWith("/imgs/uploads/")) {
      const imagePath = path.join(process.cwd(), "public", productToDelete.imageUrl)
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath)
      }
    }

    return NextResponse.json({ success: true, id })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
