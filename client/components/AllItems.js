import React from 'react';
import ListSingleItem from './ListSingleItem';
import { fetchItems } from '../store/allItems';
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
      <div className="all-items-container">
        {this.props.items.map((item) => {
          return (
            <div className="all-items-single-container" key={item.id}>
              <ListSingleItem key={item.id} item={item} />;
            </div>
          );
        })}
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
