import React from 'react';
import { connect } from 'react-redux';
import { updateOrder } from '../store/order';
import { setCart } from '../store/cart';
import { setCount } from '../store/guestItemCount';
import { fetchOrder } from '../store/order';
import { fetchOrderItems } from '../store/cartOrderItems';

export class OrderConfirmation extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    if (this.props.user.username) {
      await this.props.updateOrder(this.props.user.id);
      const order = await this.props.getOrder(this.props.user.id);
      const orderItems = await this.props.getOrderItems(this.props.order.id);
      console.log(orderItems);
    } else {
      window.localStorage.clear();
      this.props.setCount(0);
    }
  }
  render() {
    const cart = this.props.checkedoutCart || [];
    let orderTotal = 0;
    if (!cart.includes(undefined)) {
      orderTotal = cart.reduce((total, item) => {
        return total + (item.price / 100) * item.quantity;
      }, 0);
    }
    return (
      <div className="confirmation-container">
        {cart[0] &&
          cart.map((item) => {
            return (
              <div key={item.id}>
                <div>{item.name}</div>
                <div> ${(item.price / 100).toFixed(2)} </div>
                <div>Quantity: {item.quantity} </div>
                <div>
                  <img width="200px" src={item.imageUrl} />
                </div>
                <h3>
                  Subtotal: ${((item.price / 100) * item.quantity).toFixed(2)}
                </h3>
              </div>
            );
          })}
        <h1>TOTAL PRICE: ${orderTotal.toFixed(2)}</h1>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    order: state.order,
    user: state.auth,
    checkedoutCart: state.checkedoutCart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    updateOrder: (userId) => dispatch(updateOrder(userId)),
    setCart: (userId) => dispatch(setCart(userId)),
    setCount: (count) => dispatch(setCount(count)),
    getOrder: (userId) => dispatch(fetchOrder(userId)),
    getOrderItems: (orderId) => dispatch(fetchOrderItems(orderId)),
  };
};

export default connect(mapState, mapDispatch)(OrderConfirmation);
