import './app.scss'
import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import {Registry} from 'components'

class App extends Component {
  render () {
    return (
      <div styleName='app'>
        <Switch>
          <Route exact path='/' component={Registry} />
        </Switch>
      </div>
    )
  }
}

export default App
