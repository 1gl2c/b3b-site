const DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!;
const API_URL = `https://${DOMAIN}/api/2024-01/graphql.json`;

async function shopifyFetch(query: string, variables?: Record<string, unknown>) {
  if (!TOKEN || TOKEN === "YOUR_STOREFRONT_TOKEN_HERE") {
    throw new Error("Shopify Storefront API token is not configured.");
  }
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (!res.ok || json.errors) {
    throw new Error(JSON.stringify(json.errors ?? { status: res.status, statusText: res.statusText }));
  }
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

export async function createShopifyCheckout(lines: CartLineItem[]): Promise<string> {
  const data = await shopifyFetch(CREATE_CART, { input: { lines } });
  const userErrors = data?.cartCreate?.userErrors;
  if (userErrors && userErrors.length > 0) {
    throw new Error(JSON.stringify(userErrors));
  }
  const checkoutUrl = data?.cartCreate?.cart?.checkoutUrl;
  if (!checkoutUrl) {
    throw new Error("Shopify did not return a checkout URL.");
  }
  return checkoutUrl;
}

// Fallback: direct-to-store URL when Shopify API isn't configured yet
// Shopify cart URL needs numeric variant ID, not the full GID
function extractVariantId(gid: string): string {
  return gid.split("/").pop() ?? gid;
}

export function buildFallbackCheckoutUrl(items: { shopifyVariantId?: string; quantity: number }[]): string {
  const configured = items.filter((i) => i.shopifyVariantId);
  if (configured.length === 0) {
    return `https://${DOMAIN || "bos3bags.com"}`;
  }
  const path = configured
    .map((i) => `${extractVariantId(i.shopifyVariantId!)}:${i.quantity}`)
    .join(",");
  return `https://${DOMAIN || "bos3bags.com"}/cart/${path}?storefront=true`;
}
