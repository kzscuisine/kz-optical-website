import Link from "next/link";import "./globals.css";import {CartProvider} from "../components/cart-context";import CartLink from "../components/cart-link";
export const metadata={title:"KZ Optical | Prescription Eyewear",description:"Prescription eyewear and lens options in British Columbia."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><CartProvider>
<header><Link className="brand logo" href="/" aria-label="KZ Optical"><b>KZ</b>&nbsp;<span className="lite"><svg viewBox="0 0 60 40" fill="none" stroke="#d99a1e" strokeWidth="3.2" strokeLinecap="round" aria-hidden="true"><circle cx="15" cy="18.5" r="12.5"/><circle cx="45" cy="18.5" r="12.5"/><path d="M27.5 14 Q30 11 32.5 14"/><path d="M32.5 18.5 V37.5"/></svg>tical</span></Link><nav><Link href="/">Home</Link><Link href="/eyeglasses">Eyeglasses</Link><Link href="/lenses">Lens Guide</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link><CartLink/></nav></header>
{children}<footer><div><b>KZ Optical</b><p>Prescription eyewear with clarity, comfort and style.</p><div className="footerNav"><Link href="/shipping-returns">Shipping & Returns</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/prescription-help">Prescription Help</Link></div></div><p>British Columbia, Canada · © 2026 KZ Optical</p></footer>
</CartProvider></body></html>}


