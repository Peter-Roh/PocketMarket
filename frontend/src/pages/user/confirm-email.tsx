import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import { gql, useApolloClient, useMutation } from '@apollo/client';
import { verifyEmail, verifyEmailVariables } from '../../types/verifyEmail';
import { useLoggedInUser } from '../../hooks/useLoggedInUser';

const VERIFY_EMAIL_MUTATION = gql`
    mutation verifyEmail($input: VerifyEmailInput!) {
        verifyEmail(input: $input) {
            accepted
            error
        }
    }
`;

export const ConfirmEmail = () => {
    const client = useApolloClient();
    const history = useHistory();
    const location = useLocation();
    const { data: userData } = useLoggedInUser();
    const onCompleted = (data: verifyEmail) => {
        const { verifyEmail: { accepted } } = data;
        if(accepted && userData?.loggedinUser.id) {
            client.writeFragment({
                id: `User:${userData.loggedinUser.id}`,
                fragment: gql`
                    fragment VerifiedUser on User {
                        verified
                    }
                `,
                data: {
                    verified: true,
                }
            });
            history.push('/');
        }
    };
    const [ verifyEmail ] = useMutation<verifyEmail, verifyEmailVariables>(VERIFY_EMAIL_MUTATION, {
        onCompleted,
    });
    useEffect(() => {
        const code = location.search.split("code=")[1];
        verifyEmail({
            variables: {
                input: {
                    code,
                }
            }
        });
    }, [verifyEmail, location.search]);
    return (
        <div className="mt-52 flex flex-col justify-center items-center">
            <h2 className="text-xl font-semibold">이메일 확인 중...</h2>
            <h4 className="text-lg text-gray-700">Please wait...</h4>
        </div>
    );
};
