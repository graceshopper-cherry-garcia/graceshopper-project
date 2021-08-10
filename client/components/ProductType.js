import React from 'react';

export class ProductType extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const item = this.props.item;
    return (
      <div className="outer-image-container">
        <img src={item.categoryImage} width="300px" height="300px" />{' '}
        <img
          className="inner-image"
          width="30%"
          height="30%"
          src={item.imageUrl}
        />
      </div>
    );
  }
}
