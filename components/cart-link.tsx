"use client";import Link from "next/link";import {useCart} from "./cart-context";
export default function CartLink(){const {count}=useCart();return <Link className="cartLink" href="/cart">Cart <span>{count}</span></Link>}
