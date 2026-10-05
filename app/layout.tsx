import Link from "next/link";import "./globals.css";import {CartProvider} from "../components/cart-context";import CartLink from "../components/cart-link";
export const metadata={title:"KZ Optical | Prescription Eyewear",description:"Prescription eyewear and lens options in British Columbia."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><CartProvider>
<header><Link className="brand" href="/">KZ <span>Optical</span></Link><nav><Link href="/">Home</Link><Link href="/eyeglasses">Eyeglasses</Link><Link href="/lenses">Lenses</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link><CartLink/></nav></header>
{children}<footer><div><b>KZ Optical</b><p>Prescription eyewear with clarity, comfort and style.</p><div className="footerNav"><Link href="/shipping-returns">Shipping & Returns</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/prescription-help">Prescription Help</Link></div></div><p>British Columbia, Canada · Â© 2026 KZ Optical</p></footer>
</CartProvider></body></html>}
