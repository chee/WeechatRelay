import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

import registerServiceWorker from './registerServiceWorker'

import App from './App'

import configureStore from './store'

import './index.css'

registerServiceWorker()

const store = configureStore()

const renderApp = () =>
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )

renderApp()

if (module.hot) {
  module.hot.accept('./store', renderApp)
  module.hot.accept('./App', renderApp)
}
