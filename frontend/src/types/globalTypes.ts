/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum Gender {
  Female = "Female",
  Male = "Male",
  Other = "Other",
  Unknown = "Unknown",
}

export enum UserRole {
  Admin = "Admin",
  Client = "Client",
  Owner = "Owner",
}

export interface CreateAccountInput {
  email: string;
  nickname: string;
  password: string;
  role: UserRole;
  gender: Gender;
  birthday: any;
  phoneNumber: string;
  profileImg?: string | null;
}

export interface LoginInput {
  email: string;
  password: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
