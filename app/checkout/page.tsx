"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../components/cart-context";

function range(start:number,end:number,step:number){
  const a:string[]=[];
  for(let n=start;n<=end+0.0001;n+=step){
    const v=Math.abs(n)<0.001?0:n;
    a.push(v===0?"0.00":`${v>0?"+":""}${v.toFixed(2)}`);
  }
  return a;
}

const sph=range(-12,8,0.25);
const cyl=range(-6,6,0.25);
const axis=Array.from({length:180},(_,i)=>String(i+1));
const add=range(0,4,0.25);
const pd=Array.from({length:61},(_,i)=>(45+i*0.5).toFixed(1));
const monoPd=Array.from({length:41},(_,i)=>(20+i*0.5).toFixed(1));

function SelectBox({name,values,def}:{name:string;values:string[];def?:string}){
  return <select name={name} defaultValue={def} required>
    {values.map(v=><option key={v} value={v}>{v}</option>)}
  </select>
}

export default function Checkout(){
  const {items}=useCart();
  const router=useRouter();
  const [pdType,setPdType]=useState<"single"|"dual">("single");
  const [uploading,setUploading]=useState(false);
  const [uploadError,setUploadError]=useState("");

  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    const fd=new FormData(e.currentTarget);
    const customer=Object.fromEntries(fd);
    delete customer.prescriptionFile;

    setUploadError("");
    const selectedFile=fd.get("prescriptionFile");
    let prescriptionReference="";

    if(selectedFile instanceof File && selectedFile.size>0){
      if(selectedFile.size>4*1024*1024){
        setUploadError("Prescription file must be 4 MB or smaller.");
        return;
      }

      setUploading(true);
      try{
        const uploadData=new FormData();
        uploadData.append("prescription",selectedFile);

        const authorizationResponse=await fetch("/api/upload-authorization",{
          cache:"no-store"
        });
        if(!authorizationResponse.ok){
          throw new Error("Prescription upload authorization unavailable.");
        }
        const authorizationData=await authorizationResponse.json();
        if(typeof authorizationData.token!=="string"){
          throw new Error("Invalid prescription upload authorization.");
        }

        const uploadResponse=await fetch("/api/prescription-upload",{
          method:"POST",
          headers:{"x-checkout-authorization":authorizationData.token},
          body:uploadData
        });

        const uploadResult=await uploadResponse.json();

        if(!uploadResponse.ok || !uploadResult.success){
          throw new Error(uploadResult.error || "Upload failed.");
        }

        prescriptionReference=uploadResult.reference;
      }catch(error){
        setUploadError(
          error instanceof Error ? error.message : "Upload failed."
        );
        setUploading(false);
        return;
      }
      setUploading(false);
    }

    const rx =
      `OD: SPH ${fd.get("odSph")} CYL ${fd.get("odCyl")} AXIS ${fd.get("odAxis")} ADD ${fd.get("odAdd")} | `+
      `OS: SPH ${fd.get("osSph")} CYL ${fd.get("osCyl")} AXIS ${fd.get("osAxis")} ADD ${fd.get("osAdd")} | `+
      `PD: ${fd.get("pdType")==="dual" ? `OD ${fd.get("pdOD")} / OS ${fd.get("pdOS")}` : fd.get("pd")} | Notes: ${fd.get("rxNotes")||""}`;

    const finalRx=rx + (
      prescriptionReference
        ? ` | Private prescription file: ${prescriptionReference}`
        : ""
    );

    sessionStorage.setItem(
      "kzopt-order",
      JSON.stringify({customer,items,rx:finalRx})
    );

    router.push("/confirmation");
  }

  return (
    <main className="page narrow">
      <div className="pagehead">
        <small>CHECKOUT</small>
        <h1>Customer & prescription details</h1>
        <p>Please enter the information exactly as it appears on your prescription.</p>
      </div>

      {!items.length ? (
        <div className="note">Your cart is empty.</div>
      ) : (
        <form className="checkoutForm" onSubmit={submit}>
          <h2>Customer</h2>

          <div className="formGrid">
            <label>First name<input name="firstName" required/></label>
            <label>Last name<input name="lastName" required/></label>
            <label>Email<input type="email" name="email" required/></label>
            <label>Phone<input name="phone"/></label>
            <label className="wide">Address<input name="address" required/></label>
            <label>City<input name="city" required/></label>
            <label>Province<input name="province" defaultValue="BC" required/></label>
            <label>Postal code<input name="postalCode" required/></label>
          </div>

          <h2>Prescription information</h2>

          <div className="rxTable">
            <div className="rxHead">
              <b>Eye</b><b>SPH</b><b>CYL</b><b>AXIS</b><b>ADD</b>
            </div>

            <div className="rxRow">
              <div><strong>OD</strong><small>Right</small></div>
              <SelectBox name="odSph" values={sph} def="0.00"/>
              <SelectBox name="odCyl" values={cyl} def="0.00"/>
              <SelectBox name="odAxis" values={axis} def="1"/>
              <SelectBox name="odAdd" values={add} def="0.00"/>
            </div>

            <div className="rxRow">
              <div><strong>OS</strong><small>Left</small></div>
              <SelectBox name="osSph" values={sph} def="0.00"/>
              <SelectBox name="osCyl" values={cyl} def="0.00"/>
              <SelectBox name="osAxis" values={axis} def="1"/>
              <SelectBox name="osAdd" values={add} def="0.00"/>
            </div>
          </div>

          <div className="pdSection">
            <h3>Pupillary Distance (PD)</h3>

            <div className="pdType">
              <label>
                <input
                  type="radio"
                  name="pdType"
                  value="single"
                  checked={pdType==="single"}
                  onChange={()=>setPdType("single")}
                />
                Single PD
              </label>

              <label>
                <input
                  type="radio"
                  name="pdType"
                  value="dual"
                  checked={pdType==="dual"}
                  onChange={()=>setPdType("dual")}
                />
                Dual / Monocular PD
              </label>
            </div>

            {pdType==="single" ? (
              <label className="pdLabel">
                Single PD
                <select name="pd" defaultValue="" required>
                  <option value="" disabled>Select PD</option>
                  {pd.map(v=><option key={v} value={v}>{v}</option>)}
                </select>
              </label>
            ) : (
              <div className="pdFields">
                <label>
                  OD (Right) PD
                  <select name="pdOD" defaultValue="" required>
                    <option value="" disabled>Select Right PD</option>
                    {monoPd.map(v=><option key={v} value={v}>{v}</option>)}
                  </select>
                </label>

                <label>
                  OS (Left) PD
                  <select name="pdOS" defaultValue="" required>
                    <option value="" disabled>Select Left PD</option>
                    {monoPd.map(v=><option key={v} value={v}>{v}</option>)}
                  </select>
                </label>
              </div>
            )}
          </div>

          <div className="pdSection">
            <h3>Upload Prescription (Optional)</h3>
            <p className="fine">Upload PDF, JPG or PNG (maximum 4 MB). Files are stored privately.</p>
            <input type="file" name="prescriptionFile" accept=".pdf,.jpg,.jpeg,.png" />
          </div>
          <label>
            Prescription notes
            <textarea
              name="rxNotes"
              placeholder="Optional notes about your prescription."
            />
          </label>

          <label className="radio">
            <input type="checkbox" required/>
            I confirm that the prescription information I entered matches the prescription provided to me.
          </label>

          {uploadError && (
            <p role="alert" style={{color:"#b91c1c"}}>
              {uploadError}
            </p>
          )}
          <button
            className="dark button"
            type="submit"
            disabled={uploading}
          >
            {uploading ? "Uploading prescription..." : "Review order"}
          </button>

          <style jsx>{`
            .rxTable{
              border:1px solid #d7dbe0;
              margin:18px 0 28px;
            }
            .rxHead,.rxRow{
              display:grid;
              grid-template-columns:1.15fr repeat(4,1fr);
              gap:16px;
              align-items:center;
              padding:18px;
            }
            .rxHead{
              border-bottom:1px solid #d7dbe0;
            }
            .rxRow+.rxRow{
              border-top:1px solid #d7dbe0;
            }
            .rxRow div{
              display:flex;
              flex-direction:column;
            }
            .rxRow small{
              color:#64748b;
              margin-top:4px;
            }
            select{
              width:100%;
              min-height:52px;
              padding:10px 12px;
              border:1px solid #cbd1d8;
              background:white;
              font:inherit;
              font-weight:600;
            }
            .pdSection{margin:26px 0;}
            .pdSection h3{margin:0 0 14px;font-size:1.15rem;}
            .pdType{display:flex;gap:28px;flex-wrap:wrap;margin-bottom:18px;}
            .pdType label{display:flex;align-items:center;gap:8px;font-weight:600;}
            .pdType input{width:auto;}
            .pdFields{display:grid;grid-template-columns:1fr 1fr;gap:18px;max-width:670px;}
            .pdFields label{font-weight:600;}
            .pdFields select{display:block;margin-top:10px;}
            .pdLabel{
              display:block;
              max-width:670px;
              font-weight:600;
              margin-bottom:10px;
            }
            .pdLabel select{
              display:block;
              margin-top:10px;
            }
            .rxHelp{
              color:#64748b;
              margin:10px 0 24px;
            }
            @media(max-width:700px){
              .rxHead{display:none}
              .rxRow{
                grid-template-columns:1fr 1fr;
              }
            }
            @media(max-width:480px){
              .rxRow{
                grid-template-columns:1fr;
              }
            }
          `}</style>
        </form>
      )}
    </main>
  );
}





