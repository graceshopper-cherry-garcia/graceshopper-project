import React from 'react';
import { fetchOrder } from '../store/order'
import { fetchCartItems } from '../store/cartOrderItems'
import { connect } from 'react-redux'

class Cart extends React.Component {
  async componentDidMount(){
    await this.props.getCart(this.props.user.id)
    this.props.getCartItems(this.props.cart.id)
  }
  render(){
    console.log("props", this.props)
    return (
      <div>
        In the Cart
      </div>
    )
  }
}


const mapState = (state) => {
  return {
    cart: state.cart,
    user: state.auth,
    cartItems: state.cartItems
  }
}

const mapDispatch = (dispatch) => {
  return {
    getCart: (userId) => dispatch(fetchOrder(userId)),
    getCartItems: (orderId) => dispatch(fetchCartItems(orderId))
  }
}


export default connect(mapState, mapDispatch)(Cart)
