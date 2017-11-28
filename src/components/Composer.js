import React, {PureComponent} from 'react'

import {
  StyleSheet,
  TextInput,
  KeyboardAvoidingView
} from 'react-native'

const styles = StyleSheet.create({
  input: {
    width: '100%',
    flex: 1,
    height: 40,
    padding: 6,
    borderColor: '#f25',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderStyle: 'solid',
    borderRadius: 3,
    backgroundColor: 'white',
    color: '#c6b',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  }
})

export default class Composer extends PureComponent {
  handleSubmit = text => {
    this.props.sendMessage()
      .then(() => this.inputNode.focus())
  }

  render () {
    const {
      message,
      setMessage,
      setComposerFocused,
      unsetComposerFocused
    } = this.props

    return (
      <KeyboardAvoidingView>
        <TextInput
          autoFocus
          style={styles.input}
          ref={node => { this.inputNode = node }}
          value={message}
          onChangeText={setMessage}
          onFocus={setComposerFocused}
          onBlur={unsetComposerFocused}
          onSubmitEditing={this.handleSubmit}
          returnKeyType='send'
        />
      </KeyboardAvoidingView>
    )
  }
}
