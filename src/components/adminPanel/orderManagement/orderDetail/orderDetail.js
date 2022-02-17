import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { CHANGE_APPROVE_STATUS } from "../../../hooks/Order";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../../../../store/order";
import "./orderDetail.module.css";

const OrderDetail = () => {
  const dispatch = useDispatch();
  const [statusText, setStatusText] = useState();
  const [ID, setID] = useState();
  const order = useSelector(state => state.orders.order);

  const [approveOrder] = useMutation(CHANGE_APPROVE_STATUS, {
    variables: {
      ID: ID,
      statusText: statusText,
    },
    onCompleted: (data) => data,
  });

  useEffect(() => {
    if (ID && statusText) {
      approveOrder()
        .then((res) => {
          dispatch(orderActions.selectedOrderUpdate(res.data.approveOrder));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [ID, statusText]);

  if (!order) {
    return <p>Loading</p>;
  }

  return (
    <div style={{ marginLeft: "20px" }}>
      <div style={{ display: "flex" }}>
        <h1>Order Code: </h1>
        <h1>{order.orderCode}</h1>
      </div>
      <div style={{ display: "flex" }}>
        <h1>Name: </h1>
        <h1>{order.customerId.name}</h1>
      </div>
      <div style={{ display: "flex" }}>
        <h1>Last Name: </h1>
        <h1>{order.customerId.lastName}</h1>
      </div>
      <div style={{ display: "flex" }}>
        <h1>Phone Number: </h1>
        <h1>{order.customerId.phoneNumber}</h1>
      </div>
      <div style={{ display: "flex" }}>
        <h1>Email Address: </h1>
        <h1>{order.customerId.emailAddress}</h1>
      </div>
      <div style={{ display: "flex" }}>
        <h1>Photo: </h1>
        <img
          src={`/${order.customerId.photoUrl}`}
          width="150"
          height="130"
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>Products: </h1>
        {order.products.map((product, index) => {
          return (
            <div key={index} style={{ flexGrow: "1" }}>
              <ul>
                <li>name: {product.productId.name}</li>
                <li>Price: {product.eachPrice}</li>
                <li>Quantity: {product.quantity}</li>
                <li>Total Price: {product.totalPriceForThis}</li>
              </ul>
              <hr />
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex" }}>
        <h1>Address: </h1>
        <h1>{order.address}</h1>
      </div>
      <div style={{ display: "flex" }}>
        <h1>Total Quanity: </h1>
        <h1>{order.totalQuantity}</h1>
      </div>
      <div style={{ display: "flex" }}>
        <h1>Total Price: </h1>
        <h1>{order.totalPrice}</h1>
      </div>
      <button
        className="btn"
        style={{
          margin: "0 0",
          cursor: "pointer",
          background: order.approved === "Approved" ? "red" : "",
        }}
        onClick={() => {
          if (order.approved === "Approved") {
            setID(order._id);
            setStatusText("Cancelled");
          } else {
            setID(order._id);
            setStatusText("Approved");
          }
        }}
      >
        {order.approved === "Approved" ? "Cancel" : "Approve"}
      </button>
    </div>
  );
};

export default OrderDetail;
