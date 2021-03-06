import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchItem, deleteItemThunk } from "../store/singleItem";
import { addOrderItem } from "../store/orderItem";
import order from "../store/order";
import { fetchOrder } from "../store/order";
import { fetchOrderItems } from "../store/cartOrderItems";

export class SingleItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      addedToCart: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.selectorArray = this.selectorArray.bind(this);
  }

  componentDidMount() {
    this.props.fetchItem(this.props.match.params.id);
  }

  async guestSubmit(cartItem) {
    const guestCartItem = {
      quantity: cartItem.quantity,
      purchasePrice: cartItem.purchasePrice,
      imageUrl: this.props.item.imageUrl,
      id: this.props.item.id,
      description: this.props.item.description,
      name: this.props.item.name,
      price: this.props.item.price,
    };
    let cart = JSON.parse(window.localStorage.getItem("cart"));
    let existingItems = cart.items;
    let found;
    found = existingItems.find((item) => {
      return item.id === this.props.item.id;
    });
    if (found) {
      alert("This item aleady exists in your cart!");
    } else {
      existingItems.push(guestCartItem);
      window.localStorage.setItem(
        "cart",
        JSON.stringify({ items: existingItems })
      );
      this.setState({
        addedToCart: true,
      });
    }
  }

  async userSubmit(cartItem) {
    await this.props.getOrder(this.props.user.id);
    await this.props.getOrderItems(this.props.order.id);
    let found;
    found = this.props.orderItems.find((item) => {
      return item.itemId === this.props.item.id;
    });
    if (found) {
      alert("This item aleady exists in your cart!");
    } else {
      this.props.addToCart(cartItem);
      this.setState({
        addedToCart: true,
      });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    const cartItem = {
      quantity: this.state.quantity,
      purchasePrice: this.props.item.price,
      itemId: this.props.item.id,
      user: this.props.user,
    };
    if (this.props.user.username) {
      this.userSubmit(cartItem);
    } else {
      this.guestSubmit(cartItem);
    }
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: parseInt(evt.target.value, 10),
    });
  }

  selectorArray() {
    let limit = 30;
    if (this.props.item.stock < 30) {
      limit = this.props.item.stock;
    }
    let array = [];
    for (let i = 0; i < limit; i++) {
      array.push(i);
    }
    return array;
  }

  render() {
    const item = this.props.item;
    return (
      <div className="single-item-container">
        {this.state.addedToCart && (
          <div className="alert-container">
            <div
              className="alert alert-secondary alert-dismissible fade show"
              role="alert"
            >
              Added {this.state.quantity} {item.name}
              {this.state.quantity > 1 ? "s" : ""} to{" "}
              <Link to='/cart'>cart</Link>!
              <button
                id="close-alert"
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
        )}
        <div className='single-item-content'>
        <img width="200px" src={item.imageUrl} />
        <div className="single-item-info">
          <h1>{item.name}</h1>
          <span className="add-to-cart">
            <p>${item.price / 100}</p>
            <form onSubmit={this.handleSubmit}>
              <select
                type="select"
                name="quantity"
                onChange={this.handleChange}
              >
                {this.selectorArray().map((num) => {
                  return (
                    <option key={num} value={num + 1}>
                      {num + 1}
                    </option>
                  );
                })}
              </select>
              <button type="submit">Add To Cart</button>
            </form>
          </span>
          <p>{item.description}</p>
        </div>

        </div>


        {this.props.user.isAdmin && (
          <div className="admin-buttons">
            <Link to={`/editItem/${this.props.item.id}`}>
              <button type="button">Edit</button>
            </Link>
            <button onClick={() => this.props.deleteItem(item)} type="button">
              Delete
            </button>
          </div>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    item: state.singleItem,
    user: state.auth,
    order: state.order,
    orderItems: state.orderItems,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchItem: (id) => dispatch(fetchItem(id)),
    deleteItem: (item) => dispatch(deleteItemThunk(item, history)),
    addToCart: (orderItem) => dispatch(addOrderItem(orderItem)),
    getOrder: (userId) => dispatch(fetchOrder(userId)),
    getOrderItems: (orderId) => dispatch(fetchOrderItems(orderId)),
  };
};

export default connect(mapState, mapDispatch)(SingleItem);
