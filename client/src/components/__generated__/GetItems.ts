/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetItems
// ====================================================

export interface GetItems_items_items {
  __typename: "Item";
  id: string | null;
  title: string | null;
  createdAt: string | null;
}

export interface GetItems_items {
  __typename: "ItemsResponse";
  success: boolean;
  message: string | null;
  items: (GetItems_items_items | null)[];
}

export interface GetItems {
  items: GetItems_items;
}
