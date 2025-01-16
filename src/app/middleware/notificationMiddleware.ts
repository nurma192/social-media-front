import type {Middleware, MiddlewareAPI} from "redux";
import {isFulfilled, isRejectedWithValue} from "@reduxjs/toolkit";
import {toast} from "sonner";
import {messageCatch} from "../../utils/messageCatch";


export const notificationMiddleware: Middleware =
    (api: MiddlewareAPI) => (next) => (action) => {
        if (isFulfilled(action)) {
            const message = messageCatch(action.payload)
            if (message !== "") {
                toast.success(message);
            }
        }

        if (isRejectedWithValue(action)) {
            const message = messageCatch(action.payload)
            if (message !== "") {
                toast.error(message);
            }
        }
        return next(action);
    }