const items = [
  "Full-grain calfskin",
  "Handcrafted construction",
  "Limited production runs",
  "35 years of experience",
  "Made in USA",
  "Imported Italian hides",
  "Free worldwide shipping",
];

export default function Marquee() {
  const doubled = [...items, ...items];

  return (
    <div className="bg-[#ede9e3] border-t border-b border-[#ddd8cf] overflow-hidden py-2.5">
      <div className="flex gap-12 whitespace-nowrap animate-marquee">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase text-[#8a7f72]">
            {item}
            <span className="w-[3px] h-[3px] bg-[#c5bdb2] rounded-full inline-block" />
          </span>
        ))}
      </div>
    </div>
  );
}
