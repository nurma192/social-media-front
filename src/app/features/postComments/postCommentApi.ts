import {api} from "../../api";
import {type DefaultResponse} from "../../../types/response/DefaultResponse";
import type {
    CreatePostComment,
    DeletePostComment,
    GetPostCommentsRequest,
    UpdatePostComment
} from "../../../types/request/PostCommentRequests";
import type {GetPostCommentsResponse} from "../../../types/response/PostCommentResponse";
import type {PaginationResponse, Response} from "../../../types/response/response";

export const postCommentApi = api.injectEndpoints({
    endpoints: build => ({
        createPostComment: build.mutation<Response<any>, CreatePostComment>({
            query: body => ({
                url: `postComments`,
                method: "POST",
                body: body
            })
        }),
        updatePostComment: build.mutation<Response<any>, UpdatePostComment>({
            query: body => ({
                url: `postComments`,
                method: "PUT",
                body: body
            })
        }),
        deletePostComment: build.mutation<Response<any>, DeletePostComment>({
            query: body => ({
                url: `postComments`,
                method: "DELETE",
                body: body
            })
        }),
        getPostComments: build.query<Response<PaginationResponse<GetPostCommentsResponse>>, GetPostCommentsRequest>({
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