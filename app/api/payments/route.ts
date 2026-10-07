import { NextResponse } from "next/server";
import { SquareClient, SquareEnvironment } from "square";
import { randomUUID } from "crypto";
import { getProduct } from "../../../lib/products";
import { getFramePrice, lensOptions, lensUpgrades, storeConfig } from "../../../lib/store-config";

const square = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN!,
  environment: SquareEnvironment.Production,
});

type PaymentItem = {
  productId?: string;
  lens?: string;
  upgrade?: string;
  qty?: number;
};

export async function POST(request: Request) {
  try {
    const { sourceId, items } = await request.json();

    if (!sourceId || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, message: "Invalid payment information." },
        { status: 400 }
      );
    }

    let totalCents = 0;

    for (const item of items as PaymentItem[]) {
      if (
        typeof item.productId !== "string" ||
        typeof item.lens !== "string" ||
        typeof item.upgrade !== "string" ||
        !Number.isInteger(item.qty) ||
        (item.qty as number) < 1 ||
        (item.qty as number) > 10
      ) {
        return NextResponse.json(
          { success: false, message: "Invalid order item." },
          { status: 400 }
        );
      }

      const product = getProduct(item.productId);
      const lens = lensOptions.find((x) => x.name === item.lens);
      const upgrade = lensUpgrades.find((x) => x.name === item.upgrade);

      if (!product || !lens || !upgrade) {
        return NextResponse.json(
          { success: false, message: "Unknown product or lens option." },
          { status: 400 }
        );
      }

      const basePrice = getFramePrice(product) ?? storeConfig.framePrice;

      if (basePrice === null) {
        return NextResponse.json(
          { success: false, message: "This product is not currently available for online payment." },
          { status: 400 }
        );
      }

      const unitCents =
        Math.round(basePrice * 100) +
        Math.round((lens.price ?? 0) * 100) +
        Math.round((upgrade.price ?? 0) * 100);

      totalCents += unitCents * (item.qty as number);
    }

    if (!Number.isSafeInteger(totalCents) || totalCents <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid order total." },
        { status: 400 }
      );
    }

    const response = await square.payments.create({
      sourceId,
      idempotencyKey: randomUUID(),
      amountMoney: {
        amount: BigInt(totalCents),
        currency: "CAD",
      },
      locationId: process.env.SQUARE_LOCATION_ID!,
    });

    const payment = response.payment;

    if (!payment || payment.status !== "COMPLETED") {
      return NextResponse.json(
        { success: false, status: payment?.status, message: "Payment was not completed." },
        { status: 402 }
      );
    }

    return NextResponse.json({
      success: true,
      paymentId: payment.id,
      status: payment.status,
      amount: totalCents,
    });
  } catch (error) {
    console.error("Square production payment error:", error);
    return NextResponse.json(
      { success: false, message: "Square production payment failed." },
      { status: 500 }
    );
  }
}
