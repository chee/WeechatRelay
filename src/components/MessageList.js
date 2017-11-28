import React, {PureComponent} from 'react'

import {
  ScrollView
} from 'react-native'

import Message from './Message'

export default class MessageList extends PureComponent {
  componentDidUpdate (prevProps) {
    if (this.props.messages === prevProps.messages) return

    this.listView.scrollToEnd({animated: true})
  }

  render () {
    const {
      messages = []
    } = this.props

    return (
      <ScrollView
        ref={node => { this.listView = node }}
        scrollsToTop={false}>
        {messages.map((message, index) =>
          <Message
            key={`${message.date} ${message.nick} ${index}`}
            {...message}
          />
        )}
      </ScrollView>
    )
  }
}
