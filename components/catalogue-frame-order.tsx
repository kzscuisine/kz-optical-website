"use client";
import {useState} from "react";
import ProductOrder from "./product-order";
import photoManifest from "../lib/superflex-photo-manifest.json";
export default function CatalogueFrameOrder({product}:{product:any}){
 const [colour,setColour]=useState(product.colors?.[0]?.code || "");
 const [size,setSize]=useState(product.sizes?.[0] || "");
 const c=(product.colors || []).find((x:any)=>x.code===colour);
const photos = ((photoManifest as Record<string, {code:string;colour:string;size:string;image:string}[]>)[String(product.id).toLowerCase().trim()] || []);
const selectedPhoto = photos.find(x=>String(x.code)===String(colour) && String(x.size).slice(0,2)===String(size).slice(0,2)) || photos.find(x=>String(x.code)===String(colour)) || photos[0] || (product.image ? {image:product.image,colour:"Catalogue",code:"",size:""} : undefined);
 const selected={...product,model:product.model+(colour?" / "+colour:" ")+(size?" / "+size:""),name:product.name+(c?" Ã¢â‚¬â€ "+c.name:"")};
 return <div className="productDetail"><div>{selectedPhoto && <img className="detailImage" src={selectedPhoto.image} alt={`${product.name} ${selectedPhoto.colour}`} style={{width:"100%",maxWidth:750,objectFit:"contain",background:"white"}} />}</div><div><small>{product.brand}</small><h1>{product.name}</h1><p className="model">{product.model} - {product.audience}</p><p>Choose your lenses and prescription options below.</p><div style={{display:"grid",gap:12,margin:"20px 0"}}><label style={{display:"grid",gap:5}}>Frame colour<select value={colour} onChange={e=>setColour(e.target.value)} style={{padding:12,border:"1px solid #cbd5e1",borderRadius:8}}>{(product.colors || []).map((c:any)=><option key={c.code} value={c.code}>{c.code} - {c.name}</option>)}</select></label><label style={{display:"grid",gap:5}}>Frame size<select value={size} onChange={e=>setSize(e.target.value)} style={{padding:12,border:"1px solid #cbd5e1",borderRadius:8}}>{(product.sizes || []).map((s:string)=><option key={s} value={s}>{s}</option>)}</select></label></div><p style={{fontSize:12,color:"#64748b"}}>Selected colour may differ from the catalogue photo. Stock is confirmed before fulfilment.</p><ProductOrder product={selected}/></div></div>;
}


