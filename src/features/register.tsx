import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {useLazyCurrentQuery, useLoginMutation, useRegisterMutation} from "../app/services/userApi";
import {useNavigate} from "react-router-dom";
import Login from "./login";
import Input from "../components/input";
import {Button, Link} from "@nextui-org/react";
import {hasErrorField} from "../app/utils/has-error-field";
import ErrorMessage from "../components/error-message";

type Props = {
    setSelected: (value: string) => void
}

type Register = {
    email: string;
    name: string;
    password: string;
}

const Register = ({setSelected}: Props) => {
    const {control, handleSubmit, formState: {errors, isValid}} = useForm<Register>({
        mode: 'onChange',
        reValidateMode: 'onBlur',
        defaultValues: {
            email: '',
            password: '',
            name: ''
        }
    });


    const navigate = useNavigate()
    const [triggerCurrentQuery] = useLazyCurrentQuery()

    const [register, {isLoading}] = useRegisterMutation({})
    const [error, setError] = useState('')

    const onSubmit = async (data: Register) => {
        try {
            await register(data).unwrap()
            setSelected('login')
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
                name="name"
                label="Имя"
                type="text"
                required
            />
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
                Уже есть аккаунт?{" "}
                <Link size="sm" className="cursor-pointer" onPress={() => setSelected("login")}>
                    Войдите
                </Link>

            </p>
            <div className="flex gap-2 justify-end">
                <Button fullWidth color="primary" type="submit" isLoading={isLoading} isDisabled={!isValid}>
                    Зарегистрироваться
                </Button>
            </div>
        </form>

    );
};

export default Register;