import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { gql, useMutation } from '@apollo/client';
import { verifyEmail, verifyEmailVariables } from '../../types/verifyEmail';

const VERIFY_EMAIL_MUTATION = gql`
    mutation verifyEmail($input: VerifyEmailInput!) {
        verifyEmail(input: $input) {
            accepted
            error
        }
    }
`;

export const ConfirmEmail = () => {
    const [ verifyEmail, { loading: verifyingEmail } ] = useMutation<verifyEmail, verifyEmailVariables>(VERIFY_EMAIL_MUTATION);
    const location = useLocation();
    useEffect(() => {
        const code = location.search.split("code=")[1];
        verifyEmail({
            variables: {
                input: {
                    code,
                }
            }
        });
    });
    return (
        <div className="mt-52 flex flex-col justify-center items-center">
            <h2 className="text-xl font-semibold">이메일 확인 중...</h2>
            <h4 className="text-lg text-gray-700">Please wait...</h4>
        </div>
    );
};
