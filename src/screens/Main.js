import React, {PureComponent} from 'react'

import {
  KeyboardAvoidingView,
  StatusBar,
  View,
  StyleSheet
} from 'react-native'

import SideMenu from 'react-native-side-menu'

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
    backgroundColor: '#333333'
  },
  buffer: {
    flex: 1
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

    const bufferList =
      <BufferList
        style={styles.bufferList}
        buffers={buffers}
        selectBuffer={selectBuffer}
        activeBufferId={activeBufferId}
      />

    return (
      <SideMenu
        menu={bufferList}
        style={styles.view}>
        <StatusBar
          backgroundColor='#333'
          barStyle='light-content'
        />
        <KeyboardAvoidingView
          style={{flex: 1}}
          behaviour='padding'>
          <Buffer
            style={styles.buffer}
            messages={messages}
            {...buffer}
          />
          <Composer
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </KeyboardAvoidingView>
      </SideMenu>
    )
  }
}

export default compose(
  withWeechat(),
  withMessages(),
  withMessage(),
  withBuffers()
)(Main)
