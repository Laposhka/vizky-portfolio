"use client";

import { useEffect, useState } from "react";
import { wallet } from "@/lib/content";
import type { TaoResponse } from "@/app/api/tao/route";

const REFRESH_MS = 60_000;

const tao = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 4,
  maximumFractionDigits: 4,
});

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function truncate(address: string) {
  return `${address.slice(0, 6)}…${address.slice(-6)}`;
}

export default function TaoBalance() {
  const [data, setData] = useState<TaoResponse | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        const res = await fetch("/api/tao", { signal: controller.signal });
        if (!res.ok) throw new Error(String(res.status));
        setData((await res.json()) as TaoResponse);
        setFailed(false);
      } catch (error) {
        if (!controller.signal.aborted) setFailed(true);
        void error;
      }
    };

    load();
    const timer = setInterval(load, REFRESH_MS);
    return () => {
      controller.abort();
      clearInterval(timer);
    };
  }, []);

  const change = data?.change24h ?? null;
  const up = change !== null && change >= 0;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-surface/70 p-6">
      <div className="relative">
        {data ? (
          <>
            <p className="text-xl leading-none font-semibold tracking-[-0.03em] tabular-nums">
              Hourly rate: {(data.valueUsd).toFixed()}
            </p>
          </>
        ) : failed ? (
          <p className="text-sm text-muted">
            
          </p>
        ) : (
          <div className="animate-pulse space-y-3" aria-hidden>
            <div className="h-9 w-48 rounded-lg bg-elevated" />
            <div className="h-5 w-64 rounded-md bg-elevated" />
          </div>
        )}
      </div>

    </div>
  );
}
