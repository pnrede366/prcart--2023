import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/"
import { getUsers } from "../Service/getUsers";
import { category } from "../Service/category";
import { product } from "../Service/product";

export const store = configureStore({
    reducer: {
        [getUsers.reducerPath]: getUsers.reducer,
        [category.reducerPath]: category.reducer,
        [product.reducerPath]: product.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(getUsers.middleware).concat(category.middleware).concat(product.middleware),
})

setupListeners(store.dispatch)
