import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import axios from '../../axios';

export const getItemPrice = (product, discountPromocode) => {
  const priceItem = Math.floor((product.price * (100 - product.discount)) / 100);
  const priceWithDiscount = Math.floor((priceItem * (100 - discountPromocode)) / 100);
  return priceWithDiscount;
};

const getDiscountItem = (product, discountPromocode) => {
  const initPrice = product.price;
  const discountPrice = getItemPrice(product, discountPromocode);

  return initPrice - discountPrice;
};

const getTotalCount = (products, discountPromocode) => {
  let totalCount = 0;
  for (let product of products) {
    totalCount += getItemPrice(product, discountPromocode);
  }

  return totalCount;
};

export const getTotalDiscount = (products, discountPromocode) => {
  let totalDiscount = 0;
  for (let product of products) {
    totalDiscount += getDiscountItem(product, discountPromocode);
  }

  return totalDiscount;
};

export const fetchPromocodes = createAsyncThunk(
  'products/fetchPromocodes',
  async (_, { dispatch }) => {
    const { data } = await axios.get('/promocodes');
    dispatch(setPromocodes(data));
  },
);

const initialState = {
  products: [],
  totalCount: 0,
  totalDiscount: 0,
  activePromocode: undefined,
  discountPromocode: 0,
};

const cartSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct(state, action) {
      state.products.push(action.payload);
      state.totalCount = getTotalCount(state.products, state.discountPromocode);
      state.totalDiscount = getTotalDiscount(state.products, state.discountPromocode);
    },
    removeProduct(state, action) {
      state.products = state.products.filter((product) => product.id !== action.payload.id);
      state.totalCount = getTotalCount(state.products, state.discountPromocode);
      state.totalDiscount = getTotalDiscount(state.products, state.discountPromocode);
    },
    applyPromocode(state, action) {
      state.activePromocode = action.payload.code;
      state.discountPromocode = action.payload.discountPromocode;
      state.totalCount = getTotalCount(state.products, state.discountPromocode);
      state.totalDiscount = getTotalDiscount(state.products, state.discountPromocode);
    },
    clearCart(state) {
      state = initialState;
    },
  },
});

// selectors

export const getCartSelector = (state) => state.cart;
export const totalCountSelector = (state) => state.cart.totalCount;
export const discountPromocodeSelector = (state) => state.cart.discountPromocode || 0;
export const productsInCartSelector = (state) => state.cart.products;

export const { addProduct, removeProduct, applyPromocode, clearCart, setPromocodes } =
  cartSlice.actions;

export default cartSlice.reducer;
