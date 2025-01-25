import {api} from "../../api";
import type {DefaultResponse} from "../../../types/response/DefaultResponse";
import type {LikePostRequest, UnlikePostRequest} from "../../../types/request/likeRequest";

const likeApi = api.injectEndpoints({
    endpoints: build => ({
        likePost: build.mutation<DefaultResponse, LikePostRequest>({
            query: body => ({
                url: "like",
                method: "POST",
                body: body
            })
        }),
        UnlikePost: build.mutation<DefaultResponse, UnlikePostRequest>({
            query: body => ({
                url: "like",
                method: "DELETE",
                body: body
            })
        })
    })
})

export const {useLikePostMutation, useUnlikePostMutation} = likeApi