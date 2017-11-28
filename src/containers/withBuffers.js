import React, {PureComponent} from 'react'
import {connect} from 'react-redux'

import * as bufferActions from '../store/buffers/actions'

function mapStateToProps (state) {
  const {
    activeBufferId,
    buffers
  } = state

  return {
    buffers,
    activeBufferId
  }
}

const mapDispatchToProps = bufferActions

export default function withBuffers (options = {}) {
  return WrappedComponent => {
    class BuffersContainer extends PureComponent {
      selectBuffer = id => {
        const {
          selectBuffer,
          getMessages
        } = this.props

        selectBuffer(id)

        getMessages()
      }

      render () {
        return (
          <WrappedComponent
            {...this.props}
          />
        )
      }
    }

    return connect(mapStateToProps, mapDispatchToProps)(BuffersContainer)
  }
}
