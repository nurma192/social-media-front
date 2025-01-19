import {api} from "../../api";
import type {GetAllPostsResponse} from "../../../types/response/PostResponse";
import type {CreatePostRequest} from "../../../types/request/postRequest";

export const postApi = api.injectEndpoints({
    endpoints: build => ({
        getAllPosts: build.query<GetAllPostsResponse, void>({
            query: body => ({
                url: "posts",
                method: "GET",
            })
        }),
        createPost: build.mutation<void, CreatePostRequest>({
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
        })
    })
});

export const {
    useGetAllPostsQuery,
    useLazyGetAllPostsQuery,
    useCreatePostMutation,
} = postApi