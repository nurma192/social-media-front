export type CreatePostComment = {
    postId: number,
    content: string,
}

export type DeletePostComment = {
    commentId: number,
}

export type UpdatePostComment = {
    commentId: number,
    content: string,
}

export type GetPostCommentsRequest = {
    postId: number
}

