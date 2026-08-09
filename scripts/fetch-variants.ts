// One-off script: fetch handle/title/variant GID for every product from the
// Shopify Storefront API. Run with: npx tsx scripts/fetch-variants.ts
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function loadEnvLocal() {
  const path = resolve(process.cwd(), ".env.local");
  const content = readFileSync(path, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvLocal();

const DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

if (!DOMAIN || !TOKEN) {
  console.error("Missing NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN or NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN in .env.local");
  process.exit(1);
}

const API_URL = `https://${DOMAIN}/api/2024-01/graphql.json`;

const QUERY = `
  query FetchAllProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          handle
          title
          variants(first: 10) {
            edges {
              node {
                id
                title
              }
            }
          }
        }
      }
    }
  }
`;

async function main() {
  console.log(`Querying ${API_URL} ...`);

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": TOKEN!,
    },
    body: JSON.stringify({ query: QUERY, variables: { first: 50 } }),
  });

  console.log(`HTTP ${res.status} ${res.statusText}`);

  const text = await res.text();

  if (!res.ok) {
    console.error("Request failed. Response body:");
    console.error(text);
    process.exit(1);
  }

  let json: any;
  try {
    json = JSON.parse(text);
  } catch {
    console.error("Response was not valid JSON:");
    console.error(text);
    process.exit(1);
  }

  if (json.errors) {
    console.error("GraphQL errors:");
    console.error(JSON.stringify(json.errors, null, 2));
    process.exit(1);
  }

  const products = json.data?.products?.edges ?? [];
  if (products.length === 0) {
    console.log("No products returned.");
    return;
  }

  for (const { node } of products) {
    console.log(`\nHandle: ${node.handle}`);
    console.log(`Title:  ${node.title}`);
    for (const { node: variant } of node.variants.edges) {
      console.log(`  Variant: ${variant.title}  GID: ${variant.id}`);
    }
  }
}

main();
