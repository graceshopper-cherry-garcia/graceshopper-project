import axios from 'axios';

//action consts

const SET_ITEM = 'SET_ITEM';

// action creators


export const setItem = (item) => {
  return {
    type: SET_ITEM,
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

// reducer

export default function singleItemReducer(state = {}, action) {
  switch (action.type) {
    case SET_ITEM:
      return action.item;
    default:
      return state
  }
}
