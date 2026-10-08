import { NextResponse } from "next/server";
import { issueUploadToken } from "../../../lib/upload-auth";

export const runtime = "nodejs";

export async function GET() {
  try {
    return NextResponse.json(
      { token: issueUploadToken() },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return NextResponse.json(
      { error: "Prescription storage unavailable." },
      { status: 503 }
    );
  }
}
