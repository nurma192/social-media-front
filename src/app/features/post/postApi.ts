import {api} from "../../api";
import type {GetAllPostsResponse, GetPostsResponse} from "../../../types/response/PostResponse";
import type {CreatePostRequest, GetAllPostsRequest, UpdatePostRequest} from "../../../types/request/postRequest";
import type {DefaultResponse} from "../../../types/response/DefaultResponse";

export const postApi = api.injectEndpoints({
        endpoints: build => ({
            getAllPosts: build.query<GetAllPostsResponse, GetAllPostsRequest | void>({
                query: body => {
                    const limit = body?.limit ?? 10
                    const page = body?.page ?? 1

                    return {
                        url: `posts?page=${page}&limit=${limit}`,
                        method: "GET",
                    }
                }
            }),
            getPostById: build.query<GetPostsResponse, string>({
                query: body => ({
                    url: `posts/${body}`,
                    method: "GET",
                    // providesTags: () => [{type: 'Post', id: 'POST'}],
                })
            }),
            createPost: build.mutation<DefaultResponse, CreatePostRequest>({
                query: body => {
                    const formData = new FormData();
                    formData.append("contentText", body.contentText);
                    if (body.images) {
                        body.images.forEach(image => {
                            formData.append("images", image);
                        })
                    }
                    return {
                        url: "posts",
                        method: "POST",
                        body: formData
                    };
                }
            }),
            deletePost: build.mutation<DefaultResponse, string>({
                query: (postId) => ({
                    url: `/posts/${postId}`,
                    method: "DELETE"
                })
            }),
            updatePost: build.mutation<DefaultResponse, UpdatePostRequest>({
                query: (body) => {
                    const formData = new FormData();
                    formData.append("contentText", body.contentText);
                    if (body.newImages) {
                        body.newImages.forEach(image => {
                            formData.append("newImages", image);
                        })
                    }
                    if (body.deletedImagesId) {
                        body.deletedImagesId.forEach(imageId => {
                            formData.append("deletedImagesId", imageId);
                        })
                    }
                    return {
                        url: `/posts/${body.postId}`,
                        method: "PUT",
                        body: formData
                    }
                }
            })
        })
    })
;

export const {
    useGetAllPostsQuery,
    useLazyGetAllPostsQuery,
    useCreatePostMutation,
    useGetPostByIdQuery,
    useLazyGetPostByIdQuery,
    useDeletePostMutation,
    useUpdatePostMutation,
} = postApi