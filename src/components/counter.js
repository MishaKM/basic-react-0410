import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { increment } from '../ac'

class Counter extends Component {
  static propTypes = {
    count: PropTypes.number,
    handleIncrement: PropTypes.func
  }

  render() {
    return (
      <div>
        <h2>{this.props.count}</h2>
        <button onClick={this.handleClick}>increment</button>
      </div>
    )
  }

  handleClick = () => {
    //        this.props.dispatch(increment())
    this.props.handleIncrement()
  }
}

const mapStateToProps = (storeState) => ({
  count: storeState.counter
})

const mapDispatchToProps = {
  handleIncrement: increment
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)
