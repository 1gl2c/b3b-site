// TODO: confirm shipping policy before launch — "Free worldwide shipping" claim below
const items = [
  "Full-grain calfskin",
  "Handcrafted construction",
  "Limited production runs",
  "35 years of experience",
  "Made in USA",
  "Imported Italian hides",
  "Free worldwide shipping",
];

export default function Marquee({ dark = false }: { dark?: boolean }) {
  const doubled = [...items, ...items];

  const wrapperClass = dark
    ? "bg-[#111] border-t border-b border-[#1e1e1e] overflow-hidden py-2.5"
    : "bg-[#ede9e3] border-t border-b border-[#ddd8cf] overflow-hidden py-2.5";

  const textClass = dark
    ? "flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase text-[#5a5a5a]"
    : "flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase text-[#8a7f72]";

  const dotClass = dark
    ? "w-[3px] h-[3px] bg-[#2a2a2a] rounded-full inline-block"
    : "w-[3px] h-[3px] bg-[#c5bdb2] rounded-full inline-block";

  return (
    <div className={wrapperClass}>
      <div className="flex gap-12 whitespace-nowrap animate-marquee">
        {doubled.map((item, i) => (
          <span key={i} className={textClass}>
            {item}
            <span className={dotClass} />
          </span>
        ))}
      </div>
    </div>
  );
}
