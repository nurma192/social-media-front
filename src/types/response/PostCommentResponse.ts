import {type CommentWithUser} from "../Comment";

export type GetPostCommentsResponse = {
    comments: CommentWithUser[],
    page: number,
    totalPages: number,
    success:  boolean,
    message: string,
}
