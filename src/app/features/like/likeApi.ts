import {api} from "../../api";
import type {LikePostRequest, UnlikePostRequest} from "../../../types/request/likeRequest";
import type {Response} from "../../../types/response/response";

const likeApi = api.injectEndpoints({
    endpoints: build => ({
        likePost: build.mutation<Response<any>, LikePostRequest>({
            query: body => ({
                url: "like",
                method: "POST",
                body: body
            })
        }),
        UnlikePost: build.mutation<Response<any>, UnlikePostRequest>({
            query: body => ({
                url: "like",
                method: "DELETE",
                body: body
            })
        })
    })
})

export const {useLikePostMutation, useUnlikePostMutation} = likeApi