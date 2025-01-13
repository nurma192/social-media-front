export type LoginRequest = {
    email: string;
    password: string;
}
export type RegisterRequest = {
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    password: string;
}
export type VerifyAccountRequest = {
    email: string,
    code: string,
}