
import {Transaction} from 'models'
import {api} from 'services/apis'
import moment from 'moment'

// action types
export const SET_TRANSACTIONS = 'SET_TRANSACTIONS'
export const ADD_TRANSACTION = 'ADD_TRANSACTION'

export function timePunch (userId) {
  const timeToLeave = moment(new Date())
  timeToLeave.hours(8).minutes(35)
  const now = moment(new Date())
  const duration = moment.duration(now.diff(timeToLeave))
  const minutes = duration.asMinutes()
  console.log('minutes', minutes)

  return async dispatch => {
    const id = `${Math.floor(Math.random() * Date.now())}`
    dispatch({
      type: ADD_TRANSACTION,
      payload: {
        id,
        date: new Date(),
        amount: minutes
      }
    })

    dispatch({
      type: 'UPDATE_KID',
      payload: {
        userId,
        transactionId: id
      }
    })
  }
}

export function loadTransactions () {
  return async dispatch => {
    try {
      const transactions = await api.get('transactions')

      dispatch({
        type: SET_TRANSACTIONS,
        payload: transactions
      })
    } catch (err) {
      console.log(err)
    }
  }
}

const initialState = []

export default function transactions (state = initialState, action) {
  switch (action.type) {
    case ADD_TRANSACTION:
      return [
        ...state,
        new Transaction(action.payload)
      ]
    case SET_TRANSACTIONS:
      return action.payload.map(t => new Transaction(t))
    default:
      return state
  }
}
