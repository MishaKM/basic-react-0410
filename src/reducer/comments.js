import { ADD_COMMENT, LOAD_COMMENTS, START, SUCCESS } from '../constants'
import { arrToMap } from './utils'
import { Record, Map } from 'immutable'

const CommentRecord = Record({
  id: null,
  user: null,
  text: null
})

const ReducerRecord = Record({
  entities: arrToMap([], CommentRecord),
  loading: false,
  loaded: new Map(),
  error: null
})

export default (state = new ReducerRecord(), action) => {
  const { type, payload, randomId, response } = action

  switch (type) {
    case ADD_COMMENT:
      return state.setIn(
        ['entities', randomId],
        new CommentRecord({
          ...payload.comment,
          id: randomId
        })
      )

    case LOAD_COMMENTS + START:
      return state.set('loading', true)

    case LOAD_COMMENTS + SUCCESS:
      return state
        .mergeIn(['entities'], arrToMap(response, CommentRecord))
        .set('loading', false)
        .mergeIn(['loaded'], new Map({ [payload.articleId]: true }))

    default:
      return state
  }
}
