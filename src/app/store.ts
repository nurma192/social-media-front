import {configureStore} from "@reduxjs/toolkit"
import {api} from "./services/api";
import userSlice from "./features/userSlice";
import {notificationMiddleware} from "./middleware/notificationMiddleware";
import {loginMiddleware} from "./features/auth/authMiddleware";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        // auth: authSlice,
        user: userSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(api.middleware)
            .concat(notificationMiddleware)
            .concat(loginMiddleware.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;