import React from 'react';

export default class SingleCartItem extends React.Component {
  render() {
    const item = this.props.item;
    const price = item.price / 100;
    return (
      <div>
        <h2>{item.name}</h2>
        <img width="200px" src={item.imageUrl} />
        <div>{`Item Price: $${price}`}</div>
        <div>{`Quantity: ${item.quantity}`}</div>
        <h3>{`Subtotal: $${price * item.quantity}`}</h3>
      </div>
    );
  }
}
