import React from "react";
import { connect } from "react-redux";
import { fetchItem } from "../store/singleItem";
import { updateItemThunk } from "../store/singleItem";

export class EditItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item,
    };
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchItem(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.item !== this.props.item) {
      this.setState({
        item: this.props.item,
      });
    }
  }

  handleChange(evt) {
    this.setState({
      item: { ...this.state.item, [evt.target.name]: evt.target.value },
    });
  }

    handleSubmit(evt) {
    evt.preventDefault();
    this.props.updateItem(this.state.item);
  }

  render() {
    // console.log(this.state.item)
    return (
    <div className='form-container'>
      <form onSubmit={this.handleSubmit}>
        <div className='form-row'>
          <label htmlFor='name'>Name</label>
          <input
          name='name'
          value={this.state.item.name}
          onChange={this.handleChange}
          />
        </div>

        <div className='form-row'>
          <label htmlFor='description'>Description</label>
          <input
          name='description'
          value={this.state.item.description}
          onChange={this.handleChange}
          />
        </div>

        <div className='form-row'>
          <label htmlFor='price'>Price</label>
          <input
          name='price'
          value={this.state.item.price}
          onChange={this.handleChange}
          />
        </div>

        <div className='form-row'>
          <label htmlFor='imageUrl'>Image</label>
          <input
          name='imageUrl'
          value={this.state.item.imageUrl}
          onChange={this.handleChange}
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
    )
  }
}

const mapState = (state) => {
  return {
    item: state.singleItem,
    // user: state.auth
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchItem: (id) => dispatch(fetchItem(id)),
    updateItem: (item) => dispatch(updateItemThunk(item, history))
  };
};

export default connect(mapState, mapDispatch)(EditItem);
