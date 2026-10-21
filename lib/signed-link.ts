import { createHmac, timingSafeEqual } from "crypto";

// Signed, expiring links so only the shop owner (who receives the order
// email) can open a customer's private prescription file.

export const PRESCRIPTION_PATH =
  /^prescriptions\/[a-f0-9-]{36}\.(pdf|jpg|png)$/;

const DAYS_VALID = 90;

function secret(): string {
  const value = process.env.BLOB_READ_WRITE_TOKEN;
  if (!value) throw new Error("Signing secret is missing");
  return "rx-view:" + value;
}

function sign(pathname: string, expires: number): string {
  return createHmac("sha256", secret())
    .update(`${pathname}|${expires}`)
    .digest("hex");
}

export function buildPrescriptionLink(
  origin: string,
  pathname: string
): string | null {
  if (!PRESCRIPTION_PATH.test(pathname)) return null;
  const expires = Date.now() + DAYS_VALID * 24 * 60 * 60 * 1000;
  const params = new URLSearchParams({
    p: pathname,
    e: String(expires),
    s: sign(pathname, expires),
  });
  return `${origin}/api/prescription-view?${params.toString()}`;
}

export function verifyPrescriptionLink(
  pathname: string,
  expiresRaw: string,
  signature: string
): boolean {
  try {
    if (!PRESCRIPTION_PATH.test(pathname)) return false;
    if (!/^\d{13}$/.test(expiresRaw)) return false;
    if (!/^[a-f0-9]{64}$/.test(signature)) return false;
    const expires = Number(expiresRaw);
    if (expires < Date.now()) return false;
    const expected = Buffer.from(sign(pathname, expires), "hex");
    return timingSafeEqual(expected, Buffer.from(signature, "hex"));
  } catch {
    return false;
  }
}
