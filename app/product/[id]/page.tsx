import {superflexTitanCatalogue} from "../../../lib/superflex-titan-catalogue";
import {superflexKidsCatalogue} from "../../../lib/superflex-kids-catalogue";
const superflexProductPhotos = {"sf-671":"/westgroupe/SF-671/676190774368_W00.JPG","sf-686":"/westgroupe/SF-686/676190874969_W00.JPG","sf-630":"/westgroupe/SF-630/676190688658_W00.JPG","sf-693":"/westgroupe/SF-693/676190896855_W00.JPG","sf-652":"/westgroupe/SF-652/676190730234_W00.JPG","sf-645":"/westgroupe/SF-645/676190713091_W00.JPG","sf-695":"/westgroupe/SF-695/881814540216_W00.JPG","sf-632":"/westgroupe/SF-632/676190685398_W00.JPG","sf-626":"/westgroupe/SF-626/676190662184_W00.JPG","sf-677":"/westgroupe/SF-677/676190864465_W00.JPG","sf-633":"/westgroupe/SF-633/676190693386_W00.JPG","sf-667":"/westgroupe/SF-667/676190774122_W00.JPG","sf-613":"/westgroupe/SF-613/676190616200_W00.JPG","sf-664":"/westgroupe/SF-664/676190765236_W00.JPG","sf-648":"/westgroupe/SF-648/676190719208_W00.JPG","sf-660":"/westgroupe/SF-660/676190751406_W00.JPG","sf-650":"/westgroupe/SF-650/676190723113_W00.JPG","sf-666":"/westgroupe/SF-666/676190772548_W00.JPG","sf-696":"/westgroupe/SF-696/881814540452_W00.JPG","sf-689":"/westgroupe/SF-689/676190878370_W00.JPG","sf-665":"/westgroupe/SF-665/676190773064_W00.JPG","sf-639":"/westgroupe/SF-639/676190706628_W00.JPG","sf-590":"/westgroupe/SF-590/676190586558_W00.JPG","sf-649":"/westgroupe/SF-649/676190719727_W00.JPG","sf-615":"/westgroupe/SF-615/676190639254_W00.JPG","sf-688":"/westgroupe/SF-688/676190879377_W00.JPG","sf-641":"/westgroupe/SF-641/676190706888_W00.JPG","sf-692":"/westgroupe/SF-692/676190887297_W00.JPG","sf-654":"/westgroupe/SF-654/676190744385_W00.JPG","sf-680":"/westgroupe/SF-680/676190868425_W00.JPG","sf-655":"/westgroupe/SF-655/676190744934_W00.JPG","sf-617":"/westgroupe/SF-617/676190647891_W00.JPG","sf-638":"/westgroupe/SF-638/676190695458_W00.JPG","sf-683":"/westgroupe/SF-683/676190869187_W00.JPG","sf-663":"/westgroupe/SF-663/676190764994_W00.JPG","sf-670":"/westgroupe/SF-670/676190783773_W00.JPG","sf-676":"/westgroupe/SF-676/676190864229_W00.JPG","sf-612":"/westgroupe/SF-612/676190617450_W00.JPG","sf-662":"/westgroupe/SF-662/676190751949_W00.JPG","sf-656":"/westgroupe/SF-656/676190746228_W00.JPG","sf-642":"/westgroupe/SF-642/676190718140_W00.JPG","sf-657":"/westgroupe/SF-657/676190749687_W00.JPG","sf-581":"/westgroupe/SF-581/676190463453_W00.JPG","sf-669":"/westgroupe/SF-669/676190779547_W00.JPG","sf-635":"/westgroupe/SF-635/676190694000_W00.JPG","sf-661":"/westgroupe/SF-661/676190750461_W00.JPG","sf-620":"/westgroupe/SF-620/676190643381_W00.JPG","sf-684":"/westgroupe/SF-684/676190876307_W00.JPG","sf-687":"/westgroupe/SF-687/676190876826_W00.JPG","sf-637":"/westgroupe/SF-637/676190695113_W00.JPG","sf-668":"/westgroupe/SF-668/676190774603_W00.JPG","sf-587":"/westgroupe/SF-587/676190466584_W00.JPG","sf-674":"/westgroupe/SF-674/676190858471_W00.JPG","sf-570":"/westgroupe/SF-570/676190433739_W00.JPG","sf-484":"/westgroupe/SF-484/881814504744_W00.JPG","sf-530":"/westgroupe/SF-530/676190348699_W00.JPG","sf-658":"/westgroupe/SF-658/676190750201_W00.JPG","sf-640":"/westgroupe/SF-640/676190695212_W00.JPG","sf-659":"/westgroupe/SF-659/676190749946_W00.JPG","sf-554":"/westgroupe/SF-554/676190399837_W00.JPG","sf-634":"/westgroupe/SF-634/676190693140_W00.JPG","sf-651":"/westgroupe/SF-651/676190730920_W00.JPG","sf-675":"/westgroupe/SF-675/676190860528_W00.JPG","sf-603":"/westgroupe/SF-603/676190609745_W00.JPG","sf-691":"/westgroupe/SF-691/676190887532_W00.JPG","sf-564":"/westgroupe/SF-564/676190426328_W00.JPG","sf-681":"/westgroupe/SF-681/676190868661_W00.JPG","sf-622":"/westgroupe/SF-622/676190648133_W00.JPG","sf-672":"/westgroupe/SF-672/676190835861_W00.JPG","sf-690":"/westgroupe/SF-690/676190878639_W00.JPG","sf-673":"/westgroupe/SF-673/676190857528_W00.JPG","sf-682":"/westgroupe/SF-682/676190868920_W00.JPG","sf-597":"/westgroupe/SF-597/676190606966_W00.JPG","sf-653":"/westgroupe/SF-653/676190741971_W00.JPG","sf-621":"/westgroupe/SF-621/676190644319_W00.JPG","sf-644":"/westgroupe/SF-644/676190711905_W00.JPG","sf-685":"/westgroupe/SF-685/676190879131_W00.JPG","sf-629":"/westgroupe/SF-629/676190674699_W00.JPG","sf-694":"/westgroupe/SF-694/881814535984_W00.JPG","sf-566":"/westgroupe/SF-566/676190430929_W00.JPG","sf-628":"/westgroupe/SF-628/676190664362_W00.JPG","sf-678":"/westgroupe/SF-678/676190870282_W00.JPG","sf-643":"/westgroupe/SF-643/676190722192_W00.JPG","sf-679":"/westgroupe/SF-679/676190870640_W00.JPG","sf-598":"/westgroupe/SF-598/676190609509_W00.JPG","sf-647":"/westgroupe/SF-647/676190718942_W00.JPG"};
import {notFound} from "next/navigation";import Link from "next/link";import {products,getProduct} from "../../../lib/products";import ProductOrder from "../../../components/product-order";import CatalogueFrameOrder from "../../../components/catalogue-frame-order";import {superflexCatalogue} from "../../../lib/superflex-catalogue";
export function generateStaticParams(){return [...products,...superflexCatalogue,...superflexKidsCatalogue,...superflexTitanCatalogue].map(p=>({id:p.id}))}
export default async function ProductPage({params}:{params:Promise<{id:string}>}){const {id}=await params;const p=superflexKidsCatalogue.find(p=>p.id===id) || superflexTitanCatalogue.find(p=>p.id===id) || getProduct(id) || superflexCatalogue.find(p=>p.id===id);if(!p)return notFound();return <main className="page">
<Link className="back" href="/eyeglasses">Back to eyeglasses</Link>
{(p.id.startsWith("sfk-") || p.brand === "Superflex Titan") ? (
<CatalogueFrameOrder product={p}/>
) : (
<div className="productDetail">
<div>
<img className="detailImage" src={(p.id === "sf-1205t" ? "/westgroupe/SF-1205T/881814546331_W00.JPG" : ((superflexProductPhotos as Record<string,string>)[p.id] || p.image))} alt={p.name}/>
<p className="fine">Catalogue photograph of a representative colour. Colours and sizes subject to stock confirmation.</p>
</div>
<div>
<small>{p.brand}</small>
<h1>{p.name}</h1>
<p className="model">{p.model} - {p.audience}</p>
<p>Choose your lenses and prescription options below.</p>
{"colors" in p ? <CatalogueFrameOrder product={p}/> : <ProductOrder product={p}/>}
</div>
</div>
)}
</main>}






