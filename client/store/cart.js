import store from './index';
import { fetchOrder } from '../store/order';
import { fetchOrderItems } from '../store/cartOrderItems';

// action constant

const SET_CART = 'SET_CART';

// helper
const concatItems = (items, order_items) => {
  return items.map((item) => {
    for (let i = 0; i < order_items.length; i++) {
      if (order_items[i].itemId === item.id) {
        return { ...item, quantity: order_items[i].quantity };
      }
    }
  });
};

// action creator

export const gotCart = (cart) => {
  return {
    type: SET_CART,
    cart,
  };
};

//thunk

export const setCart = (userId) => {
  return async (dispatch) => {
    await store.dispatch(fetchOrder(userId));
    const order = store.getState().order;
    await store.dispatch(fetchOrderItems(order.id));
    const orderItems = store.getState().orderItems;
    const items = order.items;
    const cart = concatItems(items, orderItems);
    dispatch(gotCart(cart));
  };
  // return {
  //   type: SET_CART,
  //   cart,
  // };
};

// reducer

export default function (state = [], action) {
  switch (action.type) {
    case SET_CART:
      return action.cart;
    default:
      return state;
  }
}
