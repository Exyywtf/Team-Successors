import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { SHOW_PARTNERSHIP_DECK } from "@/lib/featureFlags";

const DECK_REDIRECT_TARGET = "/sponsors";
const DECK_HIDDEN_PATHS = new Set([
  "/deck.pdf",
  "/deck",
  "/partnership-deck",
  "/partnership-deck/",
  "/partners/deck",
]);

export function middleware(request: NextRequest) {
  if (SHOW_PARTNERSHIP_DECK) {
    return NextResponse.next();
  }

  const path = request.nextUrl.pathname.toLowerCase();
  if (DECK_HIDDEN_PATHS.has(path)) {
    return NextResponse.redirect(new URL(DECK_REDIRECT_TARGET, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/deck.pdf", "/deck", "/partnership-deck/:path*", "/partners/deck"],
};
