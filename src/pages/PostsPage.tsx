import {useGetAllPostsQuery} from "../app/features/post/postApi";
import CreatePost from "../components/createPost";
import PostCard from "../components/PostCard";
import { Skeleton, Card } from "@nextui-org/react";

const Posts = () => {
    const {data, isSuccess, isLoading} = useGetAllPostsQuery()

    if (isSuccess && data) {
        console.log(data)
    }

    return (
        <>
            <CreatePost/>
            {isLoading && <div className={`flex justify-center items-center w-full`}>
	            <div className={`flex w-full flex-col gap-3 mt-5`}>
                    {Array.from({length:4},() => (
                        <Card className={"flex flex-col gap-3 rounded-md p-3"}>
                            <Skeleton className="flex flex-col w-[300px] h-[40px] items-start gap-3 p-3 rounded-md">
                            </Skeleton>
                            <Skeleton className="flex flex-col w-full h-[600px] items-start gap-3 p-3 rounded-md">
                            </Skeleton>
                            <Skeleton className="flex flex-col w-full h-[50px] items-start gap-3 p-3 rounded-md">
                            </Skeleton>
                            <div className="flex gap-2">
                                <Skeleton className="flex flex-col w-[150px] h-[40px] items-start gap-3 p-3 rounded-md">
                                </Skeleton>
                                <Skeleton className="flex flex-col w-[150px] h-[40px] items-start gap-3 p-3 rounded-md">
                                </Skeleton>
                            </div>
                        </Card>
                    ))}
	            </div>
            </div>}
            {isSuccess && data && <div className={`flex flex-col gap-3 mt-5`}>
                {data.posts.map((post) => (
                    <PostCard key={post.id} post={post}/>
                ))}
            </div>}
        </>
    );
};

export default Posts;