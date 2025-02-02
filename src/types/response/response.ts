export type Response<T> = {
    result: T
    message: string,
    error: string,
}

export type PaginationResponse<T> = {
    result: T
    totalPages: number,
    page: number,
    limit: number,
}