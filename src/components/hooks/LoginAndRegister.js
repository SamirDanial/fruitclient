import { gql } from '@apollo/client';

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