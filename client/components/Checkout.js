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
    // this.onClick = this.onClick.bind(this);
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

  componentWillUnmount() {
    let cart;
    if (this.props.user.username) {
      cart = this.props.cart;
    } else {
      cart = this.state.cart;
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
      <div>
        {cart[0] &&
          cart.map((item) => {
            return (
              <div key={item.id}>
                <h2>{item.name}</h2>
                <img width="200px" src={item.imageUrl} />
                <div>{`Item Price: $${(item.price / 100).toFixed(2)}`}</div>
                <div>Quantity: {item.quantity}</div>
                <div>
                  Item Subtotal: $
                  {((item.price / 100) * item.quantity).toFixed(2)}
                </div>
              </div>
            );
          })}
        <h1>Order Total: ${orderTotal.toFixed(2)}</h1>
        <Link to="/orderConfirmation">
          <button type="button">
            Submit Order
          </button>
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
