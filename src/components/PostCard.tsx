import {Card, Avatar} from "@nextui-org/react";
import {Link, useNavigate, useLocation} from "react-router-dom";
import {type PostWithAllInfo} from "../types/Post";
import ImageSlider from "./ImageSlider";
import {GoHeartFill} from "react-icons/go";
import {FaRegCommentDots} from "react-icons/fa";
import {useState} from "react";
import {useLikePostMutation, useUnlikePostMutation} from "../app/features/like/likeApi";
import {formatTimeAgo} from "../utils/getData";

type Props = {
    post: PostWithAllInfo,
}

function PostCard({post}: Props) {
    const [liked, setLiked] = useState(post.likedByUser);
    const [likeCount, setLikeCount] = useState(post.likesCount)
    const navigate = useNavigate()
    const location = useLocation();

    const [likePost] = useLikePostMutation()
    const [unlikePost] = useUnlikePostMutation()

    const handleOnCommentClick = () => {
        if (location.pathname === `/posts/${post.id}`) {
            return
        }
        // if(post.comments_count === 0) return
        navigate("/posts/" + post.id)
    }

    const handleOnLikeClick = () => {
        if(liked) {
            unlikePost({
                postId: post.id,
            })
            setLiked(false)
            setLikeCount(likeCount - 1)
        }else {
            likePost({
                postId: post.id,
            })
            setLiked(true)
            setLikeCount(likeCount + 1)
        }
    }

    return (
        <Card className="flex flex-col items-start gap-3 p-3 rounded-md">
            <Link to={`users/${post.user.id}`} className={`flex gap-2 items-center justify-start `}>
                <Avatar src={post.user.avatarUrl} name={post.user.id}/>
                <div className="flex flex-col">
                    <h2 className={`font-bold`}>{post.user.username}</h2>
                    <p className={`text-sm opacity-80`}>{formatTimeAgo(post.createdAt)}</p>
                </div>
            </Link>
            <ImageSlider images={post.images}/>
            <p className={"text-md"}>{post.contentText}</p>
            <div className="flex gap-2">
                <button onClick={handleOnLikeClick} className={`flex gap-2 items-center rounded-2xl py-2 px-3 group transition border border-neutral-500 dark:hover:bg-black  bg-opacity-40 ${liked ? 'bg-red-700' : ''}`}>
                    <GoHeartFill className={`w-5 h-5 transition group-hover:scale-110 text-neutral-500 ${liked ? 'text-red-500' : ''}`}/>
                    {likeCount}
                </button>
                <button onClick={handleOnCommentClick} className={`flex gap-2 items-center rounded-2xl py-2 px-3 group transition border border-neutral-500 dark:hover:bg-black bg-opacity-40 `}>
                    <FaRegCommentDots className={`w-5 h-5 transition group-hover:scale-110 text-neutral-500`}/>
                    {post.commentsCount}
                </button>
            </div>
        </Card>
    );
}

export default PostCard;
