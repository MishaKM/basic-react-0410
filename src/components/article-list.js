import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  articlesLoadedSelector,
  articlesLoadingSelector,
  filtratedArticlesSelector
} from '../selectors'
import { loadAllArticles } from '../ac'
import Loader from './common/loader'
import { NavLink } from 'react-router-dom'

export class ArticleList extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired,
    fetchData: PropTypes.func
  }

  render() {
    if (this.props.loading) return <Loader />
    return <ul>{this.items}</ul>
  }

  get items() {
    const { articles } = this.props
    return articles.map((article) => (
      <li key={article.id} className="test--article-list__item">
        <NavLink to={`/articles/${article.id}`} activeStyle={{ color: 'red' }}>
          {article.title}
        </NavLink>
      </li>
    ))
  }

  componentDidMount() {
    const { fetchData, loaded, loading } = this.props
    fetchData && !loading && !loaded && fetchData()
  }
}

export default connect(
  (state) => {
    return {
      articles: filtratedArticlesSelector(state),
      loading: articlesLoadingSelector(state),
      loaded: articlesLoadedSelector(state)
    }
  },
  { fetchData: loadAllArticles }
)(ArticleList)
