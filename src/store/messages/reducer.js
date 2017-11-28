import {
  uniqWith,
  equals
} from 'ramda'

import {
  addMessage
} from './actions'

import createReducer from '../createReducer'

function getInitialState () {
  return {}
}

const unique = uniqWith(equals)

export default createReducer(getInitialState, {
  [addMessage.actionType] (state, payload) {
    const {
      bufferId,
      ...message
    } = payload

    if (state[bufferId]) {
      const messages = [
        ...state[bufferId],
        message
      ]

      return {
        ...state,
        [bufferId]: unique(messages)
      }
    }



    return {
      ...state,
      [bufferId]: [message]
    }
  }
})
