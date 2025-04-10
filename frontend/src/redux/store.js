import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import productsReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice"
import checkoutSlice from "./slices/checkoutSlice"
import orderReducer from  "./slices/orderSlice"
import adminReducer from "./slices/adminSlice"
import adminProductReducer from "./slices/AdminProductSlice"
import adminOrdersReducer from "./slices/adminOrderSlice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productsReducer,
        cart: cartReducer,
        checkout: checkoutSlice,
        orders: orderReducer,
        admin: adminReducer,
        adminProducts: adminProductReducer,
        adminOrders: adminOrdersReducer,
    },
})

export default store;