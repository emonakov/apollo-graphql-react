/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ResetPassword
// ====================================================

export interface ResetPassword_resetPassword {
  __typename: "UserResponse";
  success: boolean;
  message: string | null;
  token: string | null;
}

export interface ResetPassword {
  resetPassword: ResetPassword_resetPassword | null;
}

export interface ResetPasswordVariables {
  userName: string;
  password: string;
}
