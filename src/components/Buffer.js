import React, {PureComponent} from 'react'

import {
  SafeAreaView,
  StyleSheet
} from 'react-native'

import MessageList from './MessageList'
import Title from './BufferTitle'

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#333'
  }
})

export default class Buffer extends PureComponent {
  render () {
    const {
      id,
      name,
      topic,
      number,
      messages,
      style,
      keyboardShown,
      keyboardHeight
    } = this.props

    return (
      <SafeAreaView
        style={styles.view}>
        <Title
          id={id}
          name={name}
          topic={topic}
          number={number}
        />
        <MessageList
          bufferId={id}
          messages={messages}
          keyboardShown={keyboardShown}
          keyboardHeight={keyboardHeight}
        />
      </SafeAreaView>
    )
  }
}
