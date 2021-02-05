/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteItem
// ====================================================

export interface DeleteItem_deleteItem {
  __typename: "ItemDeleteResponse";
  success: boolean;
  message: string | null;
  id: string;
}

export interface DeleteItem {
  deleteItem: DeleteItem_deleteItem;
}

export interface DeleteItemVariables {
  itemId: string;
}
