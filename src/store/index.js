import { configureStore } from '@reduxjs/toolkit';
import products from './slices/productsSlice';
import cart from './slices/cartSlice';
import orders from './slices/ordersSlice';
import bookmarks from './slices/bookmarksSlice';
import brands from './slices/brandsSlice';

export default configureStore({
  reducer: {
    products,
    cart,
    orders,
    bookmarks,
    brands,
  },
});
