import {useLazyGetAllPostsQuery} from "../app/features/post/postApi";
import CreatePost from "../components/createPost";
import PostCard from "../components/PostCard";
import {Skeleton, Card} from "@nextui-org/react";
import {useEffect, useState} from "react";
import {type PostWithAllInfo} from "../types/Post";

const Posts = () => {
    const [posts, setPosts] = useState<PostWithAllInfo[]>([]);
    const [loadedPages, setLoadedPages] = useState(0);
    const [maxPage, setMaxPage] = useState(1);
    const [getAllPosts, {isLoading}] = useLazyGetAllPostsQuery()
    const [fetching, setFetching] = useState(true);

    // if (isSuccess && data) {
    //     console.log(data)
    // }

    useEffect(() => {
        if (!fetching) {
            return
        }
        if (maxPage <= loadedPages) {
            setFetching(false);
            return;
        }
        console.log(loadedPages, maxPage)
        getAllPosts({page: loadedPages + 1})
            .then(req => {
                if (req.isSuccess) {
                    setPosts([
                        ...posts,
                        ...req.data.posts,
                    ])
                    setLoadedPages(req.data.page);
                    setMaxPage(req.data.totalPages);
                }
            })
            .finally(() => {
                setFetching(false)
            });

    }, [fetching]);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return () => {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, []);

    const scrollHandler = (e: Event) => {
        const target = e.target as Document;
        if (target.documentElement.scrollHeight - (target.documentElement.scrollTop + window.innerHeight) < 100) {
            setFetching(true)
        }
    }

    return (
        <>
            <CreatePost posts={posts} setPosts={setPosts}/>

            <div className={`flex flex-col gap-3 mt-5`}>
                {posts.map((post) => (
                    <PostCard key={post.id} post={post}/>
                ))}
            </div>

            {isLoading && <div className={`flex justify-center items-center w-full`}>
				<div className={`flex w-full flex-col gap-3 mt-5`}>
                    {Array.from({length: 4}).map((_, index) => (
                        <Card key={`skeletonCard${index}`} className={"flex flex-col gap-3 rounded-md p-3"}>
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
        </>
    );
};

export default Posts;