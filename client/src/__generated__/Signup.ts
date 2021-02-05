/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Signup
// ====================================================

export interface Signup_signUp {
  __typename: "UserResponse";
  success: boolean;
  message: string | null;
  token: string | null;
}

export interface Signup {
  signUp: Signup_signUp | null;
}

export interface SignupVariables {
  userName: string;
  password: string;
}
