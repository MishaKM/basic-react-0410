import React, { Component } from 'react'
import { addComment } from '../ac'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class CommentForm extends Component {
  static propTypes = {
    articleId: PropTypes.string.isRequired
  }

  state = {
    user: '',
    text: ''
  }

  render() {
    return (
      <div className="comment_form">
        <input
          type="text"
          placeholder="Имя"
          value={this.state.user}
          onChange={this.handleUserChange}
        />
        <textarea value={this.state.text} onChange={this.handleTextChange} />
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }

  handleUserChange = (ev) => {
    this.setState({ user: ev.target.value })
  }

  handleTextChange = (ev) => {
    this.setState({ text: ev.target.value })
  }

  handleSubmit = () => {
    const { addComment } = this.props
    addComment({ ...this.state, articleId: this.props.articleId })
  }
}

export default connect(
  null,
  { addComment }
)(CommentForm)
