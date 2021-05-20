/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: loggedInUser
// ====================================================

export interface loggedInUser_loggedinUser {
  __typename: "User";
  id: number;
  email: string;
  nickname: string;
  role: UserRole;
  verified: boolean;
}

export interface loggedInUser {
  loggedinUser: loggedInUser_loggedinUser;
}
