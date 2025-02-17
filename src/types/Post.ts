import type {Image} from "./Image";
import type {UserMainInfo} from "./User";

export type Post = {
    id: number,
    userId: string,
    contentText: string,
    images: Image[],
    likesCount: number,
    commentsCount: number,
    createdAt: string
};

export type PostWithAllInfo = {
    id: number,
    user: UserMainInfo,
    contentText: string,
    likedByUser: boolean,
    likesCount: number,
    commentsCount: number,
    images: Image[],
    createdAt: string
}