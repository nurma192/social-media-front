import {Card, Avatar} from "@nextui-org/react";
import {Link} from "react-router-dom";
import type {PostWithUser} from "../types/Post";
import ImageSlider from "./ImageSlider";

type Props = {
    post: PostWithUser,
}

function PostCard({post}: Props) {
    return (
        <Card className="flex flex-col items-start gap-3 p-3 rounded-md">
            <Link to={`user/${post.id}`} className={`flex gap-2 items-center justify-start `}>
                <Avatar src={post.user.avatar_url} name={post.user.id}/>
                <h2 className={`font-bold`}>{post.user.username}</h2>
            </Link>
            <ImageSlider images={post.images}/>
            <p className={"text-md"}>{post.content_text}</p>
            <div className="flex gap-2">
                <a href="#" className={`underline`}>like</a>
                <a href="#" className={`underline`}>comment</a>
            </div>
        </Card>
    );
}

export default PostCard;
