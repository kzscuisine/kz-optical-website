import { NextResponse } from "next/server";
import { SquareClient, SquareEnvironment } from "square";
import { randomUUID } from "crypto";
import { getProduct } from "../../../lib/products";
import {
  getFramePrice,
  lensOptions,
  lensUpgrades,
  storeConfig,
} from "../../../lib/store-config";

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

function esc(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    const { sourceId, items, customer, rx } = await request.json();

    if (
      !sourceId ||
      !Array.isArray(items) ||
      items.length === 0 ||
      !customer ||
      typeof customer.email !== "string"
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid payment information." },
        { status: 400 }
      );
    }

    let totalCents = 0;
    const trustedItems: any[] = [];

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
      const upgrade = lensUpgrades.find(
        (x) => x.name === item.upgrade
      );

      if (!product || !lens || !upgrade) {
        return NextResponse.json(
          {
            success: false,
            message: "Unknown product or lens option.",
          },
          { status: 400 }
        );
      }

      const basePrice =
        getFramePrice(product) ?? storeConfig.framePrice;

      if (basePrice === null) {
        return NextResponse.json(
          {
            success: false,
            message:
              "This product is not currently available for online payment.",
          },
          { status: 400 }
        );
      }

      const unitCents =
        Math.round(basePrice * 100) +
        Math.round((lens.price ?? 0) * 100) +
        Math.round((upgrade.price ?? 0) * 100);

      totalCents += unitCents * (item.qty as number);

      trustedItems.push({
        brand: product.brand,
        name: product.name,
        model: product.model,
        lens: lens.name,
        upgrade: upgrade.name,
        qty: item.qty,
        unitCents,
      });
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
        {
          success: false,
          status: payment?.status,
          message: "Payment was not completed.",
        },
        { status: 402 }
      );
    }

    const submittedAt = new Date().toISOString();
    const orderNumber =
      "KZO-" +
      Date.now().toString().slice(-8) +
      "-" +
      randomUUID().slice(0, 4).toUpperCase();

    let emailSent = false;

    try {
      const resendKey = process.env.RESEND_API_KEY;

      if (!resendKey) {
        throw new Error("RESEND_API_KEY is not configured.");
      }

      const itemRows = trustedItems
        .map(
          (item) => `
            <tr>
              <td style="padding:8px;border:1px solid #ddd;">
                ${esc(item.brand)} — ${esc(item.name)}
                ${item.model ? `<br>${esc(item.model)}` : ""}
              </td>
              <td style="padding:8px;border:1px solid #ddd;">
                ${esc(item.lens)}
              </td>
              <td style="padding:8px;border:1px solid #ddd;">
                ${esc(item.upgrade)}
              </td>
              <td style="padding:8px;border:1px solid #ddd;">
                ${esc(item.qty)}
              </td>
              <td style="padding:8px;border:1px solid #ddd;">
                $${(item.unitCents / 100).toFixed(2)}
              </td>
            </tr>`
        )
        .join("");

      const emailResponse = await fetch(
        "https://api.resend.com/emails",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "KZ Optical Orders <onboarding@resend.dev>",
            to: ["kzdknss@gmail.com"],
            subject: `KZ Optical Order ${orderNumber}`,
            html: `
              <div style="font-family:Arial,sans-serif;max-width:760px;margin:auto;">
                <h1>New KZ Optical Order</h1>

                <p><b>Order number:</b> ${esc(orderNumber)}</p>
                <p><b>Submitted:</b> ${esc(submittedAt)}</p>
                <p><b>Square payment ID:</b> ${esc(payment.id)}</p>

                <h2>Customer</h2>
                <p>
                  ${esc(customer.firstName)} ${esc(customer.lastName)}<br>
                  ${esc(customer.email)}<br>
                  ${esc(customer.phone)}<br>
                  ${esc(customer.address)}<br>
                  ${esc(customer.city)}, ${esc(customer.province)}
                  ${esc(customer.postalCode)}
                </p>

                <h2>Eyewear</h2>
                <table style="border-collapse:collapse;width:100%;">
                  <tr>
                    <th style="padding:8px;border:1px solid #ddd;">Frame</th>
                    <th style="padding:8px;border:1px solid #ddd;">Lens</th>
                    <th style="padding:8px;border:1px solid #ddd;">Upgrade</th>
                    <th style="padding:8px;border:1px solid #ddd;">Qty</th>
                    <th style="padding:8px;border:1px solid #ddd;">Unit price</th>
                  </tr>
                  ${itemRows}
                </table>

                <h2>Prescription</h2>
                <p>${esc(rx || "To be provided separately")}</p>

                <h2>Payment</h2>
                <p>
                  <b>Order total:</b> $${(totalCents / 100).toFixed(2)} CAD<br>
                  <b>Shipping:</b> FREE<br>
                  <b>Payment status:</b> COMPLETED
                </p>
              </div>
            `,
          }),
        }
      );

      if (!emailResponse.ok) {
        const resendError = await emailResponse.text();
        console.error("Resend order email error:", resendError);
      } else {
        emailSent = true;
      }
    } catch (emailError) {
      console.error("KZ Optical order email error:", emailError);
    }

    return NextResponse.json({
      success: true,
      paymentId: payment.id,
      status: payment.status,
      amount: totalCents,
      orderNumber,
      submittedAt,
      emailSent,
    });
  } catch (error) {
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
