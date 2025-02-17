import {type UserMainInfo} from "./User";

export type Comment = {
    id: number,
    content: string,
    postId: number,
    userId: number,
    createdAt: string,
}

export type CommentWithUser = {
    id: number,
    content: string,
    postId: number,
    user: UserMainInfo,
    createdAt: string,
}