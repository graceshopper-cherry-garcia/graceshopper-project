import axios from 'axios';

//action constants

const SET_ORDER = 'SET_ORDER';

//Action creators

const setOrder = (order) => {
  return {
    type: SET_ORDER,
    order,
  };
};

//ThunXX

export const fetchOrder = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/orders/${userId}`);
      dispatch(setOrder(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateOrder = (userId) => {
  return async (dispatch) => {
    try {
      //Update the completion status of the current order
      const { data: oldOrder } = await axios.put(`/api/orders/${userId}`);
      //Create a new empty order for the same user
      const { data: newOrder } = await axios.post(`/api/orders/${userId}`);
      dispatch(setOrder(newOrder));
    } catch (error) {
      console.log(error);
    }
  };
};

//reducer

export default function (state = {}, action) {
  switch (action.type) {
    case SET_ORDER:
      return action.order;
    default:
      return state;
  }
}
