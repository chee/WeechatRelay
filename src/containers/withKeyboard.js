import React, {PureComponent} from 'react'

import {
  Keyboard,
  Dimensions
} from 'react-native'

import {connect} from 'react-redux'

import * as mapDispatchToProps from '../store/keyboard/actions'

function mapStateToProps (state) {
  const {
    keyboard
  } = state

  return {
    keyboardShown: keyboard.shown,
    keyboardHeight: keyboard.height
  }
}

export default function withKeyboard (options = {}) {
  return WrappedComponent => {
    class KeyboardContainer extends PureComponent {
      events = []

      componentWillMount () {
        this.events = this.events.concat([
          Keyboard.addListener('keyboardDidShow', this.keyboardDidShow),
          Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
        ])
      }

      componentWillUnmount () {
        while (this.events.length) {
          this.events.pop().remove()
        }
      }

       keyboardDidShow = event => {
         const windowHeight = Dimensions.get('window').height
         const keyboardHeight = windowHeight - event.endCoordinates.height
         this.props.setKeyboardShown()
         this.props.setKeyboardHeight(keyboardHeight)
       }

       keyboardDidHide = event => {
         this.props.unsetKeyboardShown()
         this.props.unsetKeyboardHeight()
       }

       render () {
         return (
           <WrappedComponent
             {...this.props}
           />
         )
       }
    }

    return connect(mapStateToProps, mapDispatchToProps)(KeyboardContainer)
  }
}
