import Link from "next/link";
export default function Home(){return <main>
<section className="hero"><div className="copy"><small>KZ OPTICAL · BRITISH COLUMBIA</small><h1>See clearly.<br/>Wear confidently.</h1><p>Discover prescription eyewear that brings together vision, comfort and contemporary style.</p><p><b>Complete prescription eyeglasses from $99 · Free shipping in BC</b></p><div className="buttons"><Link className="dark" href="/eyeglasses">Shop Eyeglasses</Link><Link className="outline" href="/lenses">Lens Guide</Link></div></div><img src="/westgroupe/11-sf-1188t-m102-may-sf-1187t-m107-mar.jpg" alt="KZ Optical eyewear"/></section>
<section className="center"><small>SHOP BY BRAND</small><h2>Frames for everyday life</h2><p>Explore distinctive adult and children&apos;s eyewear from established collections. Every pair comes complete with prescription lenses.</p></section>
<section className="tiles">
{[
  {slug:"superflex",title:"Superflex",img:"/westgroupe/12-sf-660-s402-sept-2024.jpg",text:"Lightweight, flexible frames for every day."},
  {slug:"superflex-kids",title:"Superflex Kids",img:"/westgroupe/15-sfk-334-s209-sfk-335-s303-june.jpg",text:"Durable, flexible frames made for kids."},
  {slug:"superflex-titan",title:"Superflex Titan",img:"/westgroupe/11-sf-1188t-m102-may-sf-1187t-m107-mar.jpg",text:"Ultra-light titanium frames with Superflex flexibility."},
  {slug:"nano",title:"Nano Vista",img:"/westgroupe/04-indestructible-loading-3-0-nao327-01-02.jpg",text:"Colourful, flexible eyewear designed for younger wearers."},
  {slug:"one-true-pair",title:"One True Pair",img:"/westgroupe/09-otp-221-mar-otp-223-mar.jpg",text:"Contemporary eyewear with distinctive everyday style."},
  {slug:"stepper",title:"Stepper",img:"/westgroupe/19-stepper-origin-si-20165-f200.jpg",text:"Clean lines and considered frame design."},
].map(b=><article key={b.slug}><img src={b.img} alt={b.title+" eyewear"}/><h3>{b.title}</h3><Link href={"/collections/"+b.slug}>Explore Frames →</Link><p>{b.text}</p></article>)}
</section>
<section className="center" style={{margin:"0 auto 95px"}}><Link className="dark" href="/eyeglasses" style={{fontSize:20,fontWeight:700,padding:"20px 48px"}}>Shop All Eyeglasses</Link><p style={{marginTop:14}}>From $99 · Free shipping in BC</p></section>
<section className="feature"><img src="/westgroupe/18-sfk-344-s401-sfk-346-s304-sept-v2.jpg" alt="Kids eyewear"/><div><small>PRESCRIPTION EYEWEAR</small><h2>Your frame. Your prescription.</h2><p>Choose a frame, review lens options and build your prescription eyewear in a straightforward online flow.</p><Link className="dark" href="/lenses">Read the Lens Guide</Link></div></section>
<section className="cta"><div><small>SUPERFLEX · SUPERFLEX KIDS · SUPERFLEX TITAN · NANO VISTA · ONE TRUE PAIR · STEPPER</small><h2>Find a frame that feels like you.</h2><Link className="light" href="/eyeglasses">Shop All Eyeglasses</Link></div><img src="/westgroupe/13-sf-662-s312-nov-2024-sf-674-s401-sept.jpg" alt="Superflex eyewear"/></section>
</main>}
