import React from 'react';
import { connect } from 'react-redux';

class Checkout extends React.Component {
  render() {
    return <div>hi</div>;
  }
}

const mapState = () => {
  return {};
};

const mapDispatch = () => {
  return {};
};

export default connect(mapState, mapDispatch)(Checkout);
