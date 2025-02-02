import type {AuthType} from "../pages/AuthPage";
import {type SubmitHandler, useForm} from "react-hook-form";
import MyInput from "../components/ui/MyInput";
import ErrorMessage from "../components/ui/ErrorMessage";
import {Link} from "@nextui-org/react";
import type {RegisterRequest} from "../types/request/authRequests";
import {useRegisterMutation} from "../app/features/auth/authApi";
import MyButton from "../components/ui/MyButton";
import {useState} from "react";
import VerifyAccount from "./verifyAccount";

type Props = {
    setSelected: (value: AuthType) => void
}


const Register = ({setSelected}: Props) => {
    const [registerState, setRegisterState] = useState<"register" | "verify">("register")
    const [email, setEmail] = useState<string | null>(null)
    const {control, handleSubmit, formState: {isValid}} = useForm<RegisterRequest>({
        mode: 'onChange',
    })

    const [register, {isLoading, isError, error}] = useRegisterMutation()

    const onSubmit: SubmitHandler<RegisterRequest> = async (body) => {
        await register(body)
            .then(() => {
                setEmail(body.email)
                setRegisterState("verify")
            })
    }

    if (registerState === "verify" && email) {
        return (
            <VerifyAccount email={email} setSelected={setSelected}/>
        )
    }

    if (registerState === "register") {
        return (
            <form action="" className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
                <MyInput
                    control={control}
                    name="username"
                    label="Username"
                    type="text"
                    required
                />
                <MyInput
                    control={control}
                    name="email"
                    label="Email"
                    type="text"
                    patternValue={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i}
                    patternErrorMessage={"Напишите реальный email адрес!"}
                    required
                />
                <MyInput
                    control={control}
                    name="firstname"
                    label="Имя"
                    type="text"
                    required
                />
                <MyInput
                    control={control}
                    name="lastname"
                    label="Фамилия"
                    type="text"
                    required
                />

                <MyInput
                    control={control}
                    name="password"
                    label="Пароль"
                    type="password"
                    minLength={4}
                    minLengthErrorMessage={"Минимальный размер 4"}
                    required
                />

                {isError && <ErrorMessage error={error}/>}

                <p className="text-center text-small">
                    Уже есть аккаунт?{" "}
                    <Link size="sm" className="cursor-pointer" onPress={() => setSelected("login")}>
                        Войдите
                    </Link>

                </p>
                <div className="flex gap-2 justify-end">
                    <MyButton fullWidth={true}
                              color="primary"
                              type="submit"
                              isDisabled={!isValid}
                              isLoading={isLoading}
                    >
                        Зарегистрироваться
                    </MyButton>
                </div>
            </form>
        );
    }

};

export default Register;