import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import ordersSlice from "./ordersSlice";

export default configureStore({
    reducer: {
        cart: cartSlice,
        orders: ordersSlice,
    }, 
});