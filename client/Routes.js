import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import { me } from './store';
import SingleItem from './components/SingleItem';
import AddItemForm from './components/AddItemForm';
import EditItem from './components/EditItem';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div className='routes-container'>
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/orderConfirmation" component={OrderConfirmation} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/addItem" component={AddItemForm} />
            <Route path="/editItem/:id" component={EditItem} />
            <Route path="/items/:id" component={SingleItem} />
            <Route exact path="/home" component={Home} />
            <Redirect to="/home" />
          </Switch>
        ) : (

          <Switch>
            {!window.localStorage.cart && window.localStorage.setItem('cart', JSON.stringify({'items': []}))}
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/orderConfirmation" component={OrderConfirmation} />
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/items/:id" component={SingleItem} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
