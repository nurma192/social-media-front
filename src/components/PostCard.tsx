import {Card, Avatar} from "@nextui-org/react";
import {Link, useNavigate} from "react-router-dom";
import {type PostWithAllInfo} from "../types/Post";
import ImageSlider from "./ImageSlider";
import { FcLike } from "react-icons/fc";
import { GoHeartFill } from "react-icons/go";
import { FaRegCommentDots } from "react-icons/fa";

type Props = {
    post: PostWithAllInfo,
}

function PostCard({post}: Props) {
    const navigate = useNavigate()
    const handleOnCommentClick = () => {
        if(post.comments_count === 0) return
        navigate("/posts/" + post.id)
    }
    const handleOnLikeClick = () => {

    }
    return (
        <Card className="flex flex-col items-start gap-3 p-3 rounded-md">
            <Link to={`user/${post.user.id}`} className={`flex gap-2 items-center justify-start `}>
                <Avatar src={post.user.avatar_url} name={post.user.id}/>
                <h2 className={`font-bold`}>{post.user.username}</h2>
            </Link>
            <ImageSlider images={post.images}/>
            <p className={"text-md"}>{post.content_text}</p>
            <div className="flex gap-2">
                <button onClick={handleOnLikeClick} className={`flex gap-2 items-center rounded-2xl py-2 px-3 group transition border border-neutral-500 hover:bg-black  bg-opacity-40 ${post.liked_by_user ?? 'bg-red-700'}`}>
                    <GoHeartFill className={`w-5 h-5 transition group-hover:scale-110 text-neutral-500 ${post.liked_by_user ?? 'text-red-500'}`}/>
                    {post.likes_count}
                </button>
                <button onClick={handleOnCommentClick} className={`flex gap-2 items-center rounded-2xl py-2 px-3 group transition border border-neutral-500 hover:bg-black bg-opacity-40 `}>
                    <FaRegCommentDots className={`w-5 h-5 transition group-hover:scale-110 text-neutral-500 ${post.liked_by_user ?? 'text-red-500'}`}/>
                    {post.comments_count}
                </button>
            </div>
        </Card>
    );
}

export default PostCard;
