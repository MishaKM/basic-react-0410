import React, { Component } from 'react'
import Select from 'react-select'
import { filterSelect } from '../../ac'
import { connect } from 'react-redux'

class SelectFilter extends Component {
  handleChange = (selected) => {
    const { filterSelect } = this.props
    filterSelect(selected)
  }

  get options() {
    return this.props.articles.map((article) => ({
      label: article.title,
      value: article.id
    }))
  }

  render() {
    return (
      <Select
        options={this.options}
        value={this.props.selected}
        onChange={this.handleChange}
        isMulti
      />
    )
  }
}

export default connect(
  (state) => ({
    selected: state.articles.filters.select
      ? state.articles.filters.select.selected
      : null,
    articles: state.articles.availableArticles
  }),
  { filterSelect }
)(SelectFilter)
