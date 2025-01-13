import type {LoginResponse, RegisterResponse} from "../../../types/response/authResponses";
import type {LoginRequest, RegisterRequest, VerifyAccountRequest} from "../../../types/request/authRequests";
import {api} from "../../services/api";
import type { DefaultResponse} from "../../../types/response/DefaultResponse";


export const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<LoginResponse, LoginRequest>({
            query: (body) => ({
                url: "auth/login",
                method: "POST",
                body: body
            })
        }),
        register: build.mutation<RegisterResponse, RegisterRequest>({
            query: (body) => ({
                url: "auth/register",
                method: "POST",
                body: body
            })
        }),
        verifyAccount: build.mutation<DefaultResponse, VerifyAccountRequest>({
            query: (body) => ({
                url: "auth/verify-account",
                method: "POST",
                body: body
            })
        })
    })
})

export const {useLoginMutation, useRegisterMutation, useVerifyAccountMutation} = authApi