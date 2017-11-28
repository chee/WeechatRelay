import React, {PureComponent} from 'react'
import {connect} from 'react-redux'

import * as mapDispatchToProps from '../store/weechat/actions'

function mapStateToProps (state) {
  const {
    weechat
  } = state

  return {
    weechat
  }
}

export default function withWeechat (options = {}) {
  return WrappedComponent => {
    class WeechatContainer extends PureComponent {
      componentDidMount () {
        this.props.connect({})
      }

      render () {
        return (
          <WrappedComponent
            {...this.props}
          />
        )
      }
    }

    return connect(mapStateToProps, mapDispatchToProps)(WeechatContainer)
  }
}
