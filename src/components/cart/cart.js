import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../store/cart";
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_ORDER } from '../hooks/Order';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(false);
  const [orderProducts, setOrderProducts] = useState([]);
  const [displayPopup, setDisplayPopup] = useState(false);
  const itemsInCart = useSelector((state) => state.cart.itemsInCart);
  const token = useSelector((state) => state.auth.token)
  const customerId = useSelector((state) => state.customer._id)
  const address = useSelector((state) => state.customer.physicalAddress)
  const total = useSelector((state) => state.cart.totalPrice);
  const totalItemsInCart = useSelector((state) => state.cart.totalItemsInCart);
  const [createOrder] = useMutation(CREATE_ORDER, {
    variables: {
      customerId: customerId,
      address: address,
      products: orderProducts,
      totalQuantity: parseInt(totalItemsInCart),
      totalPrice: parseInt(total),
    }
  })

  const addSingleItem = (e) => {
    dispatch(cartActions.addToCart({ item: e }));
  };
  const removeSigleItem = (e) => {
    dispatch(cartActions.removeSingleItem({ item: e }));
  };

  const removeFromCart = (e) => {
    dispatch(cartActions.removeTotalItem({ item: e }));
  };

  useEffect(() => {
    setOrderProducts([]);
    itemsInCart.forEach(item => {
      const ie = {};
      ie.productId = item._id;
      ie.eachPrice = item.price;
      ie.totalPriceForThis = item.totalPriceForThis;
      ie.quantity = item.quantity;
      setOrderProducts(preState => [...preState, ie]);
    });
  }, [itemsInCart])

  const makeOrder = () => {
    if (!token) {
      navigate('/login');
    }
    createOrder().then((res) => {
      setDisplayPopup(false);
      setConfirm(true);
      dispatch(cartActions.clearCart());
    }).catch((error) => {
      console.log(error.message);
    })
  }

  useEffect(() => {
    if(confirm) {
      setInterval(() => {
        setConfirm(false);
      }, 2000)
    }
  }, [confirm])

  return (
    <div>
      {
        displayPopup && itemsInCart.length > 0 &&
        <div className="popup">
          <h1>Do you want to order?</h1>
          <button className="btn" onClick={makeOrder}>Yes</button>
          <button className="btn" onClick={() => setDisplayPopup(false)} style={{background: "crimson"}}>No</button>
        </div>
      }
      {
        confirm &&
        <div className="popup">
          <h1>We recieved your order</h1>
        </div>
      }
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
                          src={`/${
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
          <button className="btn" style={{ cursor: "pointer" }} onClick={() => setDisplayPopup(true)}>
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
