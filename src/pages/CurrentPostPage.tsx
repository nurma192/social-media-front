import {useNavigate, useParams} from "react-router-dom";
import {useGetPostByIdQuery} from "../app/features/post/postApi";
import PostCard from "../components/PostCard";

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
        <div>
            {isSuccess && (
                <PostCard post={data.post}/>
            )}
        </div>
    );
};

export default CurrentPost;