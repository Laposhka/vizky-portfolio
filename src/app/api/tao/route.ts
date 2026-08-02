import { NextResponse } from "next/server";
import { wallet } from "@/lib/content";
import { fetchTaoAccount, fetchTaoPrice, raoToTao } from "@/lib/tao";

export type TaoResponse = {
  address: string;
  balanceTao: number;
  reservedTao: number;
  priceUsd: number;
  valueUsd: number;
  change24h: number | null;
  updatedAt: string;
};

const CACHE_TTL_MS = 60_000;

/**
 * Both upstreams are rate-limited and shared by every visitor, so results are
 * memoised per server instance and the response is marked cacheable for CDNs.
 */
let cached: { at: number; body: TaoResponse } | null = null;

export async function GET() {
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) {
    return NextResponse.json(cached.body, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
    });
  }

  try {
    const [account, price] = await Promise.all([
      fetchTaoAccount(wallet.address),
      fetchTaoPrice(),
    ]);

    const balanceTao = raoToTao(account.free);
    const body: TaoResponse = {
      address: account.address,
      balanceTao,
      reservedTao: raoToTao(account.reserved),
      priceUsd: price.usd,
      valueUsd: balanceTao * price.usd,
      change24h: price.change24h,
      updatedAt: new Date().toISOString(),
    };

    cached = { at: Date.now(), body };

    return NextResponse.json(body, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
    });
  } catch (error) {
    // Serve a stale reading rather than nothing if an upstream is briefly down.
    if (cached) {
      return NextResponse.json(cached.body, {
        headers: { "Cache-Control": "public, s-maxage=30" },
      });
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to load balance" },
      { status: 502 },
    );
  }
}
