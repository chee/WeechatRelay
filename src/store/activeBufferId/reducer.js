import {
  selectBuffer
} from '../buffers/actions'

import createReducer from '../createReducer'

function getInitialState () {
  return null
}

export default createReducer(getInitialState, {
  [selectBuffer.actionType] (state, payload) {
    return payload
  }
})
