import React from 'react';
import { connect } from 'react-redux';
import { setCart } from '../store/cart';
import { Link } from 'react-router-dom';
import OrderConfirmation from './OrderConfirmation';

class Checkout extends React.Component {
  componentDidMount() {
    this.props.setCart(this.props.user.id);
  }
  render() {
    console.log('Checkout Props', this.props.cart);
    let orderTotal = 0;
    if (!this.props.cart.includes(undefined)) {
      orderTotal = this.props.cart.reduce((total, item) => {
        return total + (item.price / 100) * item.quantity;
      }, 0);
    }
    return (
      <div>
        {this.props.cart[0] &&
          this.props.cart.map((item) => {
            return (
              <div key={item.id}>
                <h2>{item.name}</h2>
                <img width="200px" src={item.imageUrl} />
                <div>{`Item Price: $${(item.price / 100).toFixed(2)}`}</div>
                <div>Quantity: {item.quantity}</div>
                <div>Item Subtotal: ${(item.price / 100) * item.quantity}</div>
              </div>
            );
          })}
        <h1>Order Total: ${orderTotal.toFixed(2)}</h1>
        <Link
          to={{
            pathname: '/orderConfirmation',
            props: {
              cart: this.props.cart,
              orderTotal: orderTotal
            },
          }}
        >
          <button type="submit">Submit Order</button>
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
  };
};

export default connect(mapState, mapDispatch)(Checkout);
