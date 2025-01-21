import type {Image} from "./Image";
import type {UserMainInfo} from "./User";

export type Post = {
    id: string,
    user_id: string,
    content_text: string
    images: Image[]
    created_at: string
};

export type PostWithUser = {
    id: string,
    user: UserMainInfo,
    content_text: string
    images: Image[]
    created_at: string
}