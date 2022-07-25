import React from 'react';

export const getFinalPrice = (price, discountProduct, discountPromocode) => {
  console.log(`${price} ${discountProduct} ${discountPromocode}`);
  let finalPrice = price;
  if (discountProduct) {
    finalPrice = Math.round((price * (100 - discountProduct)) / 1000) * 10;
  }
  if (discountPromocode) {
    finalPrice = Math.round((finalPrice * (100 - discountPromocode)) / 1000) * 10;
  }
  return finalPrice;
};

export const getSumProducts = (products, discountPromocode) => {
  return products.reduce(
    (initialValue, product) =>
      initialValue + getFinalPrice(product.price, product.discount, discountPromocode),
    0,
  );
};

export const getAllSumOfDiscount = (products, discountPromocode) => {
  return products.reduce(
    (initialValue, product) =>
      initialValue +
      (product.price - getFinalPrice(product.price, product.discount, discountPromocode)),
    0,
  );
};
