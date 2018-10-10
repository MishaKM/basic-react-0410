import React, { Component } from 'react'

const dropdown = (OriginalComponent) =>
  class DropdownComponent extends Component {
    state = {
      isOpen: false
    }
    toggleOpen = () => {
      this.setState({ isOpen: !this.state.isOpen })
    }

    render() {
      return (
        <OriginalComponent
          {...this.props}
          toggleOpen={this.toggleOpen}
          isOpen={this.state.isOpen}
        />
      )
    }
  }

export default dropdown
