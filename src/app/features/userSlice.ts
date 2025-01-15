import type {User} from "../types";
import {createSlice} from "@reduxjs/toolkit";
import {userApi} from "../services/userApi";
import type {RootState} from "../store";

interface InitialState {
    user: User | null
    isAuthenticated: boolean
    users: User[] | null
    currentUser: User | null
    token?: string
}

const initialState: InitialState = {
    user: null,
    isAuthenticated: false,
    users: [],
    currentUser: null
}

const slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: () => initialState,
        resetUser: (state) => {
            state.user = null;
        }
    },
    extraReducers: builder => (
        builder
            .addMatcher(userApi.endpoints.login.matchFulfilled, (state, action) => {
                state.token = action.payload.token
                state.isAuthenticated = true
            })
            .addMatcher(userApi.endpoints.current.matchFulfilled, (state, action) => {
                state.currentUser = action.payload
                state.isAuthenticated = true
            })
            .addMatcher(userApi.endpoints.getUserByID.matchFulfilled, (state, action) => {
                state.user = action.payload
            })
    )
})

export const { logout, resetUser } = slice.actions
export default slice.reducer

export const selectIsAuthenticated = (state: RootState) => {
    return state.user.isAuthenticated
}
export const selectCurrentUser = (state: RootState) => {
    return state.user.currentUser
}
export const selectUser = (state: RootState) => {
    return state.user
}
