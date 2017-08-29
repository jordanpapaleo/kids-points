export default class TransactionModel {
  constructor (props) {
    Object.keys(props).forEach((key) => {
      this[key] = props[key]
    })
  }
}

/*
  date
  id
  amount
*/
