import React from 'react';
import { useForm } from 'react-hook-form';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { Button } from '../../components/button';
import { useLoggedInUser } from '../../hooks/useLoggedInUser';
import { editProfile, editProfileVariables } from '../../types/editProfile';
import { FormError } from '../../components/form-error';

interface IFormProps {
    email?: string;
    nickname?: string;
    password?: string;
    // role?: ;
    profileImg?: string;
    // gender?: ;
    phoneNumber?:string;
}

const EDIT_PROFILE_MUTATION = gql`
    mutation editProfile($input: EditProfileInput!) {
        editProfile(input: $input) {
            accepted
            error
        }
    }
`;

export const EditProfile = () => {
    const { data: userData }  = useLoggedInUser();
    const onCompleted = (data: editProfile) => {
        const { editProfile: { accepted } } = data;
        if(accepted) {
            // update cache
        }
    };
    const [editProfile, { loading }] = useMutation<editProfile, editProfileVariables>(EDIT_PROFILE_MUTATION, {
        onCompleted,
    });
    const { register, handleSubmit, getValues, errors, formState } = useForm<IFormProps>({
        mode: "onChange",
        defaultValues: {
            email: userData?.loggedinUser.email,
            nickname: userData?.loggedinUser.nickname,
        }
    });
    const onSubmit = () => {
        const { email, password } = getValues();
        editProfile({
            variables: {
                input: {
                    email,
                    ...(password !== "" && { password }),
                }
            }
        })
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <h4 className="title">프로필 수정</h4>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 px-5 w-full max-w-3xl">
                <input ref={register({
                    pattern: {
                        value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "이메일 형식으로 입력해주세요",
                    },
                })} name="email" type="email" className="input" placeholder="이메일" required />
                {
                    errors.email?.message && (
                        <FormError errorMessage={errors.email.message} />
                    )
                }
                <input ref={register} name="nickname" type="text" className="input" placeholder="닉네임" />
                <input ref={register} name="password" type="password" className="input" placeholder="비밀번호" />
                <input ref={register} name="phoneNumber" type="tel" className="input" placeholder="전화번호" />
                <Button loading={loading} canClick={formState.isValid} actionText="프로필 저장하기" />
            </form>
        </div>
    );
};
