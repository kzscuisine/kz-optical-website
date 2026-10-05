"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrderConfirmation() {
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    try {
      setOrder(
        JSON.parse(
          sessionStorage.getItem("kzopt-completed-order") || "null"
        )
      );
    } catch {
      setOrder(null);
    }
  }, []);

  return (
    <main className="page narrow">
      <div className="pagehead">
        <small>ORDER CONFIRMATION</small>
        <h1>Thank you for your order</h1>
        <p>
          Your eyewear order has been recorded for this local testing stage.
        </p>
      </div>

      {order ? (
        <div className="note">
          <h2>Order received</h2>

          <p>
            <b>Order number:</b> {order.orderNumber}
          </p>

          <p>
            <b>Customer:</b> {order.customer?.firstName}{" "}
            {order.customer?.lastName}
            <br />
            <b>Email:</b> {order.customer?.email}
          </p>

          <h2>Eyewear</h2>

          {order.items?.map((i: any, index: number) => (
            <p key={i.key || index}>
              <b>
                {i.brand} — {i.name}
              </b>
              <br />
              {i.lens} · {i.upgrade}
            </p>
          ))}

          <p>
            <b>Prescription:</b>{" "}
            {order.rx || "To be provided separately"}
          </p>

          <p className="fine">
            This is currently a local test order. No payment has been charged.
          </p>

          <Link className="dark button" href="/eyeglasses">
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="note">
          <p>No completed order is available.</p>
          <Link className="button" href="/eyeglasses">
            Shop Eyeglasses
          </Link>
        </div>
      )}
    </main>
  );
}
