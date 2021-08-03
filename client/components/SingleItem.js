import React from 'react'
import {connect} from 'react-redux'
import { fetchItem } from '../store/singleItem'


class SingleItem extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchItem(this.props.match.params.id)
  }

  render() {
    // console.log("state", this.state)
    // console.log("props", this.props)
    const item = this.props.item;

    return (
      <div className='single-item-container'>
        <h1>{item.name}</h1>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    item: state.singleItem
  }
};

const mapDispatch = (dispatch) => {
  return {
    fetchItem: (id) => dispatch(fetchItem(id))
  }
}

export default connect(mapState, mapDispatch)(SingleItem)
