import { blake2b } from "@noble/hashes/blake2.js";

/**
 * Reads a Bittensor account balance straight from a Finney RPC node and prices
 * it in USD. No API key required for either endpoint.
 */

const RPC_URL = "https://entrypoint-finney.opentensor.ai:443";
const PRICE_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=bittensor&vs_currencies=usd&include_24hr_change=true";

/** TAO is divisible into 1e9 rao. */
export const RAO_PER_TAO = 1_000_000_000n;

/** twox128("System") ++ twox128("Account") — the System.Account storage prefix. */
const SYSTEM_ACCOUNT_PREFIX =
  "26aa394eea5630e07c48ae0c9558cef7b99d880ec681799c0cf30e8886371da9";

const B58_ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const SS58_PREFIX = new TextEncoder().encode("SS58PRE");

const REQUEST_TIMEOUT_MS = 8000;

export type TaoAccount = {
  address: string;
  /** Liquid, transferable balance. Does not include staked TAO. */
  free: bigint;
  reserved: bigint;
  frozen: bigint;
};

export type TaoPrice = {
  usd: number;
  change24h: number | null;
};

function base58Decode(input: string): Uint8Array {
  let value = 0n;
  for (const char of input) {
    const digit = B58_ALPHABET.indexOf(char);
    if (digit === -1) throw new Error(`Invalid base58 character "${char}"`);
    value = value * 58n + BigInt(digit);
  }

  const bytes: number[] = [];
  while (value > 0n) {
    bytes.unshift(Number(value & 0xffn));
    value >>= 8n;
  }

  // Every leading "1" encodes a leading zero byte.
  for (const char of input) {
    if (char !== "1") break;
    bytes.unshift(0);
  }

  return Uint8Array.from(bytes);
}

function toHex(bytes: Uint8Array): string {
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

function fromHex(hex: string): Uint8Array {
  const clean = hex.startsWith("0x") ? hex.slice(2) : hex;
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
  }
  return out;
}

/**
 * Decodes an SS58 address to its 32-byte public key, verifying the checksum.
 * Handles both 1-byte (prefix < 64) and 2-byte network prefixes.
 */
export function decodeAddress(address: string): Uint8Array {
  const decoded = base58Decode(address);

  // 32-byte account id + 2-byte checksum, plus a 1- or 2-byte network prefix.
  const prefixLength = decoded.length === 35 ? 1 : decoded.length === 36 ? 2 : 0;
  if (prefixLength === 0) {
    throw new Error(`Unexpected SS58 length: ${decoded.length}`);
  }

  const body = decoded.subarray(0, prefixLength + 32);
  const checksum = decoded.subarray(prefixLength + 32);

  const expected = blake2b(
    Uint8Array.from([...SS58_PREFIX, ...body]),
    { dkLen: 64 },
  ).subarray(0, 2);

  if (checksum[0] !== expected[0] || checksum[1] !== expected[1]) {
    throw new Error("SS58 checksum mismatch — address is not valid");
  }

  return body.subarray(prefixLength);
}

/** Builds the System.Account storage key: prefix ++ blake2_128_concat(publicKey). */
function accountStorageKey(publicKey: Uint8Array): string {
  const hashed = blake2b(publicKey, { dkLen: 16 });
  return `0x${SYSTEM_ACCOUNT_PREFIX}${toHex(hashed)}${toHex(publicKey)}`;
}

function readUint64LE(bytes: Uint8Array, offset: number): bigint {
  let value = 0n;
  for (let i = 7; i >= 0; i--) {
    value = (value << 8n) | BigInt(bytes[offset + i]);
  }
  return value;
}

/**
 * Decodes frame_system::AccountInfo. Bittensor's Balance type is u64, so the
 * layout is: nonce/consumers/providers/sufficients (4 x u32), then
 * free/reserved/frozen (3 x u64), then a u128 flags field.
 */
function decodeAccountInfo(raw: string): Omit<TaoAccount, "address"> {
  const bytes = fromHex(raw);
  if (bytes.length < 40) {
    throw new Error(`AccountInfo too short: ${bytes.length} bytes`);
  }
  return {
    free: readUint64LE(bytes, 16),
    reserved: readUint64LE(bytes, 24),
    frozen: readUint64LE(bytes, 32),
  };
}

export async function fetchTaoAccount(address: string): Promise<TaoAccount> {
  const key = accountStorageKey(decodeAddress(address));

  const response = await fetch(RPC_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "state_getStorage",
      params: [key],
    }),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Finney RPC responded ${response.status}`);
  }

  const payload = (await response.json()) as {
    result?: string | null;
    error?: { message?: string };
  };

  if (payload.error) {
    throw new Error(payload.error.message ?? "Finney RPC error");
  }

  // A never-funded account has no storage entry at all.
  if (!payload.result) {
    return { address, free: 0n, reserved: 0n, frozen: 0n };
  }

  return { address, ...decodeAccountInfo(payload.result) };
}

export async function fetchTaoPrice(): Promise<TaoPrice> {
  const response = await fetch(PRICE_URL, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`CoinGecko responded ${response.status}`);
  }

  const payload = (await response.json()) as {
    bittensor?: { usd?: number; usd_24h_change?: number };
  };

  const usd = payload.bittensor?.usd;
  if (typeof usd !== "number") {
    throw new Error("CoinGecko returned no TAO price");
  }

  return { usd, change24h: payload.bittensor?.usd_24h_change ?? null };
}

/** Converts rao to a TAO number. Safe: TAO's total supply fits in a double. */
export function raoToTao(rao: bigint): number {
  return Number(rao) / Number(RAO_PER_TAO);
}
