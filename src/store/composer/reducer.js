import {
  setMessage,
  setFocused,
  unsetFocused
} from './actions'

import createReducer from '../createReducer'

function getInitialState () {
  return {
    message: '',
    focused: true
  }
}

export default createReducer(getInitialState, {
  [setMessage.actionType] (state, payload) {
    return {
      ...state,
      message: payload
    }
  },
  [setFocused.actionType] (state) {
    return {
      ...state,
      focused: true
    }
  },
  [unsetFocused.actionType] (state) {
    return {
      ...state,
      focused: false
    }
  }
})
