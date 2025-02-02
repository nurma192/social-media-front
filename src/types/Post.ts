import type {Image} from "./Image";
import type {UserMainInfo} from "./User";

export type Post = {
    id: number,
    user_id: string,
    content_text: string
    images: Image[]
    created_at: string
};

export type PostWithAllInfo = {
    id: number,
    user: UserMainInfo,
    content_text: string,
    liked_by_user: boolean,
    likes_count: number,
    comments_count: number,
    images: Image[],
    created_at: string
}