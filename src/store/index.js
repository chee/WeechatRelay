import {
  createStore,
  applyMiddleware
} from 'redux'

import {
  composeWithDevTools
} from 'remote-redux-devtools'

import middleware from './middleware'

import reducer from './reducer'

const composeEnhancers = composeWithDevTools({
  realtime: true
})

export default function configureStore () {
  const store = createStore(reducer, composeEnhancers(
    applyMiddleware(...middleware)
  ))

  return store
}
