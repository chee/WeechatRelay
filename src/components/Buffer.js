import React, {PureComponent} from 'react'

import {
  SafeAreaView,
  View,
  StyleSheet
} from 'react-native'

import MessageList from './MessageList'
import Title from './BufferTitle'

const styles = StyleSheet.create({
  view: {
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
      style
    } = this.props

    return (
      <SafeAreaView style={[styles.view, style]}>
        <Title
          id={id}
          name={name}
          topic={topic}
          number={number}
        />
        <MessageList
          messages={messages}
        />
      </SafeAreaView>
    )
  }
}
