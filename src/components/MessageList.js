import React, {PureComponent} from 'react'

import {
  StyleSheet,
  View,
  FlatList
} from 'react-native'

import Message from './Message'

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#fcfcfc'
  }
})

export default class MessageList extends PureComponent {
  state = {}

  events = []

  scrollToEnd = () =>
    this.list && this.list.scrollToEnd({animated: true})

   componentDidMount () {
     this.scrollToEnd()
   }

  componentDidUpdate (prevProps) {
    const {
      messages,
      keyboardShown
    } = this.props

    if (keyboardShown !== prevProps.keyboardShown) {
      this.scrollToEnd()
    }

    if (messages !== prevProps.messages) {
      this.scrollToEnd()
    }
  }

  render () {
    const {
      messages = [],
      style,
      keyboardHeight
    } = this.props

    return (
      <FlatList
        style={styles.view}
        data={messages}
        renderItem={({item}) =>
          <Message
            {...item}
          />
        }
        ref={node => { this.list = node }}
        scrollsToTop={false}>
      </FlatList>
    )
  }
}
