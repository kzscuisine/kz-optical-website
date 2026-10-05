export const products = [
  {
    "id": "nano-bunny-400",
    "brand": "Nano Vista",
    "name": "Bunny 3.0",
    "model": "NAO400-05",
    "audience": "Kids",
    "image": "/westgroupe/01-bunny-3-0-nao400-05.jpg"
  },
  {
    "id": "nano-glow-fanboy",
    "brand": "Nano Vista",
    "name": "Glow / Fanboy",
    "model": "NAO317-20",
    "audience": "Kids",
    "image": "/westgroupe/02-glow-fanboy-nao317-20-fangame-nao303-19-pixel-nao307-16.jpg"
  },
  {
    "id": "nano-glow-sprite",
    "brand": "Nano Vista",
    "name": "Glow / Sprite",
    "model": "NAO306-07",
    "audience": "Kids",
    "image": "/westgroupe/03-glow-sprite-nao306-07-camper-nao304-23.jpg"
  },
  {
    "id": "nano-indestructible-loading",
    "brand": "Nano Vista",
    "name": "Indestructible Loading 3.0",
    "model": "NAO327",
    "audience": "Kids",
    "image": "/westgroupe/04-indestructible-loading-3-0-nao327-01-02.jpg"
  },
  {
    "id": "nano-indestructible-meta",
    "brand": "Nano Vista",
    "name": "Indestructible Meta 3.0",
    "model": "NAO341-04",
    "audience": "Kids",
    "image": "/westgroupe/05-indestructible-meta-3-0-nao341-04.jpg"
  },
  {
    "id": "nano-little-chick",
    "brand": "Nano Vista",
    "name": "Little Chick 3.0",
    "model": "NAO405-01",
    "audience": "Kids",
    "image": "/westgroupe/06-little-chick-3-0-nao405-01.jpg"
  },
  {
    "id": "otp-217",
    "brand": "One True Pair",
    "name": "OTP 217",
    "model": "OTP-217",
    "audience": "Adult",
    "image": "/westgroupe/07-otp-217-jan.jpg"
  },
  {
    "id": "otp-219",
    "brand": "One True Pair",
    "name": "OTP 219",
    "model": "OTP-219",
    "audience": "Adult",
    "image": "/westgroupe/08-otp-219-jan.jpg"
  },
  {
    "id": "otp-221",
    "brand": "One True Pair",
    "name": "OTP 221 / 223",
    "model": "OTP-221",
    "audience": "Adult",
    "image": "/westgroupe/09-otp-221-mar-otp-223-mar.jpg"
  },
  {
    "id": "otp-228",
    "brand": "One True Pair",
    "name": "OTP 228 / 226",
    "model": "OTP-228",
    "audience": "Adult",
    "image": "/westgroupe/10-otp-228-jul-otp-226-may.jpg"
  },
  {
    "id": "sf-1188t",
    "brand": "Superflex",
    "name": "Superflex 1188T / 1187T",
    "model": "SF-1188T",
    "audience": "Adult",
    "image": "/westgroupe/11-sf-1188t-m102-may-sf-1187t-m107-mar.jpg"
  },
  {
    "id": "sf-660",
    "brand": "Superflex",
    "name": "Superflex 660",
    "model": "SF-660",
    "audience": "Adult",
    "image": "/westgroupe/12-sf-660-s402-sept-2024.jpg"
  },
  {
    "id": "sf-662",
    "brand": "Superflex",
    "name": "Superflex 662 / 674",
    "model": "SF-662",
    "audience": "Adult",
    "image": "/westgroupe/13-sf-662-s312-nov-2024-sf-674-s401-sept.jpg"
  },
  {
    "id": "sf-663",
    "brand": "Superflex",
    "name": "Superflex 663",
    "model": "SF-663",
    "audience": "Adult",
    "image": "/westgroupe/14-sf-663-s409-jan.jpg"
  },
  {
    "id": "sfk-334",
    "brand": "Superflex Kids",
    "name": "Superflex Kids 334 / 335",
    "model": "SFK-334",
    "audience": "Kids",
    "image": "/westgroupe/15-sfk-334-s209-sfk-335-s303-june.jpg"
  },
  {
    "id": "sfk-337",
    "brand": "Superflex Kids",
    "name": "Superflex Kids 337",
    "model": "SFK-337",
    "audience": "Kids",
    "image": "/westgroupe/16-sfk-337-s401-june.jpg"
  },
  {
    "id": "sfk-341",
    "brand": "Superflex Kids",
    "name": "Superflex Kids 341",
    "model": "SFK-341",
    "audience": "Kids",
    "image": "/westgroupe/17-sfk-341-s300-june.jpg"
  },
  {
    "id": "sfk-344",
    "brand": "Superflex Kids",
    "name": "Superflex Kids 344 / 346",
    "model": "SFK-344",
    "audience": "Kids",
    "image": "/westgroupe/18-sfk-344-s401-sfk-346-s304-sept-v2.jpg"
  },
  {
    "id": "stepper-20165",
    "brand": "Stepper",
    "name": "Stepper Origin 20165",
    "model": "SI-20165-F200",
    "audience": "Adult",
    "image": "/westgroupe/19-stepper-origin-si-20165-f200.jpg"
  },
  {
    "id": "stepper-30248",
    "brand": "Stepper",
    "name": "Stepper Origin 30248",
    "model": "SI-30248-F830",
    "audience": "Adult",
    "image": "/westgroupe/20-stepper-origin-si-30248-f830.jpg"
  }
] as const;
export type Product = typeof products[number];
export function getProduct(id:string){return products.find(p=>p.id===id)}
