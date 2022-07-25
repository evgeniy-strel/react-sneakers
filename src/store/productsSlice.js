import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
    name: 'cart',
    initialState: {products: []},
    reducers: {
        setProducts(state, action) {
            state.products = action.payload;
        },
    },
})

export const {setProducts} = productsSlice.actions;

export default productsSlice.reducer;