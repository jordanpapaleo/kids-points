import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Kid, Transaction} from 'models'
import {timePunch} from 'ducks/transactions.ducks'

const mapStateToProps = state => ({
  transactions: state.transactions
})
const mapDispatchToProps = dispatch => (bindActionCreators({
  timePunch
}, dispatch))

@connect(mapStateToProps, mapDispatchToProps)
export default class KidBox extends Component {
  static propTypes = {
    kid: PropTypes.instanceOf(Kid),
    transactions: PropTypes.arrayOf(PropTypes.instanceOf(Transaction)),
    timePunch: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)

    const transactions = props.transactions
      .filter(trans => props.kid.transactions.indexOf(trans.id) !== -1)

    const amounts = transactions.map((trans) => trans.amount)
    const totalPoints = (amounts.length >= 1)
      ? amounts.reduce((a, b) => a + b)
      : 0

    this.state = {totalPoints}
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.transactions !== this.props.transactions) {
      const transactions = nextProps.transactions
        .filter(trans => nextProps.kid.transactions.indexOf(trans.id) !== -1)

      const amounts = transactions.map(trans => trans.amount)
      const totalPoints = (amounts.length >= 1)
        ? amounts.reduce((a, b) => a + b)
        : 0

      this.setState(() => ({totalPoints}))
    }
  }

  handlePunchClock = () => {
    console.log('handlePunchClock', new Date())
    this.props.timePunch(this.props.kid.id)
  }

  handleAddPoints = () => {
    console.log('handleAddPoints')
  }

  handleSpendPoints = () => {
    console.log('handleSpendPoints')
  }

  handleShowHistory = () => {
    console.log('handleShowHistory')
  }

  render () {
    const {kid} = this.props
    const cartSvg = require('./ic_shopping_cart_black_24px.svg')
    const timepunchSvg = require('./ic_timelapse_black_24px.svg')
    const addSvg = require('./ic_add_box_black_24px.svg')
    const historySvg = require('./ic_history_black_24px.svg')
    const aStyles = {
      width: '100%',
      textAlign: 'center'
    }
    const imgStyles = {
      width: '50%',
      maxWidth: 100
    }
    return (
      <div style={{padding: 20}}>
        <h1 className='row'>
          <span className='col-xs-12 col-md-6 col-lg-6'>{kid.name}</span>
          <span className='col-xs-12 col-md-6 col-lg-6' style={{textAlign: 'right'}}>{this.state.totalPoints}</span>
        </h1>
        <div className='row'>
          <a onClick={this.handlePunchClock} style={aStyles} className='col-xs-12 col-md-6 col-lg-3'>
            <img style={imgStyles} src={timepunchSvg} />
          </a>
          <a onClick={this.handleAddPoints} style={aStyles} className='col-xs-12 col-md-6 col-lg-3'>
            <img style={imgStyles} src={addSvg} />
          </a>
          <a onClick={this.handleSpendPoints} style={aStyles} className='col-xs-12 col-md-6 col-lg-3'>
            <img style={imgStyles} src={cartSvg} />
          </a>
          <a onClick={this.handleShowHistory} style={aStyles} className='col-xs-12 col-md-6 col-lg-3'>
            <img style={imgStyles} src={historySvg} />
          </a>
        </div>
      </div>
    )
  }
}
