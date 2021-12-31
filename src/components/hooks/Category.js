import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query {
    getCategories {
      categories {
        _id
        name
        description
        imageUrl
      }
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation createCategory(
    $ID: String
    $name: String!
    $imageUrl: String
    $description: String!
  ) {
    createCategory(
      categoryInput: {
        ID: $ID
        name: $name
        imageUrl: $imageUrl
        description: $description
      }
    ) {
      _id
      name
      description
      imageUrl
    }
  }
`;

export const EDIT_CATEGORY = gql`
  mutation editCategory(
    $ID: String
    $name: String!
    $imageUrl: String
    $description: String!
  ) {
    editCategory(
      categoryInput: { ID: $ID, name: $name, imageUrl: $imageUrl, description: $description }
    ) {
      _id
      imageUrl
      description
      name
    }
  }
`;
