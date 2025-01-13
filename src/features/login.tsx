import {Button, CircularProgress, Link} from "@nextui-org/react";
import type {AuthType} from "../pages/AuthPage";
import MyInput from "../components/ui/MyInput";
import {useForm} from "react-hook-form";
import type {SubmitHandler} from "react-hook-form"
import {useLoginMutation} from "../app/features/auth/authApi";
import type {LoginRequest} from "../types/request/authRequests";
import {setToken} from "../app/features/auth/authSlice";
import ErrorMessage from "../components/ui/ErrorMessage";
import {useAppDispatch} from "../app/hooks";
import {useNavigate} from "react-router-dom";
import MyButton from "../components/ui/MyButton";

type Props = {
    setSelected: (value: AuthType) => void
}

const Login = ({setSelected}: Props) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const {control, handleSubmit, formState: {isValid}} = useForm<LoginRequest>({
        mode: 'onChange',
        defaultValues: {
            email: "nurma192k@gmail.com",
            password: "pass",
        }
    })

    const [login, {isLoading, isError, error}] = useLoginMutation()

    const onSubmit: SubmitHandler<LoginRequest> = async (body) => {
        console.log(body)

        const result = await login(body)
        console.log(result)
        if (result.data && result.data.success) {
            dispatch(setToken(result.data.token))
            // navigate("/")
        }
    }

    return (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
            <MyInput
                control={control}
                name="email"
                label="Email"
                type="email"
                patternValue={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i}
                patternErrorMessage={"Напишите реальный email адрес!"}
                required
            />

            <MyInput
                control={control}
                name="password"
                label="Пароль"
                type="password"
                minLength={1}
                minLengthErrorMessage={"Минимальный размер 1"}
                required
            />
            {isError && <ErrorMessage error={error}/>}


            <p className="text-center text-small mt-3">
                Нет аккаунта?{" "}
                <Link size="sm" className="cursor-pointer" onPress={() => setSelected("register")}>
                    Зарегистрируйтесь
                </Link>
            </p>
            <div className="w-full flex gap-2">
                <MyButton fullWidth={true}
                          color="primary"
                          type="submit"
                          isDisabled={!isValid}
                          isLoading={isLoading}>
                    Войти
                </MyButton>
            </div>
        </form>
    );
};

export default Login;