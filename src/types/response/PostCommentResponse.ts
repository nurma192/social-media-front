import {type CommentWithUser} from "../Comment";

export type GetPostCommentsResponse = {
    comments: CommentWithUser[],
}
export type CreatePostCommentResponse = {
    comment: CommentWithUser
}