import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {isLoggedIn: false, fullName: ''}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            state.isLoggedIn = true
            state.fullName = action.payload
        },
        logout(state) {
            state.isLoggedIn = false
            state.fullName = ''
        }
    }
})

export const authActions = authSlice.actions

export default authSlice.reducer