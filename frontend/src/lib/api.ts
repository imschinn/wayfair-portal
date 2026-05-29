// ── Types ──────────────────────────────────────────────────
export interface ProductDimensions {
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  weightKg: number;
}

export interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  subCategory: string;
  price: number;
  compareAtPrice?: number;
  inventoryCount: number;
  dimensions: ProductDimensions;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  description: string;
  tags: string[];
  inStock: boolean;
  isFeatured: boolean;
  supplierId: string;
  warehouseLocation: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  search?: string;
  page?: number;
  size?: number;
  sort?: "price_asc" | "price_desc" | "rating" | "newest";
}

// ── API Client ─────────────────────────────────────────────
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api";

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...init?.headers },
    ...init,
  });
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

// ── Product API ────────────────────────────────────────────
export async function getProducts(
  filters: ProductFilters = {}
): Promise<PaginatedResponse<Product>> {
  const params = new URLSearchParams();
  if (filters.category) params.set("category", filters.category);
  if (filters.minPrice !== undefined) params.set("minPrice", String(filters.minPrice));
  if (filters.maxPrice !== undefined) params.set("maxPrice", String(filters.maxPrice));
  if (filters.inStock !== undefined) params.set("inStock", String(filters.inStock));
  if (filters.search) params.set("search", filters.search);
  if (filters.page !== undefined) params.set("page", String(filters.page));
  if (filters.size !== undefined) params.set("size", String(filters.size));
  if (filters.sort) params.set("sort", filters.sort);

  const query = params.toString();
  return apiFetch<PaginatedResponse<Product>>(`/products${query ? `?${query}` : ""}`);
}

export async function getProductById(id: number): Promise<Product> {
  return apiFetch<Product>(`/products/${id}`);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return apiFetch<Product[]>("/products/featured");
}

// ── Mock fallback data (used when backend is unavailable) ──
export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Hartwell Mid-Century Sectional Sofa",
    sku: "SOFA-HC-001-GRY",
    category: "Living Room",
    subCategory: "Sofas & Sectionals",
    price: 1299.99,
    compareAtPrice: 1599.99,
    inventoryCount: 24,
    dimensions: { lengthCm: 280, widthCm: 160, heightCm: 85, weightKg: 72 },
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    rating: 4.6,
    reviewCount: 312,
    description: "Contemporary sectional with solid walnut legs and premium performance fabric.",
    tags: ["mid-century", "sectional", "grey", "performance-fabric"],
    inStock: true,
    isFeatured: true,
    supplierId: "SUP-001",
    warehouseLocation: "WH-ATL-A3",
  },
  {
    id: 2,
    name: "Castlewood Solid Oak Dining Table",
    sku: "DTBL-OAK-180-NT",
    category: "Dining Room",
    subCategory: "Dining Tables",
    price: 849.00,
    compareAtPrice: 1050.00,
    inventoryCount: 11,
    dimensions: { lengthCm: 180, widthCm: 90, heightCm: 76, weightKg: 48 },
    imageUrl: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80",
    rating: 4.8,
    reviewCount: 178,
    description: "Handcrafted solid white oak table with natural finish. Seats 6 comfortably.",
    tags: ["solid-wood", "oak", "natural", "farmhouse"],
    inStock: true,
    isFeatured: true,
    supplierId: "SUP-002",
    warehouseLocation: "WH-CHI-B1",
  },
  {
    id: 3,
    name: "Elara Velvet King Bed Frame",
    sku: "BED-VLV-KNG-TL",
    category: "Bedroom",
    subCategory: "Bed Frames",
    price: 679.99,
    compareAtPrice: 799.99,
    inventoryCount: 36,
    dimensions: { lengthCm: 215, widthCm: 200, heightCm: 120, weightKg: 55 },
    imageUrl: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
    rating: 4.5,
    reviewCount: 234,
    description: "Upholstered king bed with deep teal velvet headboard and solid wood slats.",
    tags: ["velvet", "king", "teal", "upholstered", "platform"],
    inStock: true,
    isFeatured: false,
    supplierId: "SUP-003",
    warehouseLocation: "WH-DAL-C2",
  },
  {
    id: 4,
    name: "Cascade Pendant Light — Brass",
    sku: "LGTS-PND-BRS-M",
    category: "Lighting",
    subCategory: "Pendant Lights",
    price: 229.00,
    inventoryCount: 58,
    dimensions: { lengthCm: 35, widthCm: 35, heightCm: 45, weightKg: 2.1 },
    imageUrl: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=600&q=80",
    rating: 4.7,
    reviewCount: 89,
    description: "Handblown glass globe with brushed brass hardware. E26 socket, dimmable.",
    tags: ["brass", "glass", "dimmable", "mid-century"],
    inStock: true,
    isFeatured: false,
    supplierId: "SUP-004",
    warehouseLocation: "WH-ATL-A1",
  },
  {
    id: 5,
    name: "Marble & Acacia Wood Coffee Table",
    sku: "CTBL-MAR-ACA-WH",
    category: "Living Room",
    subCategory: "Coffee Tables",
    price: 459.00,
    compareAtPrice: 549.00,
    inventoryCount: 0,
    dimensions: { lengthCm: 120, widthCm: 65, heightCm: 42, weightKg: 26 },
    imageUrl: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600&q=80",
    rating: 4.4,
    reviewCount: 67,
    description: "White Carrara marble top with sustainably sourced acacia wood base.",
    tags: ["marble", "acacia", "luxury", "white"],
    inStock: false,
    isFeatured: false,
    supplierId: "SUP-005",
    warehouseLocation: "WH-CHI-B2",
  },
  {
    id: 6,
    name: "Nomad Moroccan Tufted Area Rug 8×10",
    sku: "RUG-MOR-810-IVY",
    category: "Rugs",
    subCategory: "Area Rugs",
    price: 389.99,
    compareAtPrice: 479.99,
    inventoryCount: 42,
    dimensions: { lengthCm: 305, widthCm: 244, heightCm: 1.5, weightKg: 14 },
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
    rating: 4.3,
    reviewCount: 145,
    description: "Hand-tufted wool blend with geometric Moroccan pattern in ivory and terracotta.",
    tags: ["moroccan", "wool", "tufted", "geometric", "8x10"],
    inStock: true,
    isFeatured: true,
    supplierId: "SUP-006",
    warehouseLocation: "WH-DAL-C3",
  },
];

// ── Extended Mock Products ─────────────────────────────────
export const EXTRA_MOCK_PRODUCTS: Product[] = [
  {
    id: 7,
    name: "Luxe Velvet Accent Chair — Forest Green",
    sku: "CHR-VLV-FG-001",
    category: "Living Room",
    subCategory: "Accent Chairs",
    price: 349.99,
    compareAtPrice: 429.99,
    inventoryCount: 18,
    dimensions: { lengthCm: 78, widthCm: 82, heightCm: 90, weightKg: 18 },
    imageUrl: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&q=80",
    rating: 4.6, reviewCount: 203,
    description: "Plush velvet accent chair with gold-finished legs. Perfect for any reading nook.",
    tags: ["velvet", "accent", "green", "gold-legs"],
    inStock: true, isFeatured: true,
    supplierId: "SUP-007", warehouseLocation: "WH-ATL-A2",
  },
  {
    id: 8,
    name: "Industrial Pipe Bookshelf — Walnut",
    sku: "SHFL-IND-WAL-5T",
    category: "Living Room",
    subCategory: "Bookshelves",
    price: 289.00,
    inventoryCount: 32,
    dimensions: { lengthCm: 100, widthCm: 30, heightCm: 180, weightKg: 24 },
    imageUrl: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=600&q=80",
    rating: 4.4, reviewCount: 156,
    description: "5-tier industrial pipe and solid walnut shelf unit. Open design for modern spaces.",
    tags: ["industrial", "walnut", "bookshelf", "open-shelf"],
    inStock: true, isFeatured: false,
    supplierId: "SUP-008", warehouseLocation: "WH-CHI-B3",
  },
  {
    id: 9,
    name: "Scandi White Dresser — 6 Drawer",
    sku: "DRSR-SCA-WHT-6D",
    category: "Bedroom",
    subCategory: "Dressers",
    price: 499.00,
    compareAtPrice: 599.00,
    inventoryCount: 14,
    dimensions: { lengthCm: 120, widthCm: 45, heightCm: 90, weightKg: 38 },
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    rating: 4.7, reviewCount: 289,
    description: "Clean-line Scandinavian dresser in matte white with brass hardware.",
    tags: ["scandi", "white", "dresser", "bedroom"],
    inStock: true, isFeatured: false,
    supplierId: "SUP-009", warehouseLocation: "WH-DAL-C1",
  },
  {
    id: 10,
    name: "Rustic Wood Dining Bench",
    sku: "BNCH-RST-NAT-150",
    category: "Dining Room",
    subCategory: "Benches",
    price: 199.99,
    compareAtPrice: 249.99,
    inventoryCount: 45,
    dimensions: { lengthCm: 150, widthCm: 35, heightCm: 46, weightKg: 15 },
    imageUrl: "https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?w=600&q=80",
    rating: 4.3, reviewCount: 112,
    description: "Solid mango wood dining bench with natural distressed finish. Seats up to 3.",
    tags: ["rustic", "wood", "bench", "dining"],
    inStock: true, isFeatured: false,
    supplierId: "SUP-010", warehouseLocation: "WH-ATL-A4",
  },
  {
    id: 11,
    name: "Floor Lamp with Fabric Shade — Ivory",
    sku: "LGTS-FLR-IVR-001",
    category: "Lighting",
    subCategory: "Floor Lamps",
    price: 159.00,
    inventoryCount: 62,
    dimensions: { lengthCm: 40, widthCm: 40, heightCm: 165, weightKg: 4.5 },
    imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80",
    rating: 4.5, reviewCount: 198,
    description: "Elegant arc floor lamp with an ivory linen shade. Creates warm ambient lighting.",
    tags: ["floor-lamp", "ivory", "linen", "arc"],
    inStock: true, isFeatured: false,
    supplierId: "SUP-011", warehouseLocation: "WH-CHI-B2",
  },
  {
    id: 12,
    name: "Bohemian Jute Round Rug 6×6",
    sku: "RUG-JUT-RND-6X6",
    category: "Rugs",
    subCategory: "Round Rugs",
    price: 149.00,
    compareAtPrice: 189.00,
    inventoryCount: 28,
    dimensions: { lengthCm: 183, widthCm: 183, heightCm: 1.2, weightKg: 8 },
    imageUrl: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=600&q=80",
    rating: 4.2, reviewCount: 87,
    description: "Hand-woven natural jute round rug with boho diamond pattern.",
    tags: ["jute", "round", "boho", "natural"],
    inStock: true, isFeatured: false,
    supplierId: "SUP-012", warehouseLocation: "WH-DAL-C4",
  },
  {
    id: 13,
    name: "Wall-Mount Floating TV Console",
    sku: "TVST-FLT-OAK-160",
    category: "Living Room",
    subCategory: "TV Stands",
    price: 379.00,
    compareAtPrice: 449.00,
    inventoryCount: 22,
    dimensions: { lengthCm: 160, widthCm: 35, heightCm: 45, weightKg: 28 },
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    rating: 4.6, reviewCount: 174,
    description: "Wall-mounted floating TV console with oak veneer and hidden cable management.",
    tags: ["tv-console", "floating", "oak", "wall-mount"],
    inStock: true, isFeatured: true,
    supplierId: "SUP-013", warehouseLocation: "WH-ATL-A5",
  },
  {
    id: 14,
    name: "Minimalist Platform Bed — Queen",
    sku: "BED-PLT-QN-BLK",
    category: "Bedroom",
    subCategory: "Bed Frames",
    price: 549.00,
    compareAtPrice: 699.00,
    inventoryCount: 0,
    dimensions: { lengthCm: 215, widthCm: 165, heightCm: 35, weightKg: 42 },
    imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80",
    rating: 4.8, reviewCount: 321,
    description: "Ultra-low platform bed in matte black steel with solid oak slats. Japanese-inspired.",
    tags: ["platform", "minimalist", "black", "japanese"],
    inStock: false, isFeatured: true,
    supplierId: "SUP-014", warehouseLocation: "WH-CHI-B4",
  },
  {
    id: 15,
    name: "Ceramic Table Lamp — Terracotta",
    sku: "LGTS-TBL-TRC-001",
    category: "Lighting",
    subCategory: "Table Lamps",
    price: 89.00,
    inventoryCount: 76,
    dimensions: { lengthCm: 22, widthCm: 22, heightCm: 50, weightKg: 1.8 },
    imageUrl: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600&q=80",
    rating: 4.4, reviewCount: 143,
    description: "Handcrafted ceramic lamp in warm terracotta glaze with a linen drum shade.",
    tags: ["ceramic", "terracotta", "table-lamp", "handcrafted"],
    inStock: true, isFeatured: false,
    supplierId: "SUP-015", warehouseLocation: "WH-DAL-C5",
  },
];

export const ALL_MOCK_PRODUCTS = [...MOCK_PRODUCTS, ...EXTRA_MOCK_PRODUCTS];
