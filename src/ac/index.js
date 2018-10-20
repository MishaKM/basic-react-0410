import {
  INCREMENT,
  DELETE_ARTICLE,
  FILTER_DATERANGE,
  FILTER_SELECT
} from '../constants'

export function increment() {
  return {
    type: INCREMENT
  }
}

export function deleteArticle(id) {
  return {
    type: DELETE_ARTICLE,
    payload: { id }
  }
}

export function filterDateRange(obj) {
  return {
    type: FILTER_DATERANGE,
    payload: obj
  }
}

export function filterSelect(selected) {
  return {
    type: FILTER_SELECT,
    payload: { selected }
  }
}
