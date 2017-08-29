import React from 'react'
import ReactDOM from 'react-dom'
import ApplicationNode from './ApplicationNode'
import registerServiceWorker from './services/registerServiceWorker'
import {configureStore} from './store'
import {Kid, Transaction} from 'models'

const colors = ['#305078', '#1F90A3', '#A0F2D5', '#FCFFF7', '#CCCC00']
const initialState = {
  kids: [
    new Kid({
      id: 'papaleo-01',
      name: 'Gavin',
      config: {
        backgroundColor: colors[0],
        color: colors[3]
      },
      transactions: [
        '1234',
        '12345',
        '123456'
      ]
    }),
    new Kid({
      id: 'papaleo-02',
      name: 'Colton',
      config: {
        backgroundColor: colors[1],
        color: colors[3]
      },
      transactions: [
        '2345'
      ]
    }),
    new Kid({
      id: 'papaleo-03',
      name: 'Harper',
      config: {
        backgroundColor: colors[2],
        color: '#000000'
      },
      transactions: [
        '3456'
      ]
    })
  ],
  transactions: [
    new Transaction({
      id: '1234',
      date: new Date(),
      amount: 100
    }),
    new Transaction({
      id: '12345',
      date: new Date(),
      amount: -50
    }),
    new Transaction({
      id: '123456',
      date: new Date(),
      amount: 300
    }),
    new Transaction({
      id: '2345',
      date: new Date(),
      amount: 100
    }),
    new Transaction({
      id: '3456',
      date: new Date(),
      amount: 100
    })
  ]
}

if (window.__INITIAL_STATE__) {
  const state = window.__INITIAL_STATE__
  console.log('state', state)
  Object.keys(state).forEach(key => {
    initialState[key] = state[key]
  })
}

const store = configureStore(initialState)

const render = (Component) => {
  ReactDOM.render(
    <Component store={store} />,
    document.getElementById('root')
  )
}

render(ApplicationNode)
registerServiceWorker()

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./ApplicationNode', () => {
    const NextApp = require('./ApplicationNode').default
    render(NextApp)
  })
}
