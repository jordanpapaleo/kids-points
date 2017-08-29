import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

const mapStateToProps = state => ({
  activeTranscations: []
})
const mapDispatchToProps = dispatch => (bindActionCreators({}, dispatch))

@connect(mapStateToProps, mapDispatchToProps)
export default class Transactions extends Component {
  static propTypes = {}

  state = {}

  render () {
    return (
      <div>Transactions</div>
    )
  }
}
