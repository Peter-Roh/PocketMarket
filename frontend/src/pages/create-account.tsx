import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { FormError } from '../components/form-error';
import { Gender, UserRole } from '../types/globalTypes';
import { Button } from '../components/button';
import {
    CreateAccountMutation,
    CreateAccountMutationVariables,
} from '../types/CreateAccountMutation';

interface ICreateAccountForm {
    email: string;
    nickname: string;
    password: string;
    gender: Gender;
    birthday: Date;
    profileImg: string;
    phoneNumber: string;
    role: UserRole;
}

const CREATE_ACCOUNT_MUTATION = gql`
    mutation CreateAccountMutation($createAccountInput: CreateAccountInput!) {
        createAccount(input: $createAccountInput) {
            accepted
            error
        }
    }
`;

export const CreateAccount = () => {
    const { register, getValues, errors, handleSubmit, formState } = useForm<ICreateAccountForm>({
        mode: "onChange",
        defaultValues: {
            role: UserRole.Client,
            gender: Gender.Male,
        }
    });
    const history = useHistory();
    const onCompleted = (data: CreateAccountMutation) => {
        const {
            createAccount: {
                accepted,
            }
        } = data;
        if(accepted) {
            // redirect to where?
            alert("계정이 생성됐습니다. 로그인해주세요!");
            history.push("/");
        }
    };
    const [createAccountMutation, { loading, data: createAccountMutationResult }] = useMutation<CreateAccountMutation, CreateAccountMutationVariables>(CREATE_ACCOUNT_MUTATION, {
        onCompleted,
    });
    const onSubmit = () => {
        if(!loading) {
            const { email, nickname, password, gender, birthday, profileImg, phoneNumber, role } = getValues();
            createAccountMutation({
                variables: {
                    createAccountInput: {
                        email,
                        nickname,
                        password,
                        gender,
                        birthday,
                        profileImg,
                        phoneNumber,
                        role,
                    },
                }
            })
        }
    };

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-around">
            <Helmet>
                <title>회원가입 | Pocket Market</title>
            </Helmet>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 px-5 w-full max-w-3xl">
                <input
                    ref={register({
                        required: "이메일을 입력해주세요. ",
                        pattern: {
                            value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: "이메일 형식으로 입력해주세요",
                        },
                    })}
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
                    ref={register({ required: "닉네임을 입력해주세요. " })}
                    name="nickname"
                    required
                    type="nickname"
                    placeholder="Nickname"
                    className="input"
                />
                {
                    errors.nickname?.message && (
                        <FormError errorMessage={errors.nickname.message} />
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
                <input
                    ref={register({ required: true })}
                    name="birthday"
                    required
                    type="date"
                    className="input"
                />
                <input
                    ref={register({ required: true })}
                    name="phoneNumber"
                    required
                    type="tel"
                    className="input"
                    placeholder="Phone Number"
                />
                <select name="role" ref={register({ required: true })} className="input">
                    <option>Client</option>
                    <option>Owner</option>
                </select>
                <select name="gender" ref={register({ required: true })} className="input">
                    {Object.keys(Gender).map((gender, index) => <option key={index}>{gender}</option>)}
                </select>
                <Button canClick={formState.isValid} loading={loading} actionText={"회원가입하기"} />
                {
                    createAccountMutationResult?.createAccount.error && (
                        <FormError errorMessage={createAccountMutationResult.createAccount.error} />
                    )
                }
                <div className="px-2">이미 계정이 있으신가요? <Link to="/" className="text-red-800 font-semibold text-lg hover:underline">Sign in!</Link></div>
            </form>
        </div>
    );
};
