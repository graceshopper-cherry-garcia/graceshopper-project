import React from 'react';
import { fetchOrder } from '../store/order';
import { fetchOrderItems } from '../store/cartOrderItems';
import { connect } from 'react-redux';
import SingleCartItem from './SingleCartItem';

class Cart extends React.Component {
  constructor() {
    super();
    this.concatItems = this.concatItems.bind(this);
  }

  async componentDidMount() {
    await this.props.getOrder(this.props.user.id);
    this.props.getOrderItems(this.props.order.id);
  }

  concatItems(items, order_items) {
    return items.map((item) => {
      for (let i = 0; i < order_items.length; i++) {
        if (order_items[i].itemId === item.id) {
          return { ...item, quantity: order_items[i].quantity };
        }
      }
    });
  }

  render() {
    console.log('props', this.props);
    const order_items = this.props.orderItems || [];
    const items = this.props.order.items || [];
    const updatedOrderItems = this.concatItems(items, order_items);
    let orderTotal = 0;
    if (updatedOrderItems[0]) {
      console.log('cart items is ', updatedOrderItems);
      orderTotal = updatedOrderItems.reduce((total, item) => {
        console.log('price is ', item.price / 100);
        console.log('quantity is ', item.quantity);
        return total + (item.price / 100) * item.quantity;
      }, 0);
    }
    return (
      <div>
        <h1>Your Cart: </h1>
        {order_items.length === 0 && <div>Nothing in Cart</div>}
        {updatedOrderItems[0] &&
          updatedOrderItems.map((item) => {
            return (
              // <div key={item.id}>
              //   {item.quantity}
              // </div>
              // <CartItem item={item} key={item.id}/>
              <SingleCartItem key={item.id} item={item} />
            );
          })}
        <h1>
          Order Total: <span>{`$${orderTotal}`}</span>
        </h1>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    order: state.cart,
    user: state.auth,
    orderItems: state.cartItems,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getOrder: (userId) => dispatch(fetchOrder(userId)),
    getOrderItems: (orderId) => dispatch(fetchOrderItems(orderId)),
  };
};

export default connect(mapState, mapDispatch)(Cart);
