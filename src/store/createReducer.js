export default function createReducer (getInitialState, handlers) {
  return function reducer (state = getInitialState(), action) {
    const {
        type,
        payload = {}
      } = action

    const handler = handlers[type]

    if (handler) return handler(state, payload)

    return state
  }
}
