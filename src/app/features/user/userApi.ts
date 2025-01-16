import {api} from "../../api";
import type {CurrentUserResponse} from "../../../types/response/userResponse";

export const userApi = api.injectEndpoints({
    endpoints: build => ({
        currentUser: build.query<CurrentUserResponse,void>({
            query: body => ({
                url: "user/current",
                method: "GET",
            })
        })
    })
})

export const {
    useLazyCurrentUserQuery,
    useCurrentUserQuery
} = userApi