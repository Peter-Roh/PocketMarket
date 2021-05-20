import gql from "graphql-tag";
import { loggedInUser } from "../types/loggedInUser";
import { useQuery } from "@apollo/client";

const ME = gql`
    query loggedInUser {
        loggedinUser {
            id
            email
            nickname
            role
            verified
        }
    }
`;

export const useLoggedInUser = () => {
    return useQuery<loggedInUser>(ME);
};
