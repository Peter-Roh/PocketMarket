/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole, Gender } from "./globalTypes";

// ====================================================
// GraphQL query operation: Me
// ====================================================

export interface Me_loggedinUser {
  __typename: "User";
  id: number;
  email: string;
  nickname: string;
  role: UserRole;
  verified: boolean;
  birthday: any;
  phoneNumber: string;
  profileImg: string | null;
  gender: Gender;
}

export interface Me {
  loggedinUser: Me_loggedinUser;
}
