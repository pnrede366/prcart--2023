import { createSlice } from '@reduxjs/toolkit'
import { getCookie } from '../../Helper/utility';

export const auth = createSlice({
    name: 'auth',
    initialState: { token: getCookie('token') },
    reducers: {
        addToken(state, action) {
            if (action.payload.token) {
                state.token = action.payload.token;
            }
        },        
    }
})

export const { addToken } = auth.actions
export default auth.reducer