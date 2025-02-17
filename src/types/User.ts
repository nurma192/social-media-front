export type User = {
    id: string;
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    avatarUrl?: string;
    dateOfBirth?: string
    bio?: string
    verified?: string
    location?: string
    createdAt?: string
}

export type UserMainInfo = {
    id: string;
    username: string;
    firstname: string;
    lastname: string;
    avatarUrl?: string;
}