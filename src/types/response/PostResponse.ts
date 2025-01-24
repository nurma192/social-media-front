import type {PostWithAllInfo} from "../Post";

export type GetAllPostsResponse = {
    success: boolean,
    page: number,
    limit: number,
    posts: PostWithAllInfo[]
}

export type GetPostsResponse = {
    success: boolean,
    post: PostWithAllInfo
}