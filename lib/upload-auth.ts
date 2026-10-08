import { createHmac, randomBytes, timingSafeEqual } from "crypto";

function secret(): string {
  const value = process.env.BLOB_READ_WRITE_TOKEN;
  if (!value) throw new Error("Private Blob token is missing");
  return value;
}

export function issueUploadToken(): string {
  const expires = Date.now() + 120000;
  const nonce = randomBytes(16).toString("hex");
  const payload = `${expires}.${nonce}`;
  const signature = createHmac("sha256", secret())
    .update(payload)
    .digest("hex");
  return `${payload}.${signature}`;
}

export function verifyUploadToken(token: string): boolean {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return false;
    const [expiry, nonce, signature] = parts;
    if (!/^\d{13}$/.test(expiry) ||
        !/^[a-f0-9]{32}$/.test(nonce) ||
        !/^[a-f0-9]{64}$/.test(signature)) return false;

    const expires = Number(expiry);
    if (expires < Date.now() || expires > Date.now() + 120000)
      return false;

    const expected = createHmac("sha256", secret())
      .update(`${expiry}.${nonce}`)
      .digest();

    return timingSafeEqual(expected, Buffer.from(signature, "hex"));
  } catch {
    return false;
  }
}
