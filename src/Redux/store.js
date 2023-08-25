import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/"
import { getUsers } from "../Service/getUsers";

export const store = configureStore({
    reducer: {
        [getUsers.reducerPath]: getUsers.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(getUsers.middleware),
})

setupListeners(store.dispatch)
