export const calculateDiscountedPrice = (price: number, discount: number, ) =>
  (price - price * (discount / 100)).toFixed(2);
