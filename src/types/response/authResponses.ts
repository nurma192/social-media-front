import type {User} from "../User";

export type LoginResponse = {
    success: boolean,
    token: string,
    message: string,
    detail: string
}

export type RegisterResponse = {
    user: User,
    message : string,
    success : string,
}


export type DefaultErrorResponse = {
    message: string,
    details: string,
    success: string
}
