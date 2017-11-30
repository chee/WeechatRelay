import createReducer from '../createReducer'

import {
  setKeyboardShown,
  unsetKeyboardShown,
  setKeyboardHeight,
  unsetKeyboardHeight
} from './actions'

const getInitialState = () => ({
  shown: false,
  height: 0
})

export default createReducer(getInitialState, {
  [setKeyboardShown.actionType] (state) {
    return {
      ...state,
      shown: true
    }
  },
  [unsetKeyboardShown.actionType] (state) {
    return {
      ...state,
      shown: false
    }
  },
  [setKeyboardHeight.actionType] (state, payload) {
    return {
      ...state,
      height: payload
    }
  },
  [unsetKeyboardHeight.actionType] (state, payload) {
    return {
      ...state,
      height: 0
    }
  }
})
