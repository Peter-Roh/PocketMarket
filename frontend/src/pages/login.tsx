import React from 'react';
import { gql, useMutation } from '@apollo/client';
import logo from '../assets/logo.png';
import { useForm } from 'react-hook-form';
import { FormError } from '../components/form-error';

interface ILoginForm {
    email: string;
    password: string;
}

const LOGIN_MUTATION = gql`
    mutation LoginMutation($email: String!, $password: String!) {
        login(input: {
            email: $email,
            password: $password
        }) {
            accepted
            token
            error
        }
    }
`;

export const Login = () => {
    const { register, getValues, errors, handleSubmit } = useForm<ILoginForm>();
    const [loginMutation, {loading, error, data}] = useMutation<LoginMutation, LoginMutationVariables>(LOGIN_MUTATION);
    const onSubmit = () => {
        const { email, password } = getValues();
        loginMutation({
            variables: {
                email,
                password,
            },
        });
    };

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-around">
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
                <button className="btn">Sign In</button>
                <div>회원가입</div>
            </form>
        </div>
    );
};
