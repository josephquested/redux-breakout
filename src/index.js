global.Ω = require('lomega')

import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.js'

const render = () => {
  // renders our 'App' parent component
  ReactDOM.render(<App />,
  document.getElementById('app'))
}

render()
