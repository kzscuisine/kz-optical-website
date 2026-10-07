"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {useCart} from "./cart-context";
import {lensOptions,lensUpgrades,money,storeConfig,getFramePrice} from "../lib/store-config";
export default function ProductOrder({product}:{product:any}){
 const [lens,setLens]=useState("single-vision"); const [upgrade,setUpgrade]=useState("standard");
 const [rx,setRx]=useState("upload-later"); const {add}=useCart(); const router=useRouter();
 function addItem(){const l=lensOptions.find(x=>x.id===lens)!;const u=lensUpgrades.find(x=>x.id===upgrade)!;
 const basePrice=getFramePrice(product) ?? product.price ?? storeConfig.framePrice; const unitPrice=basePrice===null?null:basePrice+(l.price ?? 0)+(u.price ?? 0);
 add({key:crypto.randomUUID(),productId:product.id,name:product.name,brand:product.brand,model:product.model,image:product.image,lens:l.name,upgrade:u.name,prescriptionMethod:rx,qty:1,unitPrice});router.push("/cart")}
 return <div className="orderPanel">
  <h2>Build your prescription eyewear</h2>
  <label>Lens type<select value={lens} onChange={e=>setLens(e.target.value)}>{lensOptions.map(x=><option key={x.id} value={x.id}>{x.name} — {money(x.price)}</option>)}</select></label>
  <label>Lens option<select value={upgrade} onChange={e=>setUpgrade(e.target.value)}>{lensUpgrades.map(x=><option key={x.id} value={x.id}>{x.name} — {money(x.price)}</option>)}</select></label>
  <fieldset><legend>Prescription</legend>
   <label className="radio"><input type="radio" checked={rx==="upload-later"} onChange={()=>setRx("upload-later")}/> Provide/upload prescription after ordering</label>
   <label className="radio"><input type="radio" checked={rx==="enter"} onChange={()=>setRx("enter")}/> Enter prescription details during checkout</label>
  </fieldset>
  <div className="priceBox"><span>Complete Pair</span><b>{money((getFramePrice(product) ?? product.price ?? storeConfig.framePrice)+(lensOptions.find(x=>x.id===lens)?.price ?? 0)+(lensUpgrades.find(x=>x.id===upgrade)?.price ?? 0))}</b></div>
  <button className="dark button" onClick={addItem}>Add to Cart</button>
  <p className="fine">Final prices, availability and prescription handling rules will be activated before public launch.</p>
 </div>
}











