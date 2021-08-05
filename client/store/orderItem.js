import axios from 'axios';

//Action Constants
const ADD_ORDER_ITEM = 'ADD_ORDER_ITEM';

//Action creator
export const _addOrderItem = (orderItem) => {
  return {
    type: ADD_ORDER_ITEM,
    orderItem,
  };
};

//Thunks
export const addOrderItem = (orderItem) => {
  return async (dispatch) => {
    try {
      console.log('inside the thunk ');
      const { data } = await axios.post('/api/orderItems', orderItem);
      dispatch(_addOrderItem(data));
    } catch (e) {
      console.log(e.message);
    }
  };
};

//reducer
export default function (state = {}, action) {
  switch (action.type) {
    case ADD_ORDER_ITEM:
      return action.orderItem;
    default:
      return state;
  }
}
