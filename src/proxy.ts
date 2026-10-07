import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Device branch: OFF.
 *
 * This file used to rewrite any phone user-agent to an internal `/m` subtree,
 * so b3b.ai served two different sites depending on what you opened it with.
 * b3b.ai is now the B3B Vault, which is a single responsive page that handles
 * phones itself, so there is nothing left to branch. Every device gets the
 * same markup at the same URL.
 *
 * Nothing was deleted. The `/m` tree is still in `src/app`, still builds, and
 * is still reachable at its own address. To bring the old behaviour back, see
 * the version of this file at commit 556312f.
 */
export function proxy(_req: NextRequest): NextResponse {
  return NextResponse.next();
}

export const config = {
  // Skip API routes, Next internals, and any path with a file extension
  // (static assets in /public).
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)"],
};
