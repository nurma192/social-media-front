import {api} from "../../api";
import {type DefaultResponse} from "../../../types/response/DefaultResponse";
import type {
    CreatePostComment,
    DeletePostComment,
    GetPostCommentsRequest,
    UpdatePostComment
} from "../../../types/request/PostCommentRequests";
import type {GetPostCommentsResponse} from "../../../types/response/PostCommentResponse";

export const postCommentApi = api.injectEndpoints({
    endpoints: build => ({
        createPostComment: build.mutation<DefaultResponse, CreatePostComment>({
            query: body => ({
                url: `postComments`,
                method: "POST",
                body: body
            })
        }),
        updatePostComment: build.mutation<DefaultResponse, UpdatePostComment>({
            query: body => ({
                url: `postComments`,
                method: "PUT",
                body: body
            })
        }),
        deletePostComment: build.mutation<DefaultResponse, DeletePostComment>({
            query: body => ({
                url: `postComments`,
                method: "DELETE",
                body: body
            })
        }),
        getPostComments: build.query<GetPostCommentsResponse, GetPostCommentsRequest>({
            query: body => ({
                url: `postComments/${body.postId}`,
                method: "GET"
            })
        })
    })
})

export const {
    useCreatePostCommentMutation,
    useDeletePostCommentMutation,
    useUpdatePostCommentMutation,
    useGetPostCommentsQuery,
    useLazyGetPostCommentsQuery
} = postCommentApi