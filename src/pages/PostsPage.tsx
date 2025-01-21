import {useGetAllPostsQuery} from "../app/features/post/postApi";
import CreatePost from "../components/createPost";
import PostCard from "../components/PostCard";
import MyCircularProgress from "../components/ui/MyCircularProgress";

const Posts = () => {
    const {data, isSuccess, isLoading} = useGetAllPostsQuery()

    if (isSuccess && data) {
        console.log(data)
    }

    return (
        <>
            <CreatePost/>
            {isLoading && <div className={`flex justify-center items-center w-full my-5`}><MyCircularProgress size={"lg"}/></div>}
            {isSuccess && data && <div className={`flex flex-col gap-3 mt-5`}>
                {data.posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>}
        </>
    );
};

export default Posts;