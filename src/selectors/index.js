import { createSelector } from 'reselect'

export const selectionSelector = (state) => state.filters.selected
export const dateRangeSelector = (state) => state.filters.dateRange
export const articlesLoadingSelector = (state) => state.articles.loading
export const articlesLoadedSelector = (state) => state.articles.loaded
export const articlesMapSelector = (state) => state.articles.entities
export const articleListSelector = createSelector(
  articlesMapSelector,
  (articlesMap) => articlesMap.valueSeq().toArray()
)
export const commentsSelector = (state) => state.comments
export const idSelector = (_, props) => props.id

export const filtratedArticlesSelector = createSelector(
  selectionSelector,
  dateRangeSelector,
  articleListSelector,
  (selected, dateRange, articles) => {
    console.log('---', 'article list selector')
    const { from, to } = dateRange

    return articles.filter((article) => {
      const published = Date.parse(article.date)
      return (
        (!selected.length ||
          selected.find((selected) => selected.value === article.id)) &&
        (!from || !to || (published > from && published < to))
      )
    })
  }
)

export const createCommentSelector = () =>
  createSelector(commentsSelector, idSelector, (comments, id) => {
    return comments.getIn(['entities', id])
  })

export const articleSelector = createSelector(
  articlesMapSelector,
  idSelector,
  (articles, id) => articles.get(id)
)

export const totalCommentsSelector = (state) => state.comments.total
export const commentsPagenationSelector = (state) => state.comments.pagination
export const pageSelector = (_, props) => props.page
export const commentsPageIdsSelector = createSelector(
  commentsPagenationSelector,
  pageSelector,
  (pagination, page) => pagination.getIn([page, 'ids'])
)
export const commentsPageLoadingSelector = createSelector(
  commentsPagenationSelector,
  pageSelector,
  (pagination, page) => pagination.getIn([page, 'loading'])
)
