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

export interface EditProfileInput {
  email?: string | null;
  nickname?: string | null;
  password?: string | null;
  role?: UserRole | null;
  profileImg?: string | null;
  gender?: Gender | null;
  phoneNumber?: string | null;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface VerifyEmailInput {
  code: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
