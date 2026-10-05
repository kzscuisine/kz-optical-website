"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "../../components/cart-context";

export default function Confirmation() {
  const [order, setOrder] = useState<any>(null);
  const { clear } = useCart();
  const router = useRouter();

  useEffect(() => {
    try {
      setOrder(JSON.parse(sessionStorage.getItem("kzopt-order") || "null"));
    } catch {
      setOrder(null);
    }
  }, []);

  function placeOrder() {
    if (!order) return;

    const completedOrder = {
      ...order,
      orderNumber: "KZO-" + Date.now().toString().slice(-8),
      submittedAt: new Date().toISOString(),
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
          carefully before placing the order.
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

          <h2>Items</h2>
          {order.items?.map((i: any, index: number) => (
            <div key={i.key || index} style={{ marginBottom: "18px" }}>
              <p>
                <b>
                  {i.brand} — {i.name}
                </b>
                <br />
                {i.lens} · {i.upgrade}
              </p>
            </div>
          ))}

          <p>
            <b>Prescription:</b>{" "}
            {order.rx || "To be provided separately"}
          </p>

          <p className="fine">
            No payment will be taken at this testing stage. Payment, shipping,
            tax and order-email delivery will be connected before public
            launch.
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

            <button
              className="dark button"
              type="button"
              onClick={placeOrder}
            >
              Place order
            </button>
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
