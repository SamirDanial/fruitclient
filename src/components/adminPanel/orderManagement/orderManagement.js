import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_ORDERS, CHANGE_APPROVE_STATUS } from "../../hooks/Order";
import {useDispatch, useSelector} from 'react-redux';
import { orderActions } from '../../../store/order';

const OrderManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(25);
  const [pages, setPages] = useState([]);
  const [allOrders, setAllOrders] = useState(0);
  const [statusText, setStatusText] = useState();
  const [ID, setID] = useState();
  const orders = useSelector(state => state.orders.orders);

  const [getOrders] = useLazyQuery(GET_ORDERS, {
    variables: {
      PageNumber: pageNumber,
      PageSize: pageSize,
    },
    onCompleted: (data) => {
      return data;
    },
  });

  const [approveOrder] = useMutation(CHANGE_APPROVE_STATUS, {
    variables: {
      ID: ID,
      statusText: statusText
    },
    onCompleted: data => data
  })

  useEffect(() => {
    if(ID && statusText) {
      approveOrder().then(res => {
        dispatch(orderActions.updateOrder(res.data.approveOrder));
      }).catch(error => {
        console.log(error);
      })
    }
  }, [ID, statusText])

  useEffect(() => {
    getOrders()
      .then((res) => {
        dispatch(orderActions.getOrders(res.data.getOrders.orders))
        setAllOrders(res.data.getOrders.allOrderCount);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [orders, pageNumber]);

  useEffect(() => {
    if (allOrders > pageSize) {
      let pagesToCreate = Math.ceil(allOrders / pageSize);
      for (let i = 0; i < pagesToCreate; i++) {
        setPages((preValues) => [...preValues, <h1>Hi</h1>]);
      }
    }
  }, [allOrders, pageSize]);

  const goToNewPage = (e) => {
    let targetNumber = e.target;
    const number = targetNumber.getAttribute("name");
    setPageNumber(parseInt(number));
  };

  if (!orders) {
    return <p>Loading...</p>;
  }

  return (
    <div className="adminPanelItem">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Order Code</th>
            <th>Name</th>
            <th>Address</th>
            <th>Total Price</th>
            <th>Order Date</th>
            <th>Approve</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => {
            const time = new Date(parseInt(order.orderDate));
            const date = new Date(time);
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{order.orderCode}</td>
                <td>{order.customerId.name}</td>
                <td>{order.address}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {`${date.toDateString() + " - " + date.toLocaleTimeString()}`}
                </td>
                <td>
                  <button
                    className="btn"
                    style={{ margin: "0 0", cursor: "pointer", background: order.approved === "Approved" ? 'red': '' }}
                    onClick={() => {
                      if (order.approved === "Approved") {
                        setID(order._id);
                        setStatusText('Cancelled');
                      } else {
                        setID(order._id);
                        setStatusText('Approved');
                      }
                    }}
                  >
                    { order.approved === "Approved" ? 'Cancel' : 'Approve'}
                  </button>
                </td>
                <td>
                  <button
                    className="btn"
                    onClick={() => {
                      dispatch(orderActions.getOrder(order));
                      navigate(`/orderDetail/${order._id}`);
                    }}
                    style={{
                      background: "blue",
                      margin: "0 0",
                      cursor: "pointer",
                    }}
                  >
                    Detail
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="page-btn">
        {pages.map((page, index) => {
          return (
            <span key={index} name={index + 1} onClick={goToNewPage}>
              {index + 1}
            </span>
          );
        })}
        {/* {pages.length > 0 && <span>→</span>} */}
      </div>
    </div>
  );
};

export default OrderManagement;
