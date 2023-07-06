import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from './../../axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, { dispatch }) => {
  const { data } = await axios.get('/products');
  dispatch(setProducts(data));
});

const productsSlice = createSlice({
  name: 'products',
  initialState: { products: [] },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
  },
});

// selectors

export const productsSelector = (state) => state.products.products;

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
