import React, {PureComponent} from 'react'

import {
  StatusBar,
  KeyboardAvoidingView,
  StyleSheet
} from 'react-native'

import SideMenu from 'react-native-side-menu'

import {
  compose
} from 'redux'

import withBuffers from '../containers/withBuffers'
import withKeyboard from '../containers/withKeyboard'
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
  bufferWrapper: {
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
      activeBufferId,
      keyboardShown,
      keyboardHeight
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
          style={styles.bufferWrapper}
          behavior='padding'>
          <Buffer
            keyboardHeight={keyboardHeight}
            style={styles.buffer}
            messages={messages}
            keyboardShown={keyboardShown}
            {...buffer}
          />
          <Composer
            activeBufferId={activeBufferId}
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
  withKeyboard(),
  withMessages(),
  withMessage(),
  withBuffers()
)(Main)
