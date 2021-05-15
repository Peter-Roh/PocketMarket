import React from 'react';
import gql from 'graphql-tag';
import { isLoggedInVar } from '../apollo';
import { useQuery } from '@apollo/client';
import { loggedInUser } from '../types/loggedInUser';

const ME = gql`
    query loggedInUser {
        loggedinUser {
            id
            email
            role
            verified
        }
    }
`;

export const LoggedInRouter = () => {
    const { data, loading, error } = useQuery<loggedInUser>(ME);
    if(!data || loading || error) {
        return (
            <div className="h-screen flex justify-center items-center">
                <span className="font-medium text-xl tracking-wide">Loading...</span>
            </div>
        );
    }
    return (
        <div>
            <div>Logged In</div>
        </div>
    );
};
