import React, {PureComponent} from 'react'
import {connect} from 'react-redux'

import {
  setFocused,
  unsetFocused
} from '../store/composer/actions'

function mapStateToProps (state) {
  const {
    composer
  } = state

  return {
    composer
  }
}

const mapDispatchToProps = {
  setComposerFocused: setFocused,
  unsetComposerFocused: unsetFocused
}

export default function withComposer (options = {}) {
  return WrappedComponent => {
    class ComposerContainer extends PureComponent {
      render () {
        return (
          <WrappedComponent
            {...this.props}
          />
        )
      }
    }

    return connect(mapStateToProps, mapDispatchToProps)(ComposerContainer)
  }
}
