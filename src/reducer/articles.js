import { normalizedArticles } from '../fixtures'
import { ADD_COMMENT, DELETE_ARTICLE } from '../constants'

const defaultArticles = normalizedArticles.reduce(
  (acc, article) => ({
    ...acc,
    [article.id]: article
  }),
  {}
)

export default (articlesState = defaultArticles, action) => {
  const { type, payload } = action

  let result
  switch (type) {
    case DELETE_ARTICLE:
      result = { ...articlesState }
      delete result[payload.id]
      return result

    case ADD_COMMENT:
      result = { ...articlesState }
      result[payload.comment.articleId].comments =
        result[payload.comment.articleId].comments || []
      result[payload.comment.articleId].comments.push(payload.comment.id)
      return result

    default:
      return articlesState
  }
}
