import {useCreatePostMutation} from "../app/features/post/postApi";
import {useEffect} from "react";

const CreatePost = () => {
    const [createPost] = useCreatePostMutation()

    const handleCreatePost = () => {
        createPost({
            contentText: "test from site"
        })
    }

    return (
        <div>
            create post

            <button className={`bg-orange-500 py-1 px-3 rounded`} onClick={handleCreatePost}>Create Post</button>
        </div>
    );
};

export default CreatePost;