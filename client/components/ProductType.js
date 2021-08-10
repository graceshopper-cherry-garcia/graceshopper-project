import React from 'react';

export class ProductType extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const item = this.props.item;
    return (
      <div className="outer-image-container">
        <img src="https://image.shutterstock.com/image-vector/blank-tshirt-template-vector-260nw-161243906.jpg" />{' '}
        <img className="inner-image" width="20%" height="20%" src={item.imageUrl} />
        {/* <div className="inner-image"> */}
      </div>
    );
  }
}
