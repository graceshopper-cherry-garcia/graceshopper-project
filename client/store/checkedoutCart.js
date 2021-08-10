//action const

const SET_CHECKEDOUT_CART = "SET_CHECKEDOUT_CART";

export const setCheckedoutCart = (cart) => {
  return {
    type: SET_CHECKEDOUT_CART,
    cart
  }
}

// Reducer
export default function(state = [], action) {
  switch(action.type) {
    case SET_CHECKEDOUT_CART:
      return action.cart
    default:
      return state
  }
}

