import React from 'react';
import { connect } from 'react-redux';
import AllItems from './AllItems';

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;
  if (username) {
    return (
      <div>
        <h3>Welcome, {username}</h3>
        <AllItems />
      </div>
    );
  } else {
    return (
      <div>
        <h3>Welcome, Guest Shopper</h3>
        <AllItems />
      </div>
    );
  }
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
