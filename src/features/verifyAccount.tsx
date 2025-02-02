import {InputOtp} from "@nextui-org/react";
import MyButton from "../components/ui/MyButton";
import {MdMarkEmailUnread} from "react-icons/md";
import {useSendCodeMutation, useVerifyAccountMutation} from "../app/features/auth/authApi";
import type {VerifyAccountRequest} from "../types/request/authRequests";
import ErrorMessage from "../components/ui/ErrorMessage";
import type {AuthType} from "../pages/AuthPage";
import {Controller, type SubmitHandler, useForm} from "react-hook-form";
import {useEffect, useState} from "react";

type Props = {
    email: string;
    setSelected: (value: AuthType) => void
}
const VerifyAccount = ({email, setSelected}: Props) => {
    const [timer, setTimer] = useState(90)
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);


    const [verifyAccount, {isLoading, isError, error}] = useVerifyAccountMutation()
    const [sendVerifyAccount, {
        isLoading: isSendCodeLoading,
        isError: isSendCodeError,
        error: sendCodeError
    }] = useSendCodeMutation()
    const {
        handleSubmit,
        control,
        formState: {errors},
    } = useForm<VerifyAccountRequest>({
        defaultValues: {
            email: email,
            code: "",
        },
    });

    const handleVerifyAccount: SubmitHandler<VerifyAccountRequest> = async (body) => {
        await verifyAccount(body)
            .then(() => {
                setSelected("login")
            })
    }
    const startTimer = () => {
        setIsButtonDisabled(true);
        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setIsButtonDisabled(false);
                    return 90;
                }
                return prev - 1;
            });
        }, 1000);
    }
    const handleSendCode = async () => {
        await sendVerifyAccount({email});
        startTimer()
    };

    useEffect(() => {
        startTimer()
    }, []);

    return (
        <div className="flex flex-col items-center justify-center w-full py-2">
            <MdMarkEmailUnread size={60}/>
            <h1 className={`text-2xl font-bold`}>Enter verify code</h1>
            <p className={`text-neutral-500 text-sm`}>We sent to your email Verification code</p>

            <form className="flex flex-col items-center gap-2 w-full max-w-[300px] mt-2"
                  onSubmit={handleSubmit(handleVerifyAccount)}>
                <div className="flex w-full justify-center">
                    <Controller
                        control={control}
                        name="code"
                        render={({field}) => (
                            <InputOtp
                                {...field}
                                errorMessage={errors.code?.message}
                                isInvalid={!!errors.code}
                                size={"lg"}
                                length={4}
                            />
                        )}
                        rules={{
                            required: "Code is required",
                            minLength: {
                                value: 4,
                                message: ""
                            },
                        }}
                    />
                </div>
                <MyButton
                    type={"button"}
                    textStyle={"text-black text-sm"}
                    loadingColor={"primary"}
                    isLoading={isSendCodeLoading}
                    color={"secondary"}
                    onClick={handleSendCode}
                    isDisabled={isButtonDisabled}
                >
                    {isButtonDisabled ? `Resend in ${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, '0')}` : "Send Code"}
                </MyButton>

                {isError && <ErrorMessage error={error}/>}

                <MyButton
                    className={`mt-4`}
                    fullWidth={true}
                    type={"submit"}
                    isLoading={isLoading}
                    color={"primary"}>
                    Verify
                </MyButton>
            </form>

        </div>
    );
}

export default VerifyAccount