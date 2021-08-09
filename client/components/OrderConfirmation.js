import React from 'react';
import { connect } from 'react-redux';
import { updateOrder } from '../store/order';

export class OrderConfirmation extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.updateOrder(this.props.user.id);
  }
  render() {
    const cart = this.props.location.props.cart || [];
    const totalPrice = this.props.location.props.orderTotal || '';
    return (
      <div className="confirmation-container">
        {cart[0] &&
          cart.map((item) => {
            return (
              <div key={item.id}>
                <div>{item.name}</div>
                <div> {(item.price / 100).toFixed(2)} </div>
                <div>{item.quantity} </div>
                <div>
                  <img width="200px" src={item.imageUrl} />
                </div>
                <h3>
                  Subtotal: {((item.price / 100) * item.quantity).toFixed(2)}
                </h3>
              </div>
            );
          })}
        <h1>TOTAL PRICE: {totalPrice}</h1>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    order: state.order,
    user: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    updateOrder: (userId) => dispatch(updateOrder(userId)),
  };
};

export default connect(mapState, mapDispatch)(OrderConfirmation);
