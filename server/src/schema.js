const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    items: ItemsResponse!
  }

  type Mutation {
    createItem(title: String!): ItemCreateResponse!
    deleteItem(itemId: ID!): ItemDeleteResponse!
    login(userName: String!, password: String!): UserResponse
    signUp(userName: String!, password: String!): UserResponse
    resetPassword(userName: String!, password: String!): UserResponse
  }

  type ItemsResponse {
    success: Boolean!
    message: String
    items: [Item]!
  }

  type Item {
    id: ID
    title: String
    userId: ID
    createdAt: String
  }

  type UserResponse {
    success: Boolean!
    message: String
    token: String
  }

  type ItemCreateResponse {
    success: Boolean!
    message: String
    item: Item
  }

  type ItemDeleteResponse {
    success: Boolean!
    message: String
    id: ID!
  }

  type UserCreateResponse {
    success: Boolean!
    message: String
    me: User!
  }

  type User {
    id: ID!
    uerName: String!
    items: [Item]!
    token: String!
  }
`;

module.exports = typeDefs;
