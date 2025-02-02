import type {User} from "../User";

export type LoginResponse = {
    token: string,
}

export type VerifyAccountResponse = {
    user: User,
}