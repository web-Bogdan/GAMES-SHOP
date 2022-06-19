import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import "../styles/auth.scss";

import {
    validationEmailName,
    validationFirstName,
    validationLastName,
    validationPassword
} from "../utils/validation/validation";
import {UserApi} from "../http/userApi";
import {useTypedSelector} from "../hooks/useTypedSelector";

export interface IAuthForm {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

const Registration: React.FC = () => {
    const {register, handleSubmit, formState: {errors}, setError} = useForm<IAuthForm>();
    const {isLoading} = useTypedSelector(state => state.userReducer);
    const navigate = useNavigate();
    const onSubmit = async (data: IAuthForm) => {
        try {
            await UserApi.signIn(data);
            navigate("/login");
        }
        catch (e: any){
            if (e.response.status === 422){
                Object.keys(e.response.data.errors).forEach((key) => {
                // @ts-ignore
                setError(key, {
                    type: 'manual',
                    message: e.response.data.errors[key]
                });
            });
            }
        }
    };
    return (
        <div className="auth">
            <form className="auth__form" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="auth__title">Регистрация</h2>
                <input className="auth__input" {...register("firstName", validationFirstName)} type="text" placeholder="Имя"/>
                <div className="auth__error">{errors?.firstName && errors?.firstName.message}</div>
                <input className="auth__input" {...register("lastName", validationLastName)} type="text" placeholder="Фамилия"/>
                <div className="auth__error">{errors?.lastName && errors?.lastName.message}</div>
                <input className="auth__input" {...register("email", validationEmailName)} type="email" placeholder="Почта"/>
                <div className="auth__error">{errors?.email && errors?.email.message}</div>
                <input className="auth__input" {...register("password", validationPassword)} type="password" placeholder="Пароль"/>
                <div className="auth__error">{errors?.password && errors?.password.message}</div>
                <div><button className="btn" disabled={isLoading}>Зарегистрироваться</button></div>
                <p className="auth__text">Уже есть аккаунт? <Link className="link" to="/login">Нажмите сюда</Link></p>
            </form>
        </div>
    );
};

export default Registration;
