"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    Square?: any;
  }
}

export default function SquareSandboxCard({
  items,
  customer,
  rx,
  onPaymentSuccess,
}: {
  items: any[];
  customer: any;
  rx: string;
  onPaymentSuccess?: (result: any) => void;
}) {
  const orderTotal = items.reduce(
    (sum, item) => sum + (item.unitPrice ?? 0) * item.qty,
    0
  );

  const [sdkReady, setSdkReady] = useState(false);
  const [status, setStatus] = useState(
    "Loading secure Square payment form..."
  );
  const [paying, setPaying] = useState(false);
  const cardRef = useRef<any>(null);

  useEffect(() => {
    if (!sdkReady || !window.Square || cardRef.current) return;

    async function start() {
      try {
        const appId = process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID!;
        const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!;
        const payments = window.Square.payments(appId, locationId);
        const card = await payments.card();
        await card.attach("#square-card-container");
        cardRef.current = card;
        setStatus("Square secure card form ready.");
      } catch (error) {
        console.error(error);
        setStatus("Square card form could not be loaded.");
      }
    }

    start();

    return () => {
      const card = cardRef.current;
      cardRef.current = null;
      if (card) card.destroy().catch(() => {});
    };
  }, [sdkReady]);

  async function makePayment() {
    if (!cardRef.current || paying || orderTotal <= 0) return;

    try {
      setPaying(true);
      setStatus("Processing secure payment...");

      const tokenResult = await cardRef.current.tokenize();

      if (tokenResult.status !== "OK") {
        throw new Error("Square could not tokenize the card.");
      }

      const secureItems = items.map((item) => ({
        productId: item.productId,
        lens: item.lens,
        upgrade: item.upgrade,
        qty: item.qty,
      }));

      const response = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceId: tokenResult.token,
          items: secureItems,
          customer,
          rx,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success || result.status !== "COMPLETED") {
        throw new Error(result.message || "Payment was not completed.");
      }

      setStatus("Payment completed successfully.");
      onPaymentSuccess?.(result);
    } catch (error) {
      console.error(error);
      setStatus(
        "Payment failed. Please check your card details and try again."
      );
    } finally {
      setPaying(false);
    }
  }

  return (
    <section
      style={{
        maxWidth: 600,
        margin: "40px auto",
        padding: 24,
        border: "1px solid #ddd",
      }}
    >
      <Script
        src="https://web.squarecdn.com/v1/square.js"
        strategy="afterInteractive"
        onReady={() => setSdkReady(true)}
      />

      <h2>Secure Card Payment</h2>
      <p>Order total: ${(1).toFixed(2)} CAD</p>
      <p>Shipping: FREE</p>

      <div id="square-card-container" style={{ marginTop: 20 }} />

      <button
        type="button"
        onClick={makePayment}
        disabled={paying || orderTotal <= 0}
        style={{
          width: "100%",
          padding: 14,
          marginTop: 18,
          cursor: paying ? "not-allowed" : "pointer",
        }}
      >
        {paying
          ? "Processing..."
          : `Pay $${(1).toFixed(2)} CAD`}
      </button>

      <p style={{ fontSize: 14, marginTop: 16 }}>{status}</p>
    </section>
  );
}
