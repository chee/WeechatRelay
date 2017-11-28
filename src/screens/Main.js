import React, {PureComponent} from 'react'

import {
  KeyboardAvoidingView,
  SafeAreaView,
  View,
  StyleSheet
} from 'react-native'

import {
  compose
} from 'redux'

import withBuffers from '../containers/withBuffers'
import withMessage from '../containers/withMessage'
import withMessages from '../containers/withMessages'
import withWeechat from '../containers/withWeechat'

import BufferList from '../components/BufferList'
import Buffer from '../components/Buffer'
import Composer from '../components/Composer'

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fcfcfc'
  },
  bufferWrap: {
    flex: 1,
    flexDirection: 'row'
  },
  bufferList: {
    flex: 0.1,
    flexShrink: 1
  },
  buffer: {
    flex: 2
  }
})

class Main extends PureComponent {
  componentDidUpdate (prevProps) {
    const {
      activeBufferId,
      getMessages
    } = this.props

    if (activeBufferId !== prevProps.activeBufferId) {
      getMessages()
    }
  }

  render () {
    const {
      buffers = {},
      messages,
      message,
      setMessage,
      sendMessage,
      selectBuffer,
      activeBufferId
    } = this.props

    const buffer = buffers[activeBufferId]

    return (
      <SafeAreaView style={styles.view}>
        <View
          style={styles.bufferWrap}>
          <BufferList
            style={styles.bufferList}
            buffers={buffers}
            selectBuffer={selectBuffer}
            activeBufferId={activeBufferId}
          />
          <Buffer
            style={styles.buffer}
            messages={messages}
            {...buffer}
          />
        </View>
        <Composer
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </SafeAreaView>
    )
  }
}

export default compose(
  withWeechat(),
  withMessages(),
  withMessage(),
  withBuffers()
)(Main)
