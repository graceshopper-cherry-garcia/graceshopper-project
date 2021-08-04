import axios from 'axios';

// ACTION TYPES
const SET_ITEMS = 'SET_ITEMS';
const ADD_ITEM = 'ADD_ITEM';

// ACTION CREATORS
export const setItems = (items) => {
  return {
    type: SET_ITEMS,
    items,
  };
};

export const _addItem = (item) => {
  return {
    type: ADD_ITEM,
    item,
  };
};

// THUNKS
export const fetchItems = () => {
  return async (dispatch) => {
    const { data: items } = await axios.get('/api/items');
    dispatch(setItems(items));
  };
};

export const addItem = (item) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/items', item);
      dispatch(_addItem(data));
    } catch (e) {
      console.log(e.message);
    }
  };
};

// REDUCER
export default function (state = [], action) {
  switch (action.type) {
    case SET_ITEMS:
      return action.items;
    case ADD_ITEM:
      return [...state, action.item];
    default:
      return state;
  }
}
