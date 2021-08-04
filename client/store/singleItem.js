import axios from 'axios';

//action consts

const SET_ITEM = 'SET_ITEM';
const UPDATE_ITEM = 'UPDATE_ITEM';

// action creators


export const setItem = (item) => {
  return {
    type: SET_ITEM,
    item,
  };
};



export const updateItem = (item) => {
  return {
    type: UPDATE_ITEM,
    item,
  };
};

//THUNXX

export const fetchItem = (itemId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/items/${itemId}`);
      dispatch(setItem(data));
    } catch (error) {
      console.error(error)
    }
  }
};

export const updateItemThunk = (itemId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/items/${itemId}`);
      dispatch(updateItem(data));
    } catch (error) {
      console.error(error)
    }
  }
};



// reducer

export default function singleItemReducer(state = {}, action) {
  switch (action.type) {
    case SET_ITEM:
      return action.item;
    case UPDATE_ITEM:
      return action.item;
    default:
      return state
  }
}
