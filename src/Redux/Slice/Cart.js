import { createSlice } from '@reduxjs/toolkit'

export const cart = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addProduct(state, action) {
            if (Array.isArray(action.payload)) {
                return action.payload
            }
            state.push(action.payload)
        },
        updateProductQuantity(state, action) {
            const { productId, quantity } = action.payload;
            const productIndex = state.findIndex(item => item.productId === productId);
            if (productIndex !== -1) {
                state[productIndex].quantity = quantity;
            }
        },
        removeProduct(state, action) {
            return state.filter((item) => action.payload.productId !== item.productId)
        }
    }
})

export const { addProduct, removeProduct,updateProductQuantity } = cart.actions
export default cart.reducer