import { createSlice } from '@reduxjs/toolkit';

const bookmarksSlice = createSlice({
    name: 'bookmarks',
    initialState: {products: []},
    reducers: {
        addProduct(state, action) {
            state.products.push(action.payload);
        },
        removeProduct(state, action) {
            state.products = state.products.filter(product => product.id !== action.payload.id);
        },
    },
})

export const {addProduct, removeProduct} = bookmarksSlice.actions;

export default bookmarksSlice.reducer;