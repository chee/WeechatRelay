import {
  omit
} from 'ramda'

import {
  addBuffer,
  selectBuffer,
  removeBuffer
} from './actions'

import {
  addMessage
} from '../messages/actions'

import createReducer from '../createReducer'

function getInitialState () {
  return {}
}

export default createReducer(getInitialState, {
  [addBuffer.actionType] (state, payload) {
    return {
      ...state,
      [payload.id]: {
        ...payload,
        unread: 0
      }
    }
  },
  [selectBuffer.actionType] (state, payload) {
    const buffer = state[payload]

    if (!buffer) {
      console.error(`no buffer at ${payload}`)
      return state
    }

    return {
      ...state,
      [payload]: {
        ...buffer,
        unread: null
      }
    }
  },
  [addMessage.actionType] (state, payload) {
    const {
      bufferId
    } = payload

    const buffer = state[bufferId]

    if (!buffer) {
      console.error(`no buffer at ${bufferId}`)
      return state
    }

    return {
      ...state,
      [bufferId]: {
        ...buffer,
        unread: buffer.unread + 1
      }
    }
  },
  [removeBuffer.actionType] (state, payload) {
    return omit([payload], state)
  }
})
