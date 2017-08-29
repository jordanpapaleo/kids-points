import {combineReducers} from 'redux'
import kids from './kids.ducks'
import transactions from './transactions.ducks'
export default combineReducers({
  kids,
  transactions
})
