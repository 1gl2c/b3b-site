import { notFound } from "next/navigation";
import MobileCollectionsView from "@/components/mobile/MobileCollectionsView";
import { collectionTabs } from "@/lib/data";

export function generateStaticParams() {
  return collectionTabs.filter((t) => t.slug !== "").map((t) => ({ category: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const tab = collectionTabs.find((t) => t.slug === category);
  return { title: tab ? `${tab.label} — B3B` : "Collection — B3B" };
}

export default async function MobileCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const isValid = collectionTabs.some((t) => t.slug === category && t.slug !== "");
  if (!isValid) notFound();

  return <MobileCollectionsView activeSlug={category} />;
}
