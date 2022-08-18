import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import ordersSlice from "./ordersSlice";
import bookmarksSlice from "./bookmarksSlice";

export default configureStore({
    reducer: {
        cart: cartSlice,
        orders: ordersSlice,
        bookmarks: bookmarksSlice,
    }, 
});