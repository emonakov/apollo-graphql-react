/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddItem
// ====================================================

export interface AddItem_createItem_item {
  __typename: "Item";
  id: string | null;
  title: string | null;
  createdAt: string | null;
}

export interface AddItem_createItem {
  __typename: "ItemCreateResponse";
  success: boolean;
  message: string | null;
  item: AddItem_createItem_item | null;
}

export interface AddItem {
  createItem: AddItem_createItem;
}

export interface AddItemVariables {
  itemTitle: string;
}
