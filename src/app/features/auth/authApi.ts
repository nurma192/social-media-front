import type {LoginResponse, RegisterResponse} from "../../../types/response/authResponses";
import type {
    LoginRequest,
    RegisterRequest,
    SendVerifyCodeRequest,
    VerifyAccountRequest
} from "../../../types/request/authRequests";
import {api} from "../../api";
import type { DefaultResponse} from "../../../types/response/DefaultResponse";


export const authApi = api.injectEndpoints({
    endpoints: build => ({
        login: build.mutation<LoginResponse, LoginRequest>({
            query: body => ({
                url: "auth/login",
                method: "POST",
                body: body
            })
        }),
        register: build.mutation<RegisterResponse, RegisterRequest>({
            query: body => ({
                url: "auth/register",
                method: "POST",
                body: body
            })
        }),
        sendCode: build.mutation<DefaultResponse, SendVerifyCodeRequest>({
            query: body => ({
                url: "auth/send-verify-code",
                method: "POST",
                body: body
            })
        }),
        verifyAccount: build.mutation<DefaultResponse, VerifyAccountRequest>({
            query: body => ({
                url: "auth/verify-account",
                method: "POST",
                body: body
            })
        })
    })
})

export const {useLoginMutation, useRegisterMutation, useVerifyAccountMutation, useSendCodeMutation} = authApi