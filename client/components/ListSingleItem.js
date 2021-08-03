import React from 'react';

export default class ListSingleItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const item = this.props.item;
    return (
      <div>
        <ul>
          <img src={item.imageUrl} />
          <li>{item.name}</li> {/* Area for Item Name*/}
          <li>{`$ ${item.price.toFixed(2)}`}</li>
          {/* Area for Item Price*/}
          <li>{item.description}</li> {/* Area for Item Description*/}
        </ul>
      </div>
    );
  }
}
