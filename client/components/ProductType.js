import React from 'react';

export class ProductType extends React.Component {
  constructor(props) {
    super(props);
    this.generateClass = this.generateClass.bind(this);
  }
  generateClass() {
    if (this.props.item.category === 'video game') {
      return 'video_game';
    } else if (this.props.item.category === 'jacket') {
      return 'jacket';
    } else if (this.props.item.category === 'fidget spinner') {
      return 'fidget_spinner';
    } else if (this.props.item.category === 'phone case') {
      return 'phone_case';
    } else if (this.props.item.category === 'bottle opener') {
      return 'bottle_opener';
    } else {
      return 'inner-image';
    }
  }

  render() {
    const item = this.props.item;
    const className = this.generateClass();
    console.log(this.props);

    return (
      <div key="item.id" className="outer-image-container">
        <img src={item.categoryImage} width="300px" height="300px" />
        <img className={className} src={item.imageUrl} />
      </div>
    );
  }
}
