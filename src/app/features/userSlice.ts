import {createSlice} from "@reduxjs/toolkit";
import type {RootState} from "../store";
import {userApi} from "./user/userApi";
import {authApi} from "./auth/authApi";
import type {User} from "../../types/User";

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
            .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
                state.token = action.payload.token
                state.isAuthenticated = true
            })
            .addMatcher(userApi.endpoints.currentUser.matchFulfilled, (state, action) => {
                state.currentUser = action.payload.user
                state.isAuthenticated = true
            })
            // .addMatcher(userApi.endpoints.getUserByID.matchFulfilled, (state, action) => {
            //     state.user = action.payload
            // })
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
