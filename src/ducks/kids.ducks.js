import {Kid} from 'models'
import {api} from 'services/apis'

// action types
export const SET_KIDS = 'SET_KIDS'
export const UPDATE_KID = 'UPDATE_KID'

// actions
// export function createKid () {
//
// }
//
// export function updateKid () {
//
// }
//
// export function deleteKid () {
//
// }

export function loadKids () {
  return async dispatch => {
    try {
      const kids = await api.get('kids')

      dispatch({
        type: SET_KIDS,
        payload: kids
      })
    } catch (err) {
      console.log(err)
    }
  }
}

// reducers
const initialState = []

export default function kids (state = initialState, action) {
  switch (action.type) {
    case UPDATE_KID:
      const i = state.findIndex(k => k.id === action.payload.userId)
      state[i] = {
        ...state[i],
        transactions: state[i].transactions.concat(action.payload.transactionId)
      }
      return state
    case SET_KIDS:
      return action.payload.map(k => new Kid(k))
    default:
      return state
  }
}
