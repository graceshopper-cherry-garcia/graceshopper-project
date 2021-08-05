import React from 'react';
import { connect } from 'react-redux';
import { addOrderItem } from '../store/orderItem';
import { fetchItem } from '../store/singleItem';
import { updateItemThunk } from '../store/singleItem';

export class EditItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      price: '',
      description: '',
      imageUrl: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    await this.props.fetchItem(this.props.match.params.id);
    this.setState({
      id: this.props.item.id,
      name: this.props.item.name,
      price: this.props.item.price / 100,
      description: this.props.item.description,
      imageUrl: this.props.item.imageUrl,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.id !== this.state.id) {
      this.setState({
        id: this.state.id,
        name: this.state.name,
        price: this.state.price,
        description: this.state.description,
        imageUrl: this.state.imageUrl,
      });
    }
  }

  handleChange(evt) {
    this.setState({
      ...this.state,
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.updateItem(this.state);
  }

  render() {
    return (
      <div className="form-container">
        <form onSubmit={this.handleSubmit}>
          <div className="form-row">
            <label htmlFor="name">Name</label>
            <input
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-row">
            <label htmlFor="description">Description</label>
            <input
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-row">
            <label htmlFor="price">Price</label>
            <input
              name="price"
              value={this.state.price}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-row">
            <label htmlFor="imageUrl">Image</label>
            <input
              name="imageUrl"
              value={this.state.imageUrl}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    item: state.singleItem,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchItem: (id) => dispatch(fetchItem(id)),
    updateItem: (inputItem) => {
      let item = {
        ...inputItem,
        price: parseInt(inputItem.price * 100, 10),
      };
      dispatch(updateItemThunk(item, history));
    },
  };
};

export default connect(mapState, mapDispatch)(EditItem);
