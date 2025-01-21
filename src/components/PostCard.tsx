import {Card, Avatar} from "@nextui-org/react";
import type {Post} from "../types/Post";
import ImageSlider from "./ImageSlider";

type Props = {
    post: Post,
}
function PostCard({post}:Props) {
    return (
        <Card className="p-3 rounded-md">
            <Avatar name={post.user_id} />
            <ImageSlider images={post.images} />
            <p className={"text-xl mt-3"}>{post.content_text}</p>
            <div className="flex gap-2">
                <a href="#" className={`underline`}>like</a>
                <a href="#" className={`underline`}>comment</a>
            </div>
        </Card>
    );
}

export default PostCard;
