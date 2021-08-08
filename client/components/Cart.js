import React from 'react';
import { fetchOrder } from '../store/order';
import { fetchOrderItems } from '../store/cartOrderItems';
import { connect } from 'react-redux';
import SingleCartItem from './SingleCartItem';
import { deleteOrderItem } from '../store/orderItem';
import { Route } from 'react-router-dom';
import Checkout from './Checkout';
import { setCart } from '../store/cart';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    // this.concatItems = this.concatItems.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  async componentDidMount() {
    // await this.props.getOrder(this.props.user.id);
    // await this.props.getOrderItems(this.props.order.id);
    console.log('user id is ', this.props.user.id);
    await this.props.setCart(this.props.user.id);
  }

  // concatItems(items, order_items) {
  //   return items.map((item) => {
  //     for (let i = 0; i < order_items.length; i++) {
  //       if (order_items[i].itemId === item.id) {
  //         return { ...item, quantity: order_items[i].quantity };
  //       }
  //     }
  //   });
  // }

  async handleDelete(event) {
    await this.props.deleteItem(event.target.value);
    await this.props.setCart(this.props.user.id);
    // await this.props.getOrder(this.props.user.id);
    // await this.props.getOrderItems(this.props.order.id);
  }

  render() {
    console.log('checkout please', this.props.cart);
    // const order_items = this.props.orderItems || [];
    // const items = this.props.order.items || [];
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
          Order Total: <span>{`$${orderTotal}`}</span>
        </h1>
        <button type="button">Submit Order</button>
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
