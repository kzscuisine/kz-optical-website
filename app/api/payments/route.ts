import { NextResponse } from "next/server";
import { SquareClient, SquareEnvironment } from "square";
import { randomUUID } from "crypto";

const square = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN!,
  environment: SquareEnvironment.Production,
});

export async function POST(request: Request) {
  try {
    const { sourceId, amount } = await request.json();

    if (!sourceId || !Number.isInteger(amount) || amount <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid payment information." },
        { status: 400 }
      );
    }

    const response = await square.payments.create({
      sourceId,
      idempotencyKey: randomUUID(),
      amountMoney: {
        amount: BigInt(amount),
        currency: "CAD",
      },
      locationId: process.env.SQUARE_LOCATION_ID!,
    });

    return NextResponse.json({
      success: true,
      paymentId: response.payment?.id,
      status: response.payment?.status,
    });
  } catch (error: any) {
    console.error("Square production payment error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Square production payment failed.",
      },
      { status: 500 }
    );
  }
}
