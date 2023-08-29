import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        storeUser(state, action) {
            return action.payload
        }
    }
})

export const {storeUser} = user.actions

export default user.reducer