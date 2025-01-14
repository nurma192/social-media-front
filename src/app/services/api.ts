import {fetchBaseQuery, retry} from "@reduxjs/toolkit/query/react";
import {BASE_URL} from "../../constants";
import {createApi} from "@reduxjs/toolkit/query/react";
import type {RootState} from "../store";

const baseQuery = fetchBaseQuery({
    baseUrl: `${BASE_URL}/`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token

        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }

        return headers
    },
})

const baseQueryWithRetry = retry(baseQuery, {maxRetries: 1})

export const api = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQueryWithRetry,
    endpoints: () => ({}),

    // refetchOnMountOrArgChange: true,
})