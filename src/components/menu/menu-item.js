import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class MenuItem extends Component {
  static propTypes = {}

  render() {
    const { link, children } = this.props
    return (
      <div>
        <NavLink to={link} activeStyle={{ color: 'red' }}>
          {children}
        </NavLink>
      </div>
    )
  }
}

export default MenuItem
