import {useEffect, useState} from 'react';
import {useLazyGetPostCommentsQuery} from "../app/features/postComments/postCommentApi";
import {Card} from '@nextui-org/react';
import MyCircularProgress from "./ui/MyCircularProgress";
import type {CommentWithUser} from "../types/Comment";
import CommentCard from "./CommentCard";
import CreatePostComment from "../features/CreatePostComment";

type Props = {
    postId: number
}

function PostComments({postId}: Props) {
    const [comments, setComments] = useState<CommentWithUser[]>([])
    const [page, setPage] = useState(0);
    const [maxPage, setMaxPage] = useState(1);
    const [fetching, setFetching] = useState(true);

    const [getPostComments, {data, isError, isLoading}] = useLazyGetPostCommentsQuery()


    useEffect(() => {
        if (!fetching) {
            return
        }
        if (maxPage <= page) {
            setFetching(false);
            return;
        }
        getPostComments({postId})
            .then(req => {
                if (req.isSuccess) {
                    const newComments = req.data.result.result.comments || [];
                    setComments([
                        ...comments,
                        ...newComments,
                    ])
                    setPage(req.data.result.page)
                    setMaxPage(req.data.result.totalPages)
                }
            })
            .finally(() => {
                setFetching(false);
            })
    }, [fetching]);

    useEffect(() => {
        // document.addEventListener('scroll', handleScroll);
        //
        // return () => {
        //     document.removeEventListener('scroll', handleScroll);
        // }
    }, []);

    const handleScroll = (e: Event) => {
        const target = e.target as Document;
        if (target.documentElement.scrollHeight - (target.documentElement.scrollTop + window.innerHeight) < 100) {
            setFetching(true)
        }
    }

    return (
        <Card className={`w-full rounded-md p-2 flex flex-col gap-2`}>
            <CreatePostComment postId={postId} comments={comments} setComments={setComments} />
            {comments.length > 0 && comments.map(comment => (
                <CommentCard comment={comment} key={comment.id}/>
            ))}
            {isLoading && <MyCircularProgress size={"md"}/>}
        </Card>
    );
}

export default PostComments;
