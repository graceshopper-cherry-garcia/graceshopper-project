import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchItem, deleteItemThunk } from '../store/singleItem';
import { addOrderItem } from '../store/orderItem';


export class SingleItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.selectorArray = this.selectorArray.bind(this);
  }

  componentDidMount() {
    this.props.fetchItem(this.props.match.params.id);
  }

  handleSubmit(event) {
    const cartItem = {
      quantity: this.state.quantity,
      purchasePrice: this.props.item.price,
      itemId: this.props.item.id,
      user: this.props.user,
    }
    if(this.props.user.name) {
      event.preventDefault();
      this.props.addToCart(cartItem);
    } else {
      event.preventDefault();
      let cart = JSON.parse(window.localStorage.getItem('cart'));
      let existingItems = cart.items;
      existingItems.push(cartItem);
      // console.log(existingItems)
      // console.log(JSON.stringify(existingItems))
      window.localStorage.setItem('cart', JSON.stringify({'items': existingItems}))
      // window.localStorage.setItem("cart", JSON.stringify(existingItems));


      // existingItems = JSON.parse(existingItems)
      }
      // existingItems.push(cartItem);
      // console.log(existingItems)
    // }


  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
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
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchItem: (id) => dispatch(fetchItem(id)),
    deleteItem: (item) => dispatch(deleteItemThunk(item, history)),
    addToCart: (orderItem) => dispatch(addOrderItem(orderItem))
  };
};

export default connect(mapState, mapDispatch)(SingleItem);
