import React from 'react';
import { updateOrderItem } from '../store/orderItem';
import { deleteCartItemThunk } from '../store/cartOrderItems';
import { connect } from 'react-redux';
import { setCart } from '../store/cart';


export class SingleCartItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.item.quantity || 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange(evt) {
    await this.setState({
      [evt.target.name]: evt.target.value,
    });
    const updatedOrderItem = {
      ...this.props.item.order_item,
      quantity: this.state.quantity,
    };
    this.props.updateItem(updatedOrderItem);
    this.props.setCart(this.props.user.id);
  }

  render() {
    const item = this.props.item;
    const price = item.price / 100;
    return (
      <div>
        <button
          value={this.props.item.id}
          type="button"
          onClick={(e) => this.props.handleDelete(e)}
        >
          Delete
        </button>
        <h2>{item.name}</h2>
        <img width="200px" src={item.imageUrl} />
        <div>{`Item Price: $${price}`}</div>
        <div>
          <label htmlFor="quantity">Quantity</label>
          <input
            onChange={this.handleChange}
            name="quantity"
            type="number"
            value={this.state.quantity}
          />
        </div>
        <h3>{`Subtotal: $${(price * this.state.quantity).toFixed(2)}`}</h3>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    updateItem: (orderItem) => dispatch(updateOrderItem(orderItem)),

    setCart: (userId) => dispatch(setCart(userId)),
  };
};

export default connect(mapState, mapDispatch)(SingleCartItem);

