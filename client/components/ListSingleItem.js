import React from 'react';
import { Link } from 'react-router-dom';

export default class ListSingleItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const item = this.props.item;
    const price = item.price / 100;
    return (
      <div>
        <Link to={`/items/${this.props.item.id}`}>
          <ul>
            <img width="200px" src={item.imageUrl} />
            <li>{item.name}</li> {/* Area for Item Name*/}
            <li>{`$${price.toFixed(2)}`}</li>
            {/* Area for Item Price*/}
            <li>{item.description}</li> {/* Area for Item Description*/}
          </ul>
        </Link>
      </div>
    );
  }
}
