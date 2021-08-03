import axios from 'axios';

// ACTION TYPES
const SET_ITEMS = 'SET_ITEMS';

// ACTION CREATORS
export const setItems = (items) => {
  return {
    type: SET_ITEMS,
    items,
  };
};

// THUNKS
export const fetchItems = () => {
  return async (dispatch) => {
    const { data: items } = await axios.get('/api/items');
    dispatch(setItems(items));
  };
};

// REDUCER
export default function (state = [], action) {
  switch (action.type) {
    case SET_ITEMS:
      return action.items;
    default:
      return state;
  }
}
