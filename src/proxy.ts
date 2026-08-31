import { NextResponse, userAgent } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Server-side device branch. One public URL per page; phones are transparently
 * rewritten to the internal `/m` subtree, desktop and tablet hit the existing
 * routes untouched. The branch runs before any HTML is sent, so there is no
 * flash of desktop layout before hydration.
 *
 * `MOBILE_PATHS` is the allow-list of pages that actually have a `/m`
 * implementation. It grows one stage at a time:
 *   (a) "/"            ← this stage
 *   (b) + home feed content
 *   (c) + "/products/:slug"
 *   (d) + "/collections", "/collections/:category"
 *
 * v2 seam (known issue): "/about" and "/heritage" are deliberately absent —
 * phones get the desktop editorial pages until mobile versions are designed.
 */
const MOBILE_PATHS = new Set<string>(["/"]);

export function proxy(req: NextRequest): NextResponse {
  const { pathname } = req.nextUrl;

  // Never re-enter the branch or let the internal subtree be addressed directly.
  if (pathname === "/m" || pathname.startsWith("/m/")) {
    return NextResponse.next();
  }

  const { device } = userAgent(req);
  // Only phones get the app UI. Tablets and unknown user-agents stay on desktop.
  // Bots are treated like any other client — served the tree their own UA maps
  // to, never force-routed — so this stays within mobile-first indexing rules.
  const isPhone = device.type === "mobile";

  let res: NextResponse;
  if (isPhone && MOBILE_PATHS.has(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = pathname === "/" ? "/m" : `/m${pathname}`;
    res = NextResponse.rewrite(url);
  } else {
    res = NextResponse.next();
  }

  // The same URL renders different markup per device — shared caches and
  // crawlers must key on the user-agent. Next's App Router reserves the `Vary`
  // header and strips additions here, so the authoritative `Vary: User-Agent`
  // is set at the edge in `vercel.json`. This append is the fallback that works
  // when self-hosting behind a plain Node server.
  res.headers.append("Vary", "User-Agent");
  return res;
}

export const config = {
  // Skip API routes, Next internals, and any path with a file extension
  // (static assets in /public) so `Vary` never lands on cacheable assets.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)"],
};
