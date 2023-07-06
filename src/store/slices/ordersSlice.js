import { createSlice } from '@reduxjs/toolkit';


const ordersSlice = createSlice({
    name: 'orders',
    initialState: {products: [], totalCount: 0, discountPromocode: 0},
    reducers: {
        makeOrder(state, action) {
            state.products = action.payload.products;
            state.totalCount = action.payload.totalCount;
            state.discountPromocode = action.payload.discountPromocode;
        }
    },
})

export const {makeOrder} = ordersSlice.actions;

export default ordersSlice.reducer;