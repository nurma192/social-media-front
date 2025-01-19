import type {Image} from "./Image";

export type Post = {
    id: string,
    user_id: string,
    content_text: string
    images: Image[]
    created_at: string
};