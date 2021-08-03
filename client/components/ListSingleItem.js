import React from 'react'

export default class ListSingleItem extends React.Component{
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <ul>
        <img src='https://ae01.alicdn.com/kf/Ha08fbfcc99b042979b51f3eebcec494au/Queen-T-shirt-New-Unisex-Music-Rock-Band-Queen-Famous-Music-Group-Queen-T-shirt.jpg_Q90.jpg_.webp' />
        <li>Queen Shirt</li> {/* Area for Item Name*/}
        <li>$19.99</li>{/* Area for Item Price*/}
        <li>A Very Cool Shirt</li> {/* Area for Item Description*/}
        </ul>
      </div>
    )
  }
}
