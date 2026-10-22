import Link from "next/link";import "./globals.css";import {CartProvider} from "../components/cart-context";import CartLink from "../components/cart-link";
export const metadata={
  metadataBase:new URL("https://kzoptical.ca"),
  title:{default:"KZ Optical | Prescription Glasses in British Columbia",template:"%s | KZ Optical"},
  description:"Complete prescription eyeglasses from $99 with free shipping in British Columbia. Superflex, Superflex Kids, Titan and more.",
  alternates:{canonical:"/"},
  openGraph:{type:"website",siteName:"KZ Optical",locale:"en_CA",url:"https://kzoptical.ca",title:"KZ Optical | Prescription Glasses in British Columbia",description:"Complete prescription eyeglasses from $99 with free shipping in British Columbia.",images:[{url:"/westgroupe/11-sf-1188t-m102-may-sf-1187t-m107-mar.jpg",width:1200,height:630,alt:"KZ Optical eyewear"}]},
  twitter:{card:"summary_large_image"},
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><CartProvider>
<header><Link className="brand logo" href="/" aria-label="KZ Optical"><b>KZ</b>&nbsp;<span className="lite"><svg viewBox="0 0 60 40" fill="none" stroke="#d99a1e" strokeWidth="3.2" strokeLinecap="round" aria-hidden="true"><circle cx="15" cy="18.5" r="12.5"/><circle cx="45" cy="18.5" r="12.5"/><path d="M27.5 14 Q30 11 32.5 14"/><path d="M32.5 18.5 V37.5"/></svg>tical</span></Link><nav><Link href="/">Home</Link><Link href="/eyeglasses">Eyeglasses</Link><Link href="/lenses">Lens Guide</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link><CartLink/></nav></header>
{children}<footer><div><b>KZ Optical</b><p>Prescription eyewear with clarity, comfort and style.</p><div className="footerNav"><Link href="/shipping-returns">Shipping & Returns</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/prescription-help">Prescription Help</Link></div></div><p>British Columbia, Canada · © 2026 KZ Optical</p></footer>
</CartProvider></body></html>}


