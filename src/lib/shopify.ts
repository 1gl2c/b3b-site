const DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!;
const API_URL = `https://${DOMAIN}/api/2024-01/graphql.json`;

async function shopifyFetch(query: string, variables?: Record<string, unknown>) {
  if (!TOKEN || TOKEN === "YOUR_STOREFRONT_TOKEN_HERE") return null;
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  return json.data;
}

export interface CartLineItem {
  merchandiseId: string; // Shopify variant GID e.g. "gid://shopify/ProductVariant/123"
  quantity: number;
}

const CREATE_CART = `
  mutation cartCreate($input: CartInput) {
    cartCreate(input: $input) {
      cart { checkoutUrl id }
      userErrors { field message }
    }
  }
`;

export async function createShopifyCheckout(lines: CartLineItem[]): Promise<string | null> {
  const data = await shopifyFetch(CREATE_CART, { input: { lines } });
  return data?.cartCreate?.cart?.checkoutUrl ?? null;
}

// Fallback: direct-to-store URL when Shopify API isn't configured yet
export function buildFallbackCheckoutUrl(items: { shopifyVariantId?: string; quantity: number }[]): string {
  const configured = items.filter((i) => i.shopifyVariantId);
  if (configured.length === 0) {
    return `https://${DOMAIN || "bos3bags.myshopify.com"}`;
  }
  const path = configured.map((i) => `${i.shopifyVariantId}:${i.quantity}`).join(",");
  return `https://${DOMAIN || "bos3bags.myshopify.com"}/cart/${path}`;
}
