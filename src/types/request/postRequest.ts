export type CreatePostRequest = {
    contentText: string,
    images?: File[]
}

export type UpdatePostRequest = {
    postId: string,
    contentText: string,
    deletedImagesId?: string[]
    newImages?: File[]
}

export type GetAllPostsRequest = {
    limit?: number,
    page?: number,
}