import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from './../../axios';

export const fetchBrands = createAsyncThunk(
  'brands/fetchBrands',
  async (_, { dispatch }) => {
    const { data } = await axios.get('/brands');
    dispatch(setBrands(data));
  }
);

const brandsSlice = createSlice({
  name: 'brands',
  initialState: { brands: [] },
  reducers: {
    setBrands(state, action) {
      state.brands = action.payload;
    },
  },
});

// selectors

export const brandsSelector = (state) => state.brands.brands;

export const { setBrands } = brandsSlice.actions;

export default brandsSlice.reducer;
