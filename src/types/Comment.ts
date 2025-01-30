import {type UserMainInfo} from "./User";

export type CommentWithUser = {
    id: number,
    content: string,
    user: UserMainInfo,
    created_at: string,
}