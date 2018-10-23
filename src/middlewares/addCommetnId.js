import { ADD_COMMENT } from '../constants'

export default (store) => (next) => (action) => {
  if (action.type === ADD_COMMENT)
    action.payload.comment.id = Math.random()
      .toString()
      .substring(2)
  next(action)
}
