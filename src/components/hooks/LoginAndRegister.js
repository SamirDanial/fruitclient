import { gql } from "@apollo/client";

export const USER_LOGIN = gql`
  query LoginUser($username: String!, $password: String!) {
    loginUser(credintialInput: { username: $username, password: $password }) {
      _id
      username
      token
      userRole {
        name
      }
    }
  }
`;

export const USER_REGISTER = gql`
  mutation createUser(
    $username: String!
    $password: String!
    $userRole: String!
  ) {
    createUser(
      userInput: {
        username: $username
        password: $password
        userRole: $userRole
      }
    ) {
      _id
      username
      token
      userRole {
        _id
        name
        description
      }
    }
  }
`;
