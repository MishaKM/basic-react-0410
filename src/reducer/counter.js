import { INCREMENT } from '../constants'

export default (counterState = 10, action) => {
  return action.type === INCREMENT ? counterState + 1 : counterState
}
