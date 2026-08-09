export function formatPrice(price: number | null): string {
  return price != null ? `$${price.toLocaleString("en-US", { maximumFractionDigits: 0 })}` : "";
}
