import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_CUSTOMERS } from "../../hooks/Customer";

const CustomerManagement = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [allCustomers, setAllCustomers] = useState(0);
  const [pages, setPages] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [getCustomers] = useLazyQuery(GET_CUSTOMERS, {
    variables: {
      PageNumber: pageNumber,
      PageSize: pageSize,
    },
    onCompleted: (data) => {
      return data;
    },
  });

  useEffect(() => {
    getCustomers()
      .then((res) => {
        setAllCustomers(res.data.getCustomers.allCustomerCount);
        setCustomers(res.data.getCustomers.customers);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, [getCustomers, pageNumber]);

  useEffect(() => {
    if (allCustomers > pageSize) {
      let pagesToCreate = Math.ceil(allCustomers / pageSize);
      for (let i = 0; i < pagesToCreate; i++) {
        setPages((preValues) => [...preValues, <h1>Hi</h1>]);
      }
    }
  }, [allCustomers, pageSize]);

  const goToNewPage = (e) => {
    let targetNumber = e.target;
    const number = targetNumber.getAttribute("name");
    setPageNumber(parseInt(number));
  };

  return (
    <div className="adminPanelItem">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Last Name</th>
            <th>Email Address</th>
            <th>Physical Address</th>
            <th>Phone Number</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {customers
            .filter((x) => x.userId.userRole.name !== "Admin")
            .map((customer, index) => (
              <tr className="customerTr" key={customer._id}>
                <td>{index + 1}</td>
                <td>{customer.name}</td>
                <td>{customer.lastName}</td>
                <td>{customer.emailAddress}</td>
                <td>{customer.physicalAddress}</td>
                <td>{customer.phoneNumber}</td>
                <td>
                  {customer.photoUrl && (
                    <img
                      src={"http://localhost:5000/" + customer.photoUrl}
                      alt=""
                    />
                  )}
                </td>
              </tr>
            ))}
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

export default CustomerManagement;
