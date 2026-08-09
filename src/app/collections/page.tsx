import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import CollectionsView from "@/components/ui/CollectionsView";

export default function Collections() {
  return (
    <div className="bg-[#F8F6F2]">
      <Nav />
      <CollectionsView activeSlug="" />
      <Footer />
    </div>
  );
}
