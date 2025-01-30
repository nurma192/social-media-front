import {type CommentWithUser} from "../Comment";

export type GetPostCommentsResponse = {
    comments: CommentWithUser[],
    success:  boolean
}
