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
