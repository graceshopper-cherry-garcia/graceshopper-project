import React from 'react';
import ListSingleItem from './ListSingleItem';
import { fetchItems } from '../store/allitems';
import { connect } from 'react-redux';

export class AllItems extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    await this.props.fetchItems();
  }

  render() {
    return (
      <div>
        <ListSingleItem />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    items: state.allItems,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchItems: () => dispatch(fetchItems()),
  };
};

export default connect(mapState, mapDispatch)(AllItems);
