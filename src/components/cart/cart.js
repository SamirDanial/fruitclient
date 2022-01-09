import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../store/cart";

const Cart = () => {
  const dispatch = useDispatch();
  const itemsInCart = useSelector((state) => state.cart.itemsInCart);
  const total = useSelector((state) => state.cart.totalPrice);

  const addSingleItem = (e) => {
    dispatch(cartActions.addToCart({ item: e }));
  };
  const removeSigleItem = (e) => {
    dispatch(cartActions.removeSingleItem({ item: e }));
  };

  const removeFromCart = (e) => {
    dispatch(cartActions.removeTotalItem({ item: e }));
  };

  return (
    <div>
      <div className="small-container cart-page">
        <table>
          <tbody>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
            {itemsInCart.map((item, index) => {
              if (item.quantity > 0) {
                return (
                  <tr key={index}>
                    <td>
                      <div className="cart-info">
                        <img
                          src={`http://localhost:5000/${
                            item.photos.find((x) => x.featured === true)
                              .photoUrl
                          }`}
                          alt=""
                        />
                        <div>
                          <p>{item.name}</p>
                          <small>{item.price}</small>
                          <br />
                          <p
                            style={{
                              color: "#ff523b",
                              fontSize: "12px",
                              cursor: "pointer",
                            }}
                            onClick={() => removeFromCart(item)}
                          >
                            Remove
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="nCartBtn">
                        <button onClick={() => addSingleItem(item)}>+</button>
                        {item.quantity ? item.quantity : 1}
                        <button onClick={() => removeSigleItem(item)}>-</button>
                      </div>
                    </td>
                    <td>
                      {item.totalPriceForThis
                        ? item.totalPriceForThis
                        : item.price}
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
        <div className="total-price">
          <table>
            <tbody>
              <tr>
                <td>Total</td>
                <td>{total}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <button className="btn" style={{ cursor: "pointer" }}>
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
