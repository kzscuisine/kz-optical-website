import { NextRequest, NextResponse } from "next/server";
import { get } from "@vercel/blob";
import { verifyPrescriptionLink } from "../../../lib/signed-link";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const p = request.nextUrl.searchParams.get("p") ?? "";
  const e = request.nextUrl.searchParams.get("e") ?? "";
  const s = request.nextUrl.searchParams.get("s") ?? "";

  if (!verifyPrescriptionLink(p, e, s)) {
    return new NextResponse("This link is invalid or has expired.", {
      status: 403,
      headers: { "Cache-Control": "no-store" },
    });
  }

  try {
    const result = await get(p, { access: "private" });

    if (!result || result.statusCode !== 200) {
      return new NextResponse("File not found.", {
        status: 404,
        headers: { "Cache-Control": "no-store" },
      });
    }

    return new NextResponse(result.stream, {
      headers: {
        "Content-Type": result.blob.contentType,
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "private, no-store",
        "X-Robots-Tag": "noindex",
        "Content-Disposition": "inline",
      },
    });
  } catch (error) {
    console.error("Prescription view error:", error);
    return new NextResponse("Could not open the file.", {
      status: 500,
      headers: { "Cache-Control": "no-store" },
    });
  }
}
