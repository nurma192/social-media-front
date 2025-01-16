import {createListenerMiddleware} from "@reduxjs/toolkit";
import {authApi} from "./authApi";

export const loginMiddleware = createListenerMiddleware()

loginMiddleware.startListening({
    matcher: authApi.endpoints.login.matchFulfilled,
    effect: async (action, listenerApi) => {
        listenerApi.cancelActiveListeners()
        if (action.payload.token) {
            localStorage.setItem("token", action.payload.token)
        }
    }
})

