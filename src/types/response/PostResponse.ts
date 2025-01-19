import type {Post} from "../Post";

export type GetAllPostsResponse = {
    success: boolean,
    page: number,
    limit: number,
    posts: Post[]
}