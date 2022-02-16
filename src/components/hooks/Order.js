import { gql } from "@apollo/client";

export const CHANGE_APPROVE_STATUS = gql`
  mutation  approveOrder($ID: String, $statusText: String) {
    approveOrder(ID: $ID, statusText: $statusText) {
      _id,
        address,
        orderCode,
        approved,
        customerId {
          _id,
          name,
          lastName,
          photoUrl,
          physicalAddress,
          phoneNumber,
          emailAddress
        }
        products {
          productId {
            name,
            description,
            price,
            categories {
              name,
              imageUrl
            },
            photos {
              photoUrl,
              featured
            }
          },
          eachPrice,
          totalPriceForThis,
          quantity
        },
        totalQuantity,
        totalPrice,
        orderDate
    
    }
  }
`;

export const GET_ORDER = gql `
  query getOrder($ID: String) {
    getOrder(ID: $ID) {
      _id,
        address,
        orderCode,
        customerId {
          _id,
          name,
          lastName,
          photoUrl,
          physicalAddress,
          phoneNumber,
          emailAddress
        }
        products {
          productId {
            name,
            description,
            price,
            categories {
              name,
              imageUrl
            },
            photos {
              photoUrl,
              featured
            }
          },
          eachPrice,
          totalPriceForThis,
          quantity
        },
        totalQuantity,
        totalPrice,
        orderDate
    }
  }
`;

export const GET_ORDERS = gql`
  query getOrders($PageNumber: Int, $PageSize: Int){
    getOrders(PageNumber: $PageNumber, PageSize: $PageSize) {
      orders {
        _id,
        address,
        orderCode,
        approved,
        customerId {
          _id,
          name,
          lastName,
          photoUrl,
          physicalAddress,
          phoneNumber,
          emailAddress
        }
        products {
          productId {
            name,
            description,
            price,
            categories {
              name,
              imageUrl
            },
            photos {
              photoUrl,
              featured
            }
          },
          eachPrice,
          totalPriceForThis,
          quantity
        },
        totalQuantity,
        totalPrice,
        orderDate
      },
      allOrderCount
    }
  }
`

export const CREATE_ORDER = gql`
  mutation createOrder(
    $customerId: String
    $address: String
    $products: [OrderProductInputData]
    $totalQuantity: Int
    $totalPrice: Int
  ) {
    createOrder(
      orderInputData: {
        customerId: $customerId
        address: $address
        products: $products
        totalQuantity: $totalQuantity
        totalPrice: $totalPrice
      }
    ) {
      customerId {
        name
        lastName
      }
    }
  }
`;
