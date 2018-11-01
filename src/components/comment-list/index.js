import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSTransition from 'react-addons-css-transition-group'
import Comment from '../comment'
import CommentForm from '../comment-form'
import toggleOpen from '../../decorators/toggleOpen'
import './style.css'
import { loadCommentList } from '../../ac'
import { connect } from 'react-redux'
import {
  commentsLoadingSelector,
  commentsLoadedSelector
} from '../../selectors'
import Loader from '../common/loader'

class CommentList extends Component {
  static propTypes = {
    article: PropTypes.object,
    //from toggleOpen decorator
    isOpen: PropTypes.bool,
    toggleOpen: PropTypes.func
  }

  /*
  static defaultProps = {
    comments: []
  }
*/

  state = {
    error: null
  }

  componentDidCatch(error) {
    this.setState({ error })
  }

  componentDidUpdate(oldProps) {
    const { isOpen, loadCommentList, article, loaded } = this.props
    if (!oldProps.isOpen && isOpen && !loaded.get(article.id))
      loadCommentList(article.id)
  }

  render() {
    const { isOpen, toggleOpen } = this.props
    const text = isOpen ? 'hide comments' : 'show comments'
    return (
      <div>
        <button onClick={toggleOpen} className="test--comment-list__btn">
          {text}
        </button>
        <CSSTransition
          transitionName="comments"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {this.getBody()}
        </CSSTransition>
      </div>
    )
  }

  getBody() {
    const {
      article: { id, comments = [] },
      isOpen,
      loading,
      loaded
    } = this.props
    if (!isOpen) return null
    if (this.state.error) return <h3>Error</h3>
    if (loading) return <Loader />
    if (!loaded.get(id)) return null

    return (
      <div className="test--comment-list__body">
        {comments.length ? (
          this.comments
        ) : (
          <h3 className="test--comment-list__empty">No comments yet</h3>
        )}
        <CommentForm articleId={id} />
      </div>
    )
  }

  get comments() {
    return (
      <ul>
        {this.props.article.comments.map((id) => (
          <li key={id} className="test--comment-list__item">
            <Comment id={id} />
          </li>
        ))}
      </ul>
    )
  }
}

export default connect(
  (state) => {
    return {
      loaded: commentsLoadedSelector(state),
      loading: commentsLoadingSelector(state)
    }
  },
  { loadCommentList }
)(toggleOpen(CommentList))
