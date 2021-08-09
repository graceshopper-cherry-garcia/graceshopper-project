import React from 'react';
import { fetchOrder } from '../store/order';
import { fetchOrderItems } from '../store/cartOrderItems';
import { connect } from 'react-redux';
import SingleCartItem from './SingleCartItem';
import { Link } from 'react-router-dom';
import { deleteOrderItem } from '../store/orderItem';
import { Route } from 'react-router-dom';
import Checkout from './Checkout';
import { setCart } from '../store/cart';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  async componentDidMount() {
    await this.props.setCart(this.props.user.id);
  }

  async handleDelete(event) {
    await this.props.deleteItem(event.target.value);
    await this.props.setCart(this.props.user.id);
  }


  render() {
    const cart = this.props.cart;
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
              />
            );
          })}
        <h1>
          Order Total: <span>{`$${orderTotal.toFixed(2)}`}</span>
        </h1>
        <Link to='/checkout'>
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
