import { createSlice } from "@reduxjs/toolkit";

export const product = createSlice({
    name: 'product',
    initialState: [],
    reducers: {
        addProduct(state, action) {
            const product = action.payload
            if (Array.isArray(product)) {
                return product
            }
            state.push(product)
        }
    }
})

export const { addProduct } = product.actions

export default product.reducer