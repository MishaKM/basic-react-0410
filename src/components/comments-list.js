import React, { Component } from 'react'
import Comment from './comment'
import dropdown from '../decorators/dropdown'

class CommentsList extends Component {
  render() {
    const { isOpen } = this.props
    const text = isOpen ? 'Close comments' : 'Open comments'
    return (
      <div className="comments_block">
        <button onClick={this.onButtonClick}>{text}</button>
        {this.body}
      </div>
    )
  }

  onButtonClick = () => this.props.toggleOpen()

  get body() {
    const { isOpen } = this.props
    if (!isOpen) return null
    return <ul className="comments_content">{this.items}</ul>
  }

  get items() {
    const { comments } = this.props
    return comments.map((comment) => (
      <li key={comment.id}>
        <Comment comment={comment} />
      </li>
    ))
  }
}

export default dropdown(CommentsList)
