import React from 'react';
import { connect } from 'react-redux';
import { updateOrder } from '../store/order';

export class OrderConfirmation extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (this.props.user.username) {
      this.props.updateOrder(this.props.user.id);
    } else {
      window.localStorage.clear();
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
                <div>{item.quantity} </div>
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
    checkedoutCart: state.checkedoutCart
  };
};

const mapDispatch = (dispatch) => {
  return {
    updateOrder: (userId) => dispatch(updateOrder(userId)),
  };
};

export default connect(mapState, mapDispatch)(OrderConfirmation);
