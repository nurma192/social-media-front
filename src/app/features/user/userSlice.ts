import {createSlice} from "@reduxjs/toolkit";
import type {RootState} from "../../store";
import {userApi} from "./userApi";
import {authApi} from "../auth/authApi";
import type {User} from "../../../types/User";

interface InitialState {
    user: User | null
    isAuthenticated: boolean
    users: User[] | null
    currentUser: User | null
    token?: string
}

let initialState: InitialState = {
    user: null,
    isAuthenticated: !!localStorage.getItem("token"),
    users: [],
    currentUser: null,
    token: localStorage.getItem("token") || undefined,
}

const slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: () => {
            localStorage.removeItem("token")
            return {
                ...initialState,
                isAuthenticated: false,
                token: undefined,
            };
        },
        resetUser: (state) => {
            state.user = null;
        },
        resetToken: (state, action) => {
            console.log("resetTokenAction", action)
            localStorage.setItem("token", action.payload.data.token)
            state.token = action.payload.data.token
            state.isAuthenticated = true
        }
    },
    extraReducers: builder => (
        builder
            .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
                state.token = action.payload.result.token
                state.isAuthenticated = true
            })
            .addMatcher(userApi.endpoints.currentUser.matchFulfilled, (state, action) => {
                state.currentUser = action.payload.result.user
                state.isAuthenticated = true
            })
            .addMatcher(authApi.endpoints.refreshToken.matchFulfilled, (state, action) => {
                localStorage.setItem("token", action.payload.result.token)
                state.token = action.payload.result.token
                state.isAuthenticated = true
            })
            .addMatcher(userApi.endpoints.getUserById.matchFulfilled, (state, action) => {
                state.user = action.payload.result.user
            })
    )
})

export const { logout, resetUser, resetToken } = slice.actions
export default slice.reducer

export const selectIsAuthenticated = (state: RootState) => {
    return state.user.isAuthenticated
}
export const selectCurrentUser = (state: RootState) => {
    return state.user.currentUser
}
export const selectUser = (state: RootState) => {
    return state.user.user
}
