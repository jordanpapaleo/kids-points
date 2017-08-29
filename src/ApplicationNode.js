import 'font-awesome/css/font-awesome.min.css'
import React from 'react'
import PropTypes from 'prop-types'
import {Provider} from 'react-redux'
import {Router, Route} from 'react-router-dom'
import history from 'services/history'
import DevTools from './components/DevTools'
import App from 'views/App'

const ApplicationNode = ({store}) => {
  return (
    <Provider store={store}>
      <div className='app-node'>
        {process.env.NODE_ENV !== 'production' && <DevTools /> }
        <Router history={history}>
          <Route path='/' component={App} />
        </Router>
      </div>
    </Provider>
  )
}

ApplicationNode.propTypes = {
  store: PropTypes.object.isRequired
}

export default ApplicationNode
