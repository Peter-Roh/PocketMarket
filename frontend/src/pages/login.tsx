import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { gql, useMutation } from '@apollo/client';
import logo from '../assets/common/logo.png';
import { useForm } from 'react-hook-form';
import { FormError } from '../components/form-error';
import {
    LoginMutation,
    LoginMutationVariables,
} from '../types/LoginMutation';
import { Button } from '../components/button';
import { authToken, isLoggedInVar } from '../apollo';
import { LOCALSTORAGE_TOKEN } from '../constants';

interface ILoginForm {
    email: string;
    password: string;
    resultError?: string;
}

const LOGIN_MUTATION = gql`
    mutation LoginMutation($loginInput: LoginInput!) {
        login(input: $loginInput) {
            accepted
            token
            error
        }
    }
`;

export const Login = () => {
    const { register, getValues, errors, handleSubmit, formState } = useForm<ILoginForm>({
        mode: "onChange",
    });
    const onCompleted = (data: LoginMutation) => {
        const {
            login: { accepted, token },
        } = data;
        if(accepted && token) {
            localStorage.setItem(LOCALSTORAGE_TOKEN, token);
            authToken(token);
            isLoggedInVar(true);
        }
    };
    const [loginMutation, { data: loginMutationResult, loading }] = useMutation<LoginMutation, LoginMutationVariables>(LOGIN_MUTATION, {
        onCompleted,
    });
    const onSubmit = () => {
        if(!loading) {
            const { email, password } = getValues();
            loginMutation({
                variables: {
                    loginInput: {
                        email,
                        password,
                    }
                },
            });
        }
    };

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-around">
            <Helmet>
                <title>로그인 | Pocket Market</title>
            </Helmet>
            <img src={logo} alt="logo" className="max-w-xs" />
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 px-5 w-full max-w-3xl">
                <input
                    ref={register({ required: "이메일을 입력해주세요. " })}
                    name="email"
                    required
                    type="email"
                    placeholder="Email"
                    className="input"
                />
                {
                    errors.email?.message && (
                        <FormError errorMessage={errors.email.message} />
                    )
                }
                <input
                    ref={register({ required: "비밀번호를 입력해주세요. " })}
                    name="password"
                    required
                    type="password"
                    placeholder="Password"
                    className="input"
                />
                {
                    errors.password?.message && (
                        <FormError errorMessage={errors.password.message} />
                    )
                }
                <Button canClick={formState.isValid} loading={loading} actionText={"Sign In"} />
                {loginMutationResult?.login.error && (
                    <FormError errorMessage={loginMutationResult.login.error} />
                )}
                <label>
                    <input type="checkbox" className="mr-1" />
                    Remember me
                </label>
                <div className="px-2">포켓마켓에 처음이신가요? <Link to="/signup" className="text-red-800 font-semibold text-lg hover:underline">Create an account</Link></div>
            </form>
        </div>
    );
};
