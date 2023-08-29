import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/"
import { getUsers } from "../Service/getUsers";
import { category } from "../Service/category";
import { product } from "../Service/product";
import CartReducer from './Slice/Cart'
import { cart } from "../Service/cart";
import auth from "./Slice/auth"
import { order } from "../Service/orders";
import user from "./Slice/user"
import productSlice from './Slice/product'

export const store = configureStore({
    reducer: {
        [getUsers.reducerPath]: getUsers.reducer,
        [category.reducerPath]: category.reducer,
        [product.reducerPath]: product.reducer,
        [cart.reducerPath]: cart.reducer,
        [order.reducerPath]: order.reducer,
        CartReducer,
        auth,
        user,
        productSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(getUsers.middleware).concat(category.middleware).concat(product.middleware).concat(cart.middleware).concat(order.middleware),
})

setupListeners(store.dispatch)
