export const priceToTTC = (priceNoTax) => {
  return +(priceNoTax * 1.2).toFixed(2);
};
