import {
  compose
} from 'redux'

export default function createAction (type, flag) {
  function action (payload) {
    const action = {
      type,
      payload
    }

    if (flag) {
      return {
        [flag]: action
      }
    }

    return action
  }

  action.actionType = type

  return action
}

export function createRequest (name, call) {
  const requestAction = createAction(`${name} request`)
  const successAction = createAction(`${name} success`)
  const failureAction = createAction(`${name} failure`)

  function action (payload) {
    return (dispatch, getState) => {
      const request = compose(dispatch, requestAction)
      const success = compose(dispatch, successAction)
      const failure = compose(dispatch, failureAction)

      request()

      call(payload)
        .then(success)
        .catch(failure)
    }
  }

  action.request = requestAction.actionType
  action.success = successAction.actionType
  action.failure = failureAction.actionType

  return action
}
