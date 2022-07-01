import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import "../styles/auth.scss";
import {useForm} from "react-hook-form";
import {UserApi} from "../http/userApi";
import {IAuthForm} from "./Registration";
import {validationEmailName, validationPassword} from "../utils/validation/validation";
import {useDispatch} from "react-redux";
import {setUser, setLoading, logOut} from "../store/user/actions";
import {useTypedSelector} from "../hooks/useTypedSelector";

const LogIn = () => {
    const {register, handleSubmit, formState: {errors}, setError} = useForm<IAuthForm>();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {userIsLoading} = useTypedSelector(state => state.userReducer);
    const onSubmit = async (data: IAuthForm) => {
        dispatch(logOut());
        dispatch(setLoading(true));
        try {
            const response = await UserApi.logIn(data);
            const user = {
                id: response.data.user.id,
                firstName: response.data.user.firstName,
                lastName: response.data.user.firstName,
                email: response.data.user.email,
                photo: response.data.user.photo,
                provider: response.data.user.provider
            }
            dispatch(setUser(user));
            localStorage.setItem("token", response.data.token);
            navigate("/");
        } catch (e: any){
            if (e.response.status === 422){
                Object.keys(e.response.data.errors).forEach((key) => {
                    // @ts-ignore
                    setError(key, {
                        type: 'manual',
                        message: e.response.data.errors[key]
                    });
                });
            }
        } finally {
            dispatch(setLoading(false));
        }
    };
    return (
        <div className="auth">
            <form className="auth__form" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="auth__title">Вход</h2>
                <input className="auth__input" {...register("email", validationEmailName)} type="email" placeholder="Почта"/>
                <div className="auth__error">{errors?.email && errors?.email.message}</div>
                <input className="auth__input" {...register("password", validationPassword)} type="password" placeholder="Пароль"/>
                <div className="auth__error">{errors?.password && errors?.password.message}</div>
                <div><button className="btn" type="submit" disabled={userIsLoading}>Войти</button></div>
                <p className="auth__text">Ещё нет аккаунта? <Link className="link" to="/registration">Нажмите сюда</Link></p>
            </form>
        </div>
    );
};

export default LogIn;
