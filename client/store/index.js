import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import singleItem from './singleItem';
import allItems from './allItems';
import orderItem from './orderItem';
import order from './order';
import orderItems from './cartOrderItems';
import cart from './cart';
import checkedoutCart from './checkedoutCart';
import count from './guestItemCount';

const reducer = combineReducers({
  auth,
  allItems,
  singleItem,
  orderItem,
  order,
  orderItems,
  cart,
  checkedoutCart,
  count,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
