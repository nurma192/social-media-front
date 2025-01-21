import type {PostWithUser} from "../Post";

export type GetAllPostsResponse = {
    success: boolean,
    page: number,
    limit: number,
    posts: PostWithUser[]
}

export type GetPostsResponse = {
    success: boolean,
    posts: PostWithUser[]
}