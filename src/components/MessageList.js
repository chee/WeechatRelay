import React, {PureComponent} from 'react'

import {
  FlatList,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native'

import Message from './Message'

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#fcfcfc'
  }
})

export default class MessageList extends PureComponent {
  componentDidUpdate (prevProps) {
    if (this.props.messages === prevProps.messages) return

    this.listView.scrollToEnd({animated: true})
  }

  render () {
    const {
      messages = [],
      style
    } = this.props

    return (
      <KeyboardAvoidingView
        style={{flex: 1}}
        behaviour='position'>
        <FlatList
          style={[styles.view, style]}
          data={messages}
          renderItem={({item}) =>
            <Message
              {...item}
            />
          }
          ref={node => { this.listView = node }}
          scrollsToTop={false}>
        </FlatList>
      </KeyboardAvoidingView>
    )
  }
}
