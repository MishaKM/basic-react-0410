import { ADD_COMMENT } from '../constants'
import { normalizedComments } from '../fixtures'

const defaultComments = normalizedComments.reduce(
  (acc, comment) => ({
    ...acc,
    [comment.id]: comment
  }),
  {}
)

export default (state = defaultComments, action) => {
  const { type, payload } = action

  switch (type) {
    case ADD_COMMENT:
      return {
        ...state,
        [payload.comment.id]: {
          id: payload.comment.id,
          user: payload.comment.user,
          text: payload.comment.text
        }
      }

    default:
      return state
  }
}
