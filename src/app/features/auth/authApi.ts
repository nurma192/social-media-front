import type {LoginResponse, VerifyAccountResponse} from "../../../types/response/authResponses";
import type {
    LoginRequest,
    RegisterRequest,
    SendVerifyCodeRequest,
    VerifyAccountRequest
} from "../../../types/request/authRequests";
import {api} from "../../api";
import type {Response} from "../../../types/response/response";


export const authApi = api.injectEndpoints({
    endpoints: build => ({
        login: build.mutation<Response<LoginResponse>, LoginRequest>({
            query: body => ({
                url: "auth/login",
                method: "POST",
                body: body
            })
        }),
        register: build.mutation<Response<any>, RegisterRequest>({
            query: body => ({
                url: "auth/register",
                method: "POST",
                body: body
            })
        }),
        sendCode: build.mutation<Response<any>, SendVerifyCodeRequest>({
            query: body => ({
                url: "auth/send-verify-code",
                method: "POST",
                body: body
            })
        }),
        verifyAccount: build.mutation<Response<VerifyAccountResponse>, VerifyAccountRequest>({
            query: body => ({
                url: "auth/verify-account",
                method: "POST",
                body: body
            })
        }),
        refreshToken: build.mutation<Response<LoginResponse>, void>({
            query: () => ({
                url: "auth/refresh-token",
                method: "POST",
            })
        }),
    })
})

export const {useLoginMutation, useRegisterMutation, useVerifyAccountMutation, useSendCodeMutation, useRefreshTokenMutation} = authApi