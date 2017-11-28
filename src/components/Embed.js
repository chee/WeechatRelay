import React, {PureComponent} from 'react'

import {
  Text,
  View,
  StyleSheet,
  WebView as NativeWebView
} from 'react-native'

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex'
  },
  inner: {
    display: 'flex',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ccc',
    margin: 5,
    backgroundColor: '#f7f7f7',
    padding: 5
  }
})

const WebView = NativeWebView || class WebView extends PureComponent {
  render () {
    const {
      source: {
        html: __html
      }
    } = this.props

    return (
      <Text
        dangerouslySetInnerHTML={{__html}}
      />
    )
  }
}

export default class Embed extends PureComponent {
  state = {}

  receiveOembed = oembed => {
    this.setState({
      oembed
    })
  }

  componentDidMount () {
    fetch(`https://noembed.com/embed?url=${this.props.url}`)
      .then(response => response.json())
      .then(this.receiveOembed)
  }

  render () {
    const {
      oembed
    } = this.state

    if (!oembed) return null

    if (!oembed.html) return null

    return (
      <View style={styles.wrapper}>
        <View style={styles.inner}>
          <WebView source={{html: oembed.html}} />
        </View>
      </View>
    )
  }
}
