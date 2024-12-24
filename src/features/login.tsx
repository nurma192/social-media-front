import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import Input from "../components/input";
import {Button, Link} from "@nextui-org/react";
import {Simulate} from "react-dom/test-utils";
import {useLazyCurrentQuery, useLoginMutation} from "../app/services/userApi";
import {useNavigate} from "react-router-dom";
import ErrorMessage from "../components/error-message";
import {hasErrorField} from "../app/utils/has-error-field";


type Props = {
    setSelected: (value: string) => void
}
type Login = {
    email: string,
    password: string,
}

const Login = ({setSelected}: Props) => {

    const {
        handleSubmit, control, formState: {errors, isValid},
    } = useForm<Login>({
        mode: 'onChange',
        reValidateMode: 'onBlur',
        defaultValues: {
            email: '',
            password: ''
        }
    });
    const [login, {isLoading, data, }] = useLoginMutation({})
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [triggerCurrentQuery] = useLazyCurrentQuery()

    const onSubmit = async (loginData: Login) => {
        try {
            await login(loginData).unwrap()
            console.log("data: ",data)
            navigate('/')
        } catch (error) {
            if(hasErrorField(error)) {
                setError(error.data.error)
            }
        }
    }
    return (
        <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <Input
                control={control}
                name="email"
                label="Email"
                type="email"
                patternValue={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i}
                patternErrorMessage={"Напишите реальный email адрес!"}
                required
            />
            <Input
                control={control}
                name="password"
                label="Пароль"
                type="password"
                minLength={8}
                minLengthErrorMessage={"Минимальный размер 8"}
                required
            />
            <ErrorMessage error={error} />

            <p className="text-center text-small">
                Нет аккаунта?{" "}
                <Link size="sm" className="cursor-pointer" onPress={() => setSelected("sign-up")}>
                    Зарегистрируйтесь
                </Link>

            </p>
            <div className="flex gap-2 justify-end">
                <Button fullWidth color="primary" type="submit" isLoading={isLoading} isDisabled={!isValid}>
                    Войти
                </Button>
            </div>
        </form>
    );
};

export default Login;