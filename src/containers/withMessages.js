import React, {PureComponent} from 'react'
import {connect} from 'react-redux'

import {
  selectBuffer
} from '../store/buffers/actions'

function mapStateToProps (state) {
  const {
    messages,
    activeBufferId
  } = state

  return {
    messages,
    activeBufferId
  }
}

const mapDispatchToProps = {
  selectBuffer
}

export default function withMessages (options = {}) {
  return WrappedComponent => {
    class MessagesContainer extends PureComponent {
      render () {
        const {
          messages,
          activeBufferId
        } = this.props

        return (
          <WrappedComponent
            {...this.props}
            messages={messages[activeBufferId]}
          />
        )
      }
    }

    return connect(mapStateToProps, mapDispatchToProps)(MessagesContainer)
  }
}
