import {useCreatePostMutation, useLazyGetAllPostsQuery} from "../app/features/post/postApi";
import {type SubmitHandler, useForm} from "react-hook-form";
import MyTextarea from "./ui/MyTextarea";
import MyButton from "./ui/MyButton";
import {IoSendSharp} from "react-icons/io5";
import {MdFileOpen} from "react-icons/md";
import {useEffect, useState} from "react";
import ImageSlider from "./ImageSlider";
import {isFulfilled, isRejectedWithValue} from "@reduxjs/toolkit";
import MyCircularProgress from "./ui/MyCircularProgress";
import {Image} from "../types/Image";

type CreatePostForm = {
    contentText: string;
}

const CreatePost = () => {
    const [images, setImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const [createPost, {isSuccess, isLoading}] = useCreatePostMutation()
    const [triggerGetAllPosts] = useLazyGetAllPostsQuery()


    const {handleSubmit, control, reset} = useForm<CreatePostForm>()

    const handleCreatePostSubmit: SubmitHandler<CreatePostForm> = async (data) => {
        console.log(data)
        console.log(images)

        await createPost({
            contentText: data.contentText,
            images: images
        })
    }

    useEffect(() => {
        if (isSuccess) {
            setImages([]);
            setImagePreviews([]);
            reset({
                contentText: ""
            });
            triggerGetAllPosts()
        }
    }, [isSuccess]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            if (e.target.files.length + images.length > 5) {
                alert("U can choose only 5 images")
                return
            }
            const files = Array.from(e.target.files);
            setImages([...images, ...files]);

            const previewUrls = files.map((file) => URL.createObjectURL(file));
            setImagePreviews([...imagePreviews, ...previewUrls]);
        }
    };

    const deleteImage = (index: number) => {
        setImages(images.filter((_, id) => id !== index));
        setImagePreviews(imagePreviews.filter((_, id) => id !== index));
    }

    return (
        <div className={`flex flex-col gap-3`}>
            {imagePreviews.length > 0 && (
                <>
                    <ImageSlider images={imagePreviews.map((image, index): Image => {
                        return {
                            id: index+"",
                            url:image,
                        }
                    })}/>
                    <div className="flex gap-2">
                        {imagePreviews.map((image, index) => (
                            <div key={index} className="w-[100px] h-[100px] bg-neutral-300 relative rounded-lg">
                                <button type='button'
                                        className={`absolute top-[-5px] right-[-5px] bg-red-500 p-1 rounded-2xl text-white transition hover:scale-125`}
                                        onClick={() => deleteImage(index)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="white"
                                         viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                </button>
                                <img src={image} alt={`Preview ${index}`} className="w-full h-full object-cover"/>
                            </div>
                        ))}
                    </div>
                </>
            )}
            <form onSubmit={handleSubmit(handleCreatePostSubmit)}>
                <MyTextarea name={"contentText"}
                            label={""}
                            placeholder={"Content text"}
                            required={"Вы не можете создать пост без текста"}
                            control={control}/>
                <div className="flex w-full justify-end">
                    <div className="flex gap-2 mt-2 h-9">
                        <input type="file"
                               accept="image/*"
                               multiple
                               onChange={handleImageChange}
                               disabled={images.length >= 5}
                               className="text-transparent w-36 block text-sm text-slate-500
                                  file:mr-4 file:py-2 file:px-4
                                  file:rounded-xl file:border-0
                                  file:text-sm file:font-semibold
                                  file:bg-violet-50 file:text-black
                                  hover:file:bg-violet-100"
                        />
                        <MyButton color="primary"
                                  className={`flex justify-center items-center min-w-3 p-0 m-0 w-16 h-full rounded`}
                                  type="submit"
                        >
                            {isLoading ? <MyCircularProgress size={"sm"} color={"secondary"} /> : <IoSendSharp className={"m-0 p-0 text-md "}/>}
                        </MyButton>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;