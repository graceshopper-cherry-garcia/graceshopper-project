import React from 'react';
import { connect } from 'react-redux';
import { updateOrder } from '../store/order';


export class OrderConfirmation extends React.Component {

  componentDidMount() {
    this.props.updateOrder(this.props.user.id)
  }
  render() {
    return(
      <div>
        Sup
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    order: state.order,
    user: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    updateOrder: (userId) => dispatch(updateOrder(userId))
  };
};

export default connect(mapState, mapDispatch)(OrderConfirmation);
