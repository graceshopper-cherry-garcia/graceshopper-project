import axios from 'axios';

//action constants

const SET_ORDER = 'SET_ORDER'

//Action creators

const gotOrder = (order) => {
  return {
    type: SET_ORDER,
    order
  }
}

//ThunXX

export const fetchOrder = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/orders/${userId}`)
      dispatch(gotOrder(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//reducer

export default function (state = {}, action) {
  switch(action.type){
    case SET_ORDER:
      return action.order
    default:
      return state
  }
}
