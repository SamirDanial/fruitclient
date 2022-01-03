import { gql } from "@apollo/client";

export const CREATE_PRODUCT = gql`
  mutation createProduct(
    $ID: String
    $name: String!
    $description: String!
    $price: Int
    $visible: Boolean!
    $categoriesID: [String!]!
    $photos: [PhotoInputData]
  ) {
    createProduct(
      productInput: {
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
