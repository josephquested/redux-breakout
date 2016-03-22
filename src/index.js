global.Ω = require('lomega')

import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.js'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)
Ω(store)

const render = () => {
  // renders our 'App' parent component
  ReactDOM.render(<App moodStates={store.getState()} store={store}/>,
  document.getElementById('app'))
}

store.subscribe(render)
render()
