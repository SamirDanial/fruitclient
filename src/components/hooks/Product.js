import { gql } from "@apollo/client";

export const FILTER_PRODUCTS_BY_PRODUCT_NAME = gql`
  query filterByNameProduct($Name: String!) {
    filterByNameProduct(Name: $Name) {
      products {
        _id
        name
        description
        unitDescription
        marketPrice
        price
        visible
        featured
        photos {
          _id
          photoUrl
          featured
        }
      }
    }
  }
`;

export const AUTO_FILL_NAME_PRODUCT = gql`
  query autoFillNameProduct($Name: String!) {
    autoFillNameProduct(Name: $Name)
  }
`;

export const GET_PRODUCT = gql`
  query getProduct($ID: String!) {
    getProduct(ID: $ID) {
      _id
      name
      description
      unitDescription
      marketPrice
      price
      visible
      featured
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

export const GET_PRODUCTS_BY_CATEGORY = gql`
  query getProductByCategory($ID: String!) {
    getProductByCategory(ID: $ID) {
      products {
        _id
        name
        description
        unitDescription
        marketPrice
        price
        visible
        featured
        categories {
          _id
          name
          description
          imageUrl
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

export const GET_FEATURED_PRODUCTS = gql`
  query getFeaturedProducts($PageNumber: Int!, $PageSize: Int!) {
      getFeaturedProducts(PageNumber: $PageNumber, PageSize: $PageSize) {
        products {
          _id
          name
          description
          unitDescription
          marketPrice
          price
          visible
          featured
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

export const GET_PRODUCTS = gql`
  query getProducts($PageNumber: Int!, $PageSize: Int!) {
    getProducts(PageNumber: $PageNumber, PageSize: $PageSize) {
      products {
        _id
        name
        description
        unitDescription
        marketPrice
        price
        visible
        featured
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

export const ADD_IMAGE_TO_PRODUCT = gql`
  mutation addImageToProduct($ID: String!, $photoInput: PhotoInputData) {
    addImageToProduct(ID: $ID, photoInput: $photoInput) {
      _id
      photoUrl
      featured
    }
  }
`;

export const EDIT_PRODUCT = gql`
  mutation editProduct(
    $ID: String
    $name: String!
    $description: String!
    $unitDescription: String!
    $marketPrice: Int!
    $price: Int!
    $visible: Boolean!
    $featured: Boolean
    $categoriesID: [String!]!
    $photos: [PhotoInputData]
  ) {
    editProduct(
      productInput: {
        ID: $ID
        name: $name
        description: $description
        unitDescription: $unitDescription
        marketPrice: $marketPrice
        price: $price
        visible: $visible
        featured: $featured
        categoriesID: $categoriesID
        photos: $photos
      }
    ) {
      _id
      name
      description
      unitDescription
      marketPrice
      price
      visible
      featured
      categories {
        _id
        name
        description
        imageUrl
      }
      photos {
        _id
        photoUrl
        featured
      }
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation createProduct(
    $ID: String
    $name: String!
    $description: String!
    $unitDescription: String!
    $marketPrice: Int!
    $price: Int!
    $visible: Boolean!
    $featured: featured
    $categoriesID: [String!]!
    $photos: [PhotoInputData]
  ) {
    createProduct(
      productInput: {
        ID: $ID
        name: $name
        description: $description
        unitDescription: $unitDescription
        marketPrice: $marketPrice
        price: $price
        visible: $visible
        featured: $featured
        categoriesID: $categoriesID
        photos: $photos
      }
    ) {
      _id
      name
      description
      unitDescription
      marketPrice
      price
      categories {
        _id
        name
        imageUrl
        description
      }
      visible
      featured
      photos {
        _id
        photoUrl
        featured
      }
    }
  }
`;
