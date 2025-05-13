import { priceToTTC } from "./utils.js";

const priceHT = [
  { name: "Apple", priceHT: 1.0, priceTTC: null },
  { name: "Orange", priceHT: 1.2, priceTTC: null },
  { name: "Rasberry", priceHT: 2.5, priceTTC: null },
];

priceHT.map((item) => (item.priceTTC = priceToTTC(item.priceHT)));

console.log(priceHT);
