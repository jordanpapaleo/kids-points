import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Kid} from 'models'
import {KidBox} from 'components'

const mapStateToProps = state => ({
  kids: state.kids
})
const mapDispatchToProps = dispatch => (bindActionCreators({}, dispatch))

@connect(mapStateToProps, mapDispatchToProps)
export default class Registry extends Component {
  static propTypes = {
    kids: PropTypes.arrayOf(PropTypes.instanceOf(Kid))
  }

  state = {}

  render () {
    const {kids} = this.props
    return (
      <ul style={{display: 'flex', flexDirection: 'column', flexGrow: 1}}>
        {kids.map((kid, i) => (<li style={{
          backgroundColor: kid.config.backgroundColor,
          color: kid.config.color,
          flexGrow: 1
        }} key={i}>
          <KidBox kid={kid} />
        </li>))}
      </ul>
    )
  }
}
