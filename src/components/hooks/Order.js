import { gql } from "@apollo/client";

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
