import {useState} from "react";
import {InputOtp} from "@nextui-org/react";
import MyButton from "../components/ui/MyButton";
import {MdMarkEmailUnread} from "react-icons/md";
import {useVerifyAccountMutation} from "../app/features/auth/authApi";
import type {VerifyAccountRequest} from "../types/request/authRequests";
import ErrorMessage from "../components/ui/ErrorMessage";
import type {AuthType} from "../pages/AuthPage";

type Props = {
    email: string;
    setSelected: (value: AuthType) => void

}
const VerifyAccount = ({email, setSelected}: Props) => {
    const [code, setCode] = useState("");
    const [verifyAccount, {isLoading, isError, error}] = useVerifyAccountMutation()

    const handleVerifyAccount = async () => {
        const body:VerifyAccountRequest = {
            email,code
        }
        const result = await verifyAccount(body).unwrap()
        console.log(result)
        if (result && result.success) {
            setSelected("login")
            console.log("changed to login")
        }
    }

    return (
        <div className="flex flex-col items-center justify-center w-full py-2">
            <MdMarkEmailUnread size={60}/>
            <h1 className={`text-2xl font-bold`}>Enter verify code</h1>
            <p className={`text-neutral-500 text-sm`}>We sent to your email Verification code</p>

            <div className="flex flex-col items-start gap-2 mt-4 mb-1">
                <InputOtp length={4}
                          isInvalid={isError}
                          value={code}
                          size={"lg"}
                          onValueChange={setCode}/>
            </div>
            {isError && <ErrorMessage error={error}/>}
            <MyButton
                className={`mt-4`}
                fullWidth={true}
                onClick={handleVerifyAccount}
                isLoading={isLoading}
                color={"primary"}>
                Verify
            </MyButton>


        </div>
    );
}

export default VerifyAccount