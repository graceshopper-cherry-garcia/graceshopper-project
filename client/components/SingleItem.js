import React from "react";
import { connect } from "react-redux";
import { fetchItem } from "../store/singleItem";

class SingleItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchItem(this.props.match.params.id);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  render() {
    console.log(this.props.user)
    const item = this.props.item;
    const selectorArray = Array.from(Array(99).keys());

    return (
      <div className="single-item-container">
        <img src={item.imageUrl} />
        <div className="single-item-info">
          <h1>{item.name}</h1>
          <span className="add-to-cart">
            <p>{item.price}</p>
            <form onSubmit={this.handleSubmit}>
              <select
                type="select"
                name="quantity"
                onChange={this.handleChange}
              >
                {selectorArray.map((num) => {
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
        {this.props.user.isAdmin &&
        <div>
          <button type='button'>Edit</button>
          <button type='button'>Delete</button>
        </div>}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    item: state.singleItem,
    user: state.auth
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchItem: (id) => dispatch(fetchItem(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleItem);
