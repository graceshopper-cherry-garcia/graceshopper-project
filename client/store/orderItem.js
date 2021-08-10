import axios from 'axios';

//Action Constants
const ADD_ORDER_ITEM = 'ADD_ORDER_ITEM';
const UPDATE_ORDER_ITEM = 'UPDATE_ORDER_ITEM';
const DELETE_ORDER_ITEM = 'DELETE_ORDER_ITEM'


//Action creator
export const _addOrderItem = (orderItem) => {
  return {
    type: ADD_ORDER_ITEM,
    orderItem,
  };
};

export const _updateOrderItem = (orderItem) => {
  return {
    type: UPDATE_ORDER_ITEM,
    orderItem,
  };
};

export const _deleteOrderItem = (orderItem) => {
  return {
    type: DELETE_ORDER_ITEM,
    orderItem,
  };
};

//Thunks
export const addOrderItem = (orderItem) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/orderItems', orderItem);
      dispatch(_addOrderItem(data));
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const updateOrderItem = (orderItem) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put('/api/orderItems', orderItem);
      dispatch(_updateOrderItem(data));
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const deleteOrderItem = (itemId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/api/orderItems/${itemId}`);
      dispatch(_deleteOrderItem(data));
    } catch (error) {
      console.error(error);
    }
  };
};

//reducer
export default function (state = {}, action) {
  switch (action.type) {
    case ADD_ORDER_ITEM:
      return action.orderItem;
    case UPDATE_ORDER_ITEM:
      return action.orderItem
    case DELETE_ORDER_ITEM:
      return action.orderItem
    default:
      return state;
  }
}
