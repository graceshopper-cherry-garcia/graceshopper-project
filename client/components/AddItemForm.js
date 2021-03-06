import React from 'react';
import { addItem } from '../store/allItems';
import { connect } from 'react-redux';

export class AddItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      imageUrl: '',
      price: '',
      description: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.create({ ...this.state, price: parseInt(this.state.price*100,10) });
    this.props.history.push('/home');
  }

  render() {
    const { handleChange, handleSubmit } = this;
    return (
      <div className="form_container" onSubmit={handleSubmit}>
        <form>
          <label htmlFor="name field">Name: </label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={handleChange}
            placeholder='required field'
            required
          />

          <label htmlFor="image field">Image URL: </label>
          <input
            type="text"
            name="imageUrl"
            value={this.state.imageUrl}
            onChange={handleChange}
          />
          <label htmlFor="price field">Price: </label>
          <input
            type="number"
            name="price"
            value={this.state.price}
            onChange={handleChange}
            min='0'
          />
          <label htmlFor="description field">Description: </label>
          <input
            type="text"
            name="description"
            value={this.state.description}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={!this.state.name && this.state.price > 0}
          >
            Add Item
          </button>
        </form>
      </div>
    );
  }
}



const mapDispatch = (dispatch) => {
  return {
    create: (item) => dispatch(addItem(item)),
  };
};

export default connect(null, mapDispatch)(AddItemForm);
