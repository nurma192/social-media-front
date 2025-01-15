import type {Middleware, MiddlewareAPI} from "redux";
import {isFulfilled, isRejectedWithValue} from "@reduxjs/toolkit";
import {toast} from "sonner";
import {messageCatch} from "../../utils/messageCatch";


export const notificationMiddleware: Middleware =
    (api: MiddlewareAPI) => (next) => (action) => {
        if (isFulfilled(action)) {
            console.log("isFulfilled", messageCatch(action.payload, "Success"))
            console.log("action:", action)
            toast.success(messageCatch(action.payload, "Success"));
        }

        if (isRejectedWithValue(action)) {
            console.log("isRejectedWithValue", messageCatch(action.payload, "Error"))
            console.log("action:", action)
            toast.error(messageCatch(action.payload, "Error"));
        }
        return next(action);
    }