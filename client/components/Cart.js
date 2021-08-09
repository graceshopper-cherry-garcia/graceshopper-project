import React from "react";
import { fetchOrder } from "../store/order";
import { fetchOrderItems } from "../store/cartOrderItems";
import { connect } from "react-redux";
import SingleCartItem from "./SingleCartItem";
import { Link } from "react-router-dom";
import { deleteOrderItem } from "../store/orderItem";
import { Route } from "react-router-dom";
import Checkout from "./Checkout";
import { setCart } from "../store/cart";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
  }

  updateQuantity() {
    let guestCart = JSON.parse(window.localStorage.getItem("cart"));
    this.setState({
      cart: guestCart.items,
    });
  }

  async componentDidMount() {
    if (this.props.user.username) {
      await this.props.setCart(this.props.user.id);
    } else {
      this.updateQuantity();
    }
  }

  async handleDelete(event) {
    if (this.props.user.username) {
      await this.props.deleteItem(event.target.value);
      await this.props.setCart(this.props.user.id);
    } else {
      let cart = JSON.parse(window.localStorage.getItem("cart"));
      let existingItems = cart.items;
      const guestCart = existingItems.filter((item) => {
        return item.id !== parseInt(event.target.value, 10);
      });
      window.localStorage.setItem("cart", JSON.stringify({ items: guestCart }));
      this.setState({
        cart: guestCart,
      });
    }
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
        <h1>Your Cart: </h1>
        {cart.length === 0 && <div>Nothing in Cart</div>}
        {!cart.includes(undefined) &&
          cart.map((item) => {
            return (
              <SingleCartItem
                key={item.id}
                item={item}
                handleDelete={this.handleDelete}
                updateQuantity={this.updateQuantity}
              />
            );
          })}
        <h1>
          Order Total: <span>{`$${orderTotal.toFixed(2)}`}</span>
        </h1>
        <Link to="/checkout">
          <button type="button">Checkout</button>
        </Link>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    order: state.order,
    user: state.auth,
    orderItems: state.orderItems,
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getOrder: (userId) => dispatch(fetchOrder(userId)),
    getOrderItems: (orderId) => dispatch(fetchOrderItems(orderId)),
    deleteItem: (itemId) => dispatch(deleteOrderItem(itemId)),
    setCart: (userId) => dispatch(setCart(userId)),
  };
};

export default connect(mapState, mapDispatch)(Cart);
