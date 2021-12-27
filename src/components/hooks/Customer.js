import { gql } from "@apollo/client";

export const MY_PROFILE = gql`
  query {
    getCustomerProfile {
      _id
      name
      lastName
      active
      photoUrl
      physicalAddress
      phoneNumber
      emailAddress
      coordinates
      favoriteCategories {
        _id
        name
        description
      }
      userId {
        _id
        username
        userRole {
          _id
          name
          description
        }
      }
    }
  }
`;

export const EDIT_PROFILE = gql`
    mutation editCustomer(
      $ID: String
      $name: String!
      $lastName: String!
      $active: Boolean
      $photoUrl: String
      $physicalAddress: String!
      $phoneNumber: String
      $emailAddress: String
      $coordinates: String
      $favoriteCategories: [CustomerFavoriteCategoryInputData]
      $userId: String
    ) {
      editCustomer(
        customerInputData: 
        {
          ID: $ID
          name: $name,
          lastName: $lastName,
          active: $active,
          photoUrl: $photoUrl,
          physicalAddress: $physicalAddress,
          phoneNumber: $phoneNumber,
          emailAddress: $emailAddress,
          coordinates: $coordinates, 
          userId: $userId,
          favoriteCategories: $favoriteCategories
      }) {
        _id,
        name,
        lastName,
        active,
        photoUrl,
        physicalAddress,
        phoneNumber,
        emailAddress,
        coordinates,
        favoriteCategories {
          _id,
          name,
          description,
        },
        userId {
          _id,
          username,
          userRole {
            _id,
            name,
            description,
          },
        },
      }
    }
`;
