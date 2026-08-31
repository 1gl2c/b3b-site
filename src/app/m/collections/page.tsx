import type { Metadata } from "next";
import MobileCollectionsView from "@/components/mobile/MobileCollectionsView";

export const metadata: Metadata = {
  title: "The Collection — B3B",
};

export default function MobileCollectionsRoot() {
  return <MobileCollectionsView activeSlug="" />;
}
