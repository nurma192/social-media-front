import {api} from "../../services/api";

export const userApi = api.injectEndpoints({
    endpoints: build => ({
        current: build.mutation({
            query: body => ({
                url: "user/current",
                method: "GET",
            })
        })
    })
})