import {type SubmitHandler, useForm} from 'react-hook-form';
import MyInput from "../components/ui/MyInput";
import {IoSendSharp} from "react-icons/io5";
import {useCreatePostCommentMutation} from "../app/features/postComments/postCommentApi";
import MyCircularProgress from "../components/ui/MyCircularProgress";
import type {CommentWithUser} from "../types/Comment";
import {useAppSelector} from "../app/hooks";
import {selectCurrentUser} from "../app/features/user/userSlice";

type Props = {
    postId: number;
    comments: CommentWithUser[];
    setComments: (comments: CommentWithUser[]) => void;
}

type CreatePostCommentForm = {
    content: string;
}

function CreatePostComment({postId, comments, setComments}: Props) {
    const {control, handleSubmit, reset} = useForm<CreatePostCommentForm>()
    const [createComment, {isLoading}] = useCreatePostCommentMutation()
    const user = useAppSelector(selectCurrentUser)

    const createPostComment: SubmitHandler<CreatePostCommentForm> = (data) => {
        createComment({
            postId: postId,
            content: data.content
        }).then((res) => {
            reset({
                content: "",
            })
            if (user) {
                setComments(
                    [
                        {
                            id: res.data?.result.comment.id || -1,
                            content: res.data?.result.comment.content || "",
                            postId: postId,
                            user: {
                                id: user.id,
                                username: user.username,
                                firstname: user.firstname,
                                lastname: user.lastname,
                                avatar_url: user.avatar_url,
                            },
                            createdAt: res.data?.result.comment.createdAt || "",
                        },
                        ...comments
                    ]
                )
            }
        })
    }

    return (
        <form onSubmit={handleSubmit(createPostComment)}>
            <MyInput
                name={'content'}
                label={'Comment'}
                placeholder={'Your comment'}
                control={control}
                required={true}
                classNames={{
                    inputWrapper: `rounded-md `,
                }}
                className={""}
                endContent={
                    <button
                        aria-label="toggle password visibility"
                        disabled={isLoading}
                        className={`focus:outline-none w-[40px] h-[40px] flex justify-center items-center hover:bg-neutral-500 absolute top-2.5 right-2 rounded transition disabled:p-0`}
                        type="submit"
                    >
                        {isLoading ?
                            <MyCircularProgress className={"scale-75"} size={"sm"} color={"secondary"}/>
                            : <IoSendSharp className={"m-0 p-0 text-md "}/>}
                    </button>
                }
            />
        </form>
    );
}

export default CreatePostComment;
