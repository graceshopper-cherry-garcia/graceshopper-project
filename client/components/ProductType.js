import React from 'react';

export class ProductType extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    const item = this.props.item
    return(
      <div className="image-container">
          <img width="20%" height= "20%" src={item.imageUrl} />
      </div>
    )
  }
}