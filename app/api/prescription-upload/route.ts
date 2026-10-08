import { NextResponse } from "next/server";
import { verifyUploadToken } from "../../../lib/upload-auth";
import { put } from "@vercel/blob";
import { randomUUID } from "crypto";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const origin = request.headers.get("origin"); const host = request.headers.get("host"); if (!origin || !host || new URL(origin).host !== host || new URL(origin).protocol !== "https:") { return NextResponse.json({error:"Upload request not permitted."},{status:403}); }
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        { error: "Private prescription storage is not configured." },
        { status: 503 }
      );
    }

    const length = Number(request.headers.get("content-length"));
    if (!Number.isFinite(length) || length <= 0 || length > 4500000) {
      return NextResponse.json({error:"Upload request is too large or invalid."},{status:413});
    }
    const authorization = request.headers.get("x-checkout-authorization");
    if (!authorization || !verifyUploadToken(authorization)) {
      return NextResponse.json({error:"Checkout authorization required."},{status:401});
    }
    const form = await request.formData();
    const file = form.get("prescription");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Please select a prescription file." },
        { status: 400 }
      );
    }

    if (file.size === 0 || file.size > 4 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File must be between 1 byte and 4 MB." },
        { status: 400 }
      );
    }

    const bytes = new Uint8Array(await file.arrayBuffer());
    const pdf =
      bytes.length >= 5 &&
      String.fromCharCode(...bytes.slice(0, 5)) === "%PDF-";

    const jpg =
      bytes.length >= 3 &&
      bytes[0] === 255 &&
      bytes[1] === 216 &&
      bytes[2] === 255;

    const png =
      bytes.length >= 8 &&
      [137,80,78,71,13,10,26,10].every(
        (value, index) => bytes[index] === value
      );

    if (!pdf && !jpg && !png) {
      return NextResponse.json(
        { error: "Only valid PDF, JPG or PNG files are accepted." },
        { status: 400 }
      );
    }

    const extension = pdf ? "pdf" : jpg ? "jpg" : "png";
    const contentType = pdf
      ? "application/pdf"
      : jpg
        ? "image/jpeg"
        : "image/png";

    const pathname =
      `prescriptions/${randomUUID()}.${extension}`;

    const blob = await put(pathname, Buffer.from(bytes), {
      access: "private",
      contentType,
      addRandomSuffix: false,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return NextResponse.json({
      success: true,
      reference: blob.pathname,
    });
  } catch (error) {
    console.error("Private prescription upload failed:", error);
    return NextResponse.json(
      { error: "Prescription upload failed. Please try again." },
      { status: 500 }
    );
  }
}




