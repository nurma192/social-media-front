import {useNavigate, useParams} from "react-router-dom";
import {useGetPostByIdQuery} from "../app/features/post/postApi";
import PostCard from "../components/PostCard";
import PostComments from "../components/PostComments";

const CurrentPost = () => {
    const navigate = useNavigate()
    const {id} = useParams();
    const {data, isError, isSuccess} = useGetPostByIdQuery(id!);

    console.log(data)
    if (!id) {
        navigate("/posts");
    }

    if (isError) {
        return null
    }

    return (
        <div className="flex flex-col gap-3">
            {isSuccess && (
                <>
                    <PostCard post={data.result.post}/>
                    <PostComments postId={data.result.post.id}/>
                </>
            )}
        </div>
    );
};

export default CurrentPost;