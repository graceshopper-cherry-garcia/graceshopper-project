import React from "react";
import { connect } from "react-redux";
import { updateOrder } from "../store/order";
import { Link } from "react-router-dom";


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
        {this.props.user.username ? (
          <h3>{`Thanks for your order, ${this.props.user.username}`}</h3>
        ) : (
          <h3>Thanks for your order!</h3>
        )}
        {cart[0] &&
          cart.map((item) => {
            return (
              <div key={item.id} className="confirmation-item-container">
                <div className="confirmation-item">
                  <div>Item: {item.name}</div>
                  <div>{`Item Price: $${(item.price / 100).toFixed(2)}`}</div>
                  <div>Quantity: {item.quantity}</div>

                  <div>
                    Item Subtotal: $
                    {((item.price / 100) * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            );
          })}
        <h1>Order Total: ${orderTotal.toFixed(2)}</h1>
        <Link to='/home' >
          <h3>Continue Shopping!</h3>
        </Link>
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
  };
};

export default connect(mapState, mapDispatch)(OrderConfirmation);
