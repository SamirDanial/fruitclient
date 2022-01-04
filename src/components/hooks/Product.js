import { gql } from "@apollo/client";

export const GET_PRODUCT = gql`
  query getProduct($ID: String!) {
    getProduct(ID: $ID) {
      _id
      name
      description
      price
      visible
      categories {
        _id
        name
        description
      }
      photos {
        _id
        photoUrl
        featured
      }
    }
  }
`;

export const GET_PRODUCTS = gql`
  query getProducts($PageNumber: Int!, $PageSize: Int!) {
    getProducts(PageNumber: $PageNumber, PageSize: $PageSize) {
      products {
        _id
        name
        description
        price
        visible
        categories {
          _id
          name
        }
        photos {
          _id
          photoUrl
          featured
        }
      }
      allProductsCount
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation createProduct(
    $ID: String
    $name: String!
    $description: String!
    $price: Int!
    $visible: Boolean!
    $categoriesID: [String!]!
    $photos: [PhotoInputData]
  ) {
    createProduct(
      productInput: {
        ID: $ID
        name: $name
        description: $description
        price: $price
        visible: $visible
        categoriesID: $categoriesID
        photos: $photos
      }
    ) {
      _id
      name
      description
      price
      categories {
        _id
        name
        imageUrl
        description
      }
      visible
      photos {
        _id
        photoUrl
        featured
      }
    }
  }
`;
