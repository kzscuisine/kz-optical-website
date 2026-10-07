"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SquareSandboxCard from "../../components/square-sandbox-card";
import Link from "next/link";
import { useCart } from "../../components/cart-context";

export default function Confirmation() {
  const [order, setOrder] = useState<any>(null);
  const { clear } = useCart();
  const router = useRouter();

  useEffect(() => {
    try {
      setOrder(
        JSON.parse(sessionStorage.getItem("kzopt-order") || "null")
      );
    } catch {
      setOrder(null);
    }
  }, []);

  function placeOrder(paymentResult: any) {
    if (!order) return;

    const completedOrder = {
      ...order,
      orderNumber: paymentResult.orderNumber,
      submittedAt: paymentResult.submittedAt,
      paymentId: paymentResult.paymentId,
      amount: paymentResult.amount,
      emailSent: paymentResult.emailSent,
    };

    sessionStorage.setItem(
      "kzopt-completed-order",
      JSON.stringify(completedOrder)
    );

    sessionStorage.removeItem("kzopt-order");
    clear();
    router.push("/order-confirmation");
  }

  return (
    <main className="page narrow">
      <div className="pagehead">
        <small>ORDER REVIEW</small>
        <h1>Review your eyewear order</h1>
        <p>
          Please check your customer, eyewear and prescription information
          carefully before payment.
        </p>
      </div>

      {order ? (
        <div className="note">
          <h2>Customer</h2>

          <p>
            {order.customer?.firstName} {order.customer?.lastName}
            <br />
            {order.customer?.email}
            {order.customer?.phone ? (
              <>
                <br />
                {order.customer.phone}
              </>
            ) : null}
          </p>

          <p>
            {order.customer?.address}
            <br />
            {order.customer?.city}, {order.customer?.province}{" "}
            {order.customer?.postalCode}
          </p>

          <h2>Items</h2>

          {order.items?.map((i: any, index: number) => (
            <div
              key={i.key || index}
              style={{ marginBottom: "18px" }}
            >
              <p>
                <b>
                  {i.brand} — {i.name}
                </b>
                <br />
                {i.lens} · {i.upgrade}
                <br />
                Quantity: {i.qty}
              </p>
            </div>
          ))}

          <p>
            <b>Prescription:</b>{" "}
            {order.rx || "To be provided separately"}
          </p>

          <p className="fine">
            Payment is securely processed by Square.
          </p>

          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              marginTop: "24px",
            }}
          >
            <Link className="button" href="/checkout">
              Back to checkout
            </Link>

            <SquareSandboxCard
              items={order.items}
              customer={order.customer}
              rx={order.rx}
              onPaymentSuccess={placeOrder}
            />
          </div>
        </div>
      ) : (
        <div className="note">
          <p>No order review is available.</p>
          <Link className="button" href="/eyeglasses">
            Return to Eyeglasses
          </Link>
        </div>
      )}
    </main>
  );
}
