export default class KidModel {
  constructor (props) {
    Object.keys(props).forEach((key) => {
      this[key] = props[key]
    })
  }
}
