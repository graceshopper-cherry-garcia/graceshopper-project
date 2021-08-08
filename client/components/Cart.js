import React from 'react';
import { fetchOrder } from '../store/order';
import { fetchOrderItems } from '../store/cartOrderItems';
import { connect } from 'react-redux';
import SingleCartItem from './SingleCartItem';
import { deleteOrderItem } from "../store/orderItem";


class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.concatItems = this.concatItems.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

  }

  async componentDidMount() {
    await this.props.getOrder(this.props.user.id);
    await this.props.getOrderItems(this.props.order.id);
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

  async handleDelete(event) {
    await this.props.deleteItem(event.target.value);
    await this.props.getOrder(this.props.user.id);
    await this.props.getOrderItems(this.props.order.id);

  }

  render() {
    const order_items = this.props.orderItems || [];
    const items = this.props.order.items || [];
    const updatedOrderItems = this.concatItems(items, order_items);
    let orderTotal = 0;
    if (!updatedOrderItems.includes(undefined)) {
      orderTotal = updatedOrderItems.reduce((total, item) => {
        return total + (item.price / 100) * item.quantity;
      }, 0);
    }
    return (
      <div>
        <h1>Your Cart: </h1>
        {order_items.length === 0 && <div>Nothing in Cart</div>}
        {!updatedOrderItems.includes(undefined) &&
          updatedOrderItems.map((item) => {
            return (
              <SingleCartItem key={item.id} item={item} handleDelete={this.handleDelete} />
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
    deleteItem: (itemId) => dispatch(deleteOrderItem(itemId))
  };
};

export default connect(mapState, mapDispatch)(Cart);
