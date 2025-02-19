import {api} from "../../api";
import type {CurrentUserResponse, GetUserResponse} from "../../../types/response/userResponse";
import type {Response} from "../../../types/response/response";

export const userApi = api.injectEndpoints({
    endpoints: build => ({
        currentUser: build.query<Response<CurrentUserResponse>,void>({
            query: body => ({
                url: "user/current",
                method: "GET",
            })
        }),
        getUserById: build.query<Response<GetUserResponse>, number>({
            query: userId => ({
                url: `user/${userId}`,
                method: "GET",
            })
        })
    })
})

export const {
    useLazyCurrentUserQuery,
    useCurrentUserQuery,
    useGetUserByIdQuery,
    useLazyGetUserByIdQuery
} = userApi