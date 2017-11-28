import React, {PureComponent} from 'react'
import {connect} from 'react-redux'

import {
  setMessage
} from '../store/composer/actions'

import {
  sendMessage
} from '../store/weechat/actions'

function mapStateToProps (state) {
  const {
    composer: {
      message
    }
  } = state

  return {
    message
  }
}

const mapDispatchToProps = {
  setMessage,
  sendMessage
}

export default function withMessage (options = {}) {
  return WrappedComponent => {
    class MessageContainer extends PureComponent {
      sendMessage = () => {
        const {
          sendMessage,
          setMessage,
          message
        } = this.props

        return sendMessage({message})
          .then(() => setMessage(''))
      }

      render () {
        return (
          <WrappedComponent
            {...this.props}
            sendMessage={this.sendMessage}
          />
        )
      }
    }

    return connect(mapStateToProps, mapDispatchToProps)(MessageContainer)
  }
}
