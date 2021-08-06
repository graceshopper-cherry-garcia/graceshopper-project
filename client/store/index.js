import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import singleItem from './singleItem';
import allItems from './allItems';
import orderItem from './orderItem';
import cart from './order'
import cartItems from './cartOrderItems'


const reducer = combineReducers({ auth, allItems, singleItem, orderItem, cart, cartItems });
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
