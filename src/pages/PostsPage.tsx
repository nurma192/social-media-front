import {useGetAllPostsQuery} from "../app/features/post/postApi";
import CreatePost from "../components/createPost";

const Posts = () => {
    const {data, isSuccess, isLoading} = useGetAllPostsQuery()

    if (isSuccess && data) {
        console.log(data)
    }

    return (
        <>
            <div className={`mb-10 w-full`}>
                Posts

                <CreatePost />
            </div>
        </>
    );
};

export default Posts;