"use client";
import React,{createContext,useContext,useEffect,useMemo,useState} from "react";
export type CartItem={key:string;productId:string;name:string;brand:string;model:string;image:string;lens:string;upgrade:string;prescriptionMethod:string;qty:number;unitPrice:number|null};
type CartValue={items:CartItem[];add:(i:CartItem)=>void;remove:(key:string)=>void;clear:()=>void;count:number};
const C=createContext<CartValue|null>(null);
export function CartProvider({children}:{children:React.ReactNode}){
 const [items,setItems]=useState<CartItem[]>([]);
 useEffect(()=>{try{setItems(JSON.parse(localStorage.getItem("kzopt-cart")||"[]"))}catch{}},[]);
 useEffect(()=>{localStorage.setItem("kzopt-cart",JSON.stringify(items))},[items]);
 const value=useMemo(()=>({items,add:(i:CartItem)=>setItems(x=>[...x,i]),remove:(k:string)=>setItems(x=>x.filter(i=>i.key!==k)),clear:()=>setItems([]),count:items.reduce((a,b)=>a+b.qty,0)}),[items]);
 return <C.Provider value={value}>{children}</C.Provider>
}
export function useCart(){const v=useContext(C);if(!v)throw new Error("CartProvider missing");return v}
