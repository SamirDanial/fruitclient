import { gql } from "@apollo/client";

export const GET_CITY_NAMES = gql`
  query {
    getCityNames {
      cityNames {
        ID
        cityName
      }
    }
  }
`;

export const GET_SITES_BY_CITY_ID = gql`
  query getSitesByCityId($ID: String) {
    getSitesByCityId(ID: $ID) {
      sites
    }
  }
`;
