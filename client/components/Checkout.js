import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { setCart } from "../store/cart";
import { Link } from "react-router-dom";
import OrderConfirmation from "./OrderConfirmation";
import { setCheckedoutCart } from "../store/checkedoutCart";

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
    };
    this.updateCart = this.updateCart.bind(this);
  }

  updateCart() {
    let guestCart = JSON.parse(window.localStorage.getItem("cart"));
    this.setState({
      cart: guestCart.items,
    });
  }

  async componentDidMount() {
    if (this.props.user.username) {
      await this.props.setCart(this.props.user.id);
    } else {
      this.updateCart();
    }
  }

  async componentWillUnmount() {
    let cart;
    if (this.props.user.username) {
      cart = this.props.cart;
    } else {
      cart = this.state.cart;
      const { data: order } = await axios.post("/api/orders/guest");
      await Promise.all(
        cart.map((item) => {
          return axios.post("/api/orderItems/guest", {
            orderId: order.id,
            quantity: item.quantity,
            purchasePrice: item.purchasePrice,
            itemId: item.id,
          });
        })
      );
    }
    this.props.setCheckedoutCart(cart);
  }

  render() {
    let cart;
    if (this.props.user.username) {
      cart = this.props.cart;
    } else {
      cart = this.state.cart;
    }
    let orderTotal = 0;
    if (!cart.includes(undefined)) {
      orderTotal = cart.reduce((total, item) => {
        return total + (item.price / 100) * item.quantity;
      }, 0);
    }
    return (
      <div className="checkout-container">
        {cart[0] &&
          cart.map((item) => {
            return (
              <div key={item.id} className="checkout-item-container">
                <div className="checkout-item">
                  <div>Item: {item.name}</div>
                  <div>{`Item Price: $${(item.price / 100).toFixed(2)}`}</div>
                  <div>Quantity: {item.quantity}</div>


                  <div>
                    Item Subtotal: $
                    {((item.price / 100) * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            );
          })}
        <h1>Order Total: ${orderTotal.toFixed(2)}</h1>
        <Link to="/orderConfirmation">
          <button type="button">Submit Order</button>
        </Link>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
    user: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    setCart: (userId) => dispatch(setCart(userId)),
    setCheckedoutCart: (cart) => dispatch(setCheckedoutCart(cart)),
  };
};

export default connect(mapState, mapDispatch)(Checkout);
