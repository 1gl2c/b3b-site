import { notFound } from "next/navigation";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import CollectionsView from "@/components/ui/CollectionsView";
import { collectionTabs } from "@/lib/data";

export async function generateStaticParams() {
  return collectionTabs
    .filter((t) => t.slug !== "")
    .map((t) => ({ category: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const tab = collectionTabs.find((t) => t.slug === category);
  return {
    title: tab ? `${tab.label} — B3B` : "Collection — B3B",
  };
}

export default async function CategoryCollectionPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const isValid = collectionTabs.some((t) => t.slug === category && t.slug !== "");
  if (!isValid) notFound();

  return (
    <div className="bg-[#F8F6F2]">
      <Nav />
      <CollectionsView activeSlug={category} />
      <Footer />
    </div>
  );
}
