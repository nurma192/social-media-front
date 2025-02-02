import type {PostWithAllInfo, Post} from "../Post";

export type GetAllPostsResponse = {
    posts: PostWithAllInfo[]
}

export type GetPostResponse = {
    post: PostWithAllInfo
}

export type CreatePostResponse = {
    post: Post
}