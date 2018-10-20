import defaultArticles from '../fixtures'
import { DELETE_ARTICLE, FILTER_DATERANGE, FILTER_SELECT } from '../constants'

// Я так понял, что редюсер видит токлько определенную часть стора и все экшины.
// Мне нужно принять решения, какие именно статьи показывать.
// Данных экшина и списка статей мне недостаточно. Мне нужно знать еще в каком состоянии остальные фильтры.
// Значит мне нужен большой редюсер который будет управлять состоянием для всех фильтров и состоянием списка статей.

export default (
  articlesState = {
    visibleArticles: defaultArticles, // отфильтрованный результат
    availableArticles: defaultArticles, // то что осталось после удаления
    filters: {}
  },
  action
) => {
  const { type, payload } = action

  let filterArticles = (availableArticles = [], filters = {}) => {
    let result = availableArticles

    if (filters.dateRange) {
      let from = filters.dateRange.from
      let to = filters.dateRange.to
      result = result.filter((article) => {
        let date = new Date(article.date)
        return (from ? date >= from : true) && (to ? date <= to : true)
      })
    }

    if (
      filters.select &&
      filters.select.selected &&
      filters.select.selected.length
    ) {
      let selectedSet = new Set(
        filters.select.selected.map((item) => item.value)
      )
      result = result.filter((article) => selectedSet.has(article.id))
    }

    return result
  }

  let availableArticles, visibleArticles, filters
  switch (type) {
    case DELETE_ARTICLE:
      availableArticles = articlesState.availableArticles.filter(
        (article) => article.id !== payload.id
      )
      //удаляем елемент из фильтров
      filters = { ...articlesState.filters }
      if (filters.select) {
        filters.select.selected = filters.select.selected.filter(
          (item) => item.value !== payload.id
        )
      }
      visibleArticles = filterArticles(availableArticles, filters)
      return { ...articlesState, visibleArticles, availableArticles }

    case FILTER_DATERANGE:
      filters = { ...articlesState.filters, dateRange: { ...payload } }
      visibleArticles = filterArticles(articlesState.availableArticles, filters)
      return { ...articlesState, visibleArticles, filters }

    case FILTER_SELECT:
      filters = { ...articlesState.filters, select: { ...payload } }
      visibleArticles = filterArticles(articlesState.availableArticles, filters)
      return { ...articlesState, visibleArticles, filters }

    default:
      return articlesState
  }
}
