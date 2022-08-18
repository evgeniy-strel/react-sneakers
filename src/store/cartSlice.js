import { createSlice, current } from '@reduxjs/toolkit';
import { getFinalPrice, getSumProducts } from './../components/UsefulMethods/UsefulMethods';

const cartSlice = createSlice({
    name: 'products',
    initialState: {products: [], totalCount: 0, activePromocode: null, discountPromocode: 0},
    reducers: {
        addProduct(state, action) {
            state.products.push(action.payload);
            state.totalCount += getFinalPrice(action.payload.price, action.payload.discount);
        },
        removeProduct(state, action) {
            state.products = state.products.filter(product => product.id !== action.payload.id);
            state.totalCount -= getFinalPrice(action.payload.price, action.payload.discount);
        },
        applyPromocode(state, action) {
            state.activePromocode = action.payload.code;
            state.discountPromocode = action.payload.discountPromocode;
            state.totalCount = getSumProducts(current(state).products, action.payload.discountPromocode);
        },
        clearCart(state) {
            state.products = [];
            state.totalCount = 0;
            state.activePromocode = null;
            state.discountPromocode = 0;
            console.log('qqqqqqqqq');
        }
    },
})

export const {addProduct, removeProduct, applyPromocode, clearCart} = cartSlice.actions;

export default cartSlice.reducer;