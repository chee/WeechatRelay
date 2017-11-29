import React from 'react'
import {Provider} from 'react-redux'

import App from './src/App.js'

import configureStore from './src/store'

const store = configureStore()

export default () =>
  <Provider store={store}>
    <App />
  </Provider>
