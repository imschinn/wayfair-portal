import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/catalog/ProductGrid";

interface CatalogPageProps {
  searchParams: Promise<{ category?: string }>;
}

export async function generateMetadata({ searchParams }: CatalogPageProps): Promise<Metadata> {
  const params = await searchParams;
  const category = params.category;
  return {
    title: category ? `${category} | Product Catalog` : "Product Catalog",
    description: `Browse our ${category ?? "full"} catalog of premium home furnishings and décor.`,
  };
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const params = await searchParams;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[--color-surface]">
        <ProductGrid initialCategory={params.category} />
      </main>
      <Footer />
    </>
  );
}
