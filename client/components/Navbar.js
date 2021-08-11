import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import cart, { setCart } from '../store/cart';
import { fetchOrder } from '../store/order';
import { fetchOrderItems } from '../store/cartOrderItems';
import { setCount } from '../store/guestItemCount';

class Navbar extends React.Component {
  async componentDidMount() {
    if (this.props.id) {
      const order = await this.props.getOrder(this.props.id);
      const orderItems = await this.props.getOrderItems(this.props.order.id);
    } else {
      let cart = JSON.parse(window.localStorage.getItem('cart'));
      let items = cart.items || [];
      this.props.setCount(items.length);
    }
  }

  render() {
    let count;
    if (!this.props.id) {
      count = this.props.count;
    }
    const { handleClick, isLoggedIn, isAdmin, orderItems } = this.props;
    return (
      <div>
        <Link to="/home">
          <h1 className="logo">Grace-Rocker</h1>
        </Link>
        <nav className="nav">
          {isLoggedIn ? (
            <div className="nav-container">
              <div className="holder">
                {/* The navbar will show these links after you log in */}
                <Link to="/home">Home</Link>
                <a href="#" onClick={handleClick}>
                  Logout
                </a>
              </div>
              <div className="holder">
                <Link to="/cart">
                  <button type="button">
                    Cart {orderItems.length !== 0 && `: ${orderItems.length}`}
                  </button>
                </Link>
                {isAdmin && (
                  <Link to="/addItem">
                    <button type="button">Add Products</button>
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
              <Link to="/cart">
                <button type="button">
                  Cart {count !== 0 && `: ${count}`}
                </button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.isAdmin,
    id: state.auth.id,
    cart: state.cart,
    orderItems: state.orderItems,
    order: state.order,
    orderItem: state.orderItem,
    count: state.count,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
    getOrder: (userId) => dispatch(fetchOrder(userId)),
    getOrderItems: (orderId) => dispatch(fetchOrderItems(orderId)),
    setCart: (userId) => dispatch(setCart(userId)),
    setCount: (count) => dispatch(setCount(count)),
  };
};

export default connect(mapState, mapDispatch)(Navbar);
