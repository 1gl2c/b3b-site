import { notFound } from "next/navigation";
import Nav from "@/components/layout/Nav";
import PDPPageClient from "@/components/ui/PDPPageClient";
import { products } from "@/data/products";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  return {
    title: `${product?.name ?? "Product"} — B3B`,
    description: product?.description?.slice(0, 155) ?? "",
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <Nav />
      <PDPPageClient product={product} related={related} />
    </>
  );
}
