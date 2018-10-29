import React, { PureComponent } from 'react'
import CSSTransition from 'react-addons-css-transition-group'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CommentList from '../comment-list'
import { deleteArticle, loadArticleById } from '../../ac'
import './style.css'
import Loader from '../common/loader'

class Article extends PureComponent {
  static propTypes = {
    article: PropTypes.shape({
      title: PropTypes.string.isRequired,
      text: PropTypes.string
    }).isRequired,
    isOpen: PropTypes.bool,
    toggleOpen: PropTypes.func.isRequired
  }

  state = {
    error: null
  }

  componentDidCatch(error) {
    this.setState({ error })
  }

  componentDidUpdate(oldProps) {
    const { isOpen, loadArticleById, article } = this.props
    if (!oldProps.isOpen && isOpen && !article.text) loadArticleById(article.id)
  }

  render() {
    const { article, isOpen } = this.props
    return (
      <div>
        <h3>
          {article.title}
          <button onClick={this.handleClick} className="test--article__btn">
            {isOpen ? 'close' : 'open'}
          </button>
          <button onClick={this.handleDeleteClick}>delete me</button>
        </h3>
        <CSSTransition
          transitionAppear
          transitionName="article"
          transitionEnterTimeout={500}
          transitionAppearTimeout={1000}
          transitionLeaveTimeout={300}
        >
          {this.body}
        </CSSTransition>
      </div>
    )
  }

  handleDeleteClick = () => {
    const { deleteArticle, article } = this.props
    deleteArticle(article.id)
  }

  handleClick = () => this.props.toggleOpen(this.props.article.id)

  get body() {
    const { isOpen, article } = this.props
    if (!isOpen) return null
    if (this.state.error) return <h3>Error</h3>
    if (article.loading) return <Loader />

    return (
      <section className="test--article__body">
        {article.text}
        <CommentList article={article} />
      </section>
    )
  }
}

export default connect(
  null,
  { deleteArticle, loadArticleById }
)(Article)
