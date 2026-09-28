import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const blockedUserAgents = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  "Google-Extended",
  "Google-CloudVertexBot",
  "PerplexityBot",
  "Perplexity-User",
  "MistralAI-User",
  "DuckAssistBot",
  "Amazonbot",
  "Meta-ExternalAgent",
  "Meta-ExternalFetcher",
  "CCBot",
  "CommonCrawl",
  "DeepSeekBot",
  "ora-agent",
  "AhrefsBot",
  "AhrefsSiteAudit",
  "SemrushBot",
  "MJ12bot",
  "majestic12",
  "DataForSeoBot",
  "BLEXBot",
  "Bytespider",
  "Seekport",
  "Crawl4AI",
  "CensysInspect",
  "crawlergo",
  "masscan",
  "nikto",
  "sqlmap",
  "sitecopier",
  "HTTrack",
  "WebCopier",
] as const;

const blockedUserAgentPattern = new RegExp(
  blockedUserAgents.map((agent) => agent.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"),
  "i",
);

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  // Consumer skill payload and agent entry must stay readable by AI crawlers.
  if (pathname === "/llms.txt" || pathname === "/skills" || pathname.startsWith("/skills/")) {
    return NextResponse.next();
  }

  const userAgent = request.headers.get("user-agent") ?? "";

  if (blockedUserAgentPattern.test(userAgent)) {
    return new NextResponse("Blocked", {
      status: 403,
      headers: {
        "Cache-Control": "no-store",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt).*)"],
};
