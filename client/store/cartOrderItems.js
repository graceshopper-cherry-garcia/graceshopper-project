import axios from 'axios'

//action constants
const SET_CART_ITEMS = 'SET_CART_ITEMS'

//action creators

const cartItems = (cartItems) => {
  return {
    type: SET_CART_ITEMS,
    cartItems
  }
}

//Thunks

export const fetchCartItems = (orderId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/orderItems/${orderId}`)
      dispatch(cartItems(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//reducer

export default function(state = [], action) {
  switch(action.type) {
    case SET_CART_ITEMS:
      return action.cartItems
    default:
      return state
  }
}
