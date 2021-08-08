import axios from 'axios'

//action constants
const SET_CART_ITEMS = 'SET_CART_ITEMS';
// const DELETE_CART_ITEM = 'DELETE_CART_ITEM'

//action creators

const cartItems = (cartItems) => {
  return {
    type: SET_CART_ITEMS,
    cartItems
  }
}

// export const deleteCartItem = (cartItem) => {
//   return {
//     type: DELETE_CART_ITEM,
//     cartItem,
//   };
// };

//Thunks

export const fetchOrderItems = (orderId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/orderItems/${orderId}`)
      dispatch(cartItems(data))
    } catch (error) {
      console.log(error)
    }
  }
}


// export const deleteCartItemThunk = (itemId) => {
//   return async (dispatch) => {
//     try {
//       const { data } = await axios.delete(`/api/orderItems/${itemId}`);
//       dispatch(deleteCartItem(data));
//     } catch (error) {
//       console.error(error);
//     }
//   };
// };

//reducer

export default function(state = [], action) {
  switch(action.type) {
    case SET_CART_ITEMS:
      return action.cartItems
      // case DELETE_CART_ITEM:
      //   return state.filter((item) => item.itemId !== action.cartItem.id);
    default:
      return state
  }
}
