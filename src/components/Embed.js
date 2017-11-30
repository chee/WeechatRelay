import React, {PureComponent} from 'react'

import {
  Image,
  Text,
  View,
  StyleSheet,
  WebView
} from 'react-native'

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ccc',
    margin: 5,
    backgroundColor: '#f7f7f7',
    padding: 5,
    minHeight: 100
  },
  image: {
    flex: 1,
    resizeMode: 'contain'
  }
})

const getNoembedUrl = url =>
  `https://noembed.com/embed?url=${url}`

const getContentTypeUrl = url =>
  `https://content-type.herokuapp.com/${url}`


export default class Embed extends PureComponent {
  state = {
    oembed: {},
    webviewHeight: 100,
    contentType: ''
  }

  receiveOembed = oembed =>
    this.setState({
      oembed
    })

  fetchOembed = () =>
    fetch(getNoembedUrl(this.props.url))
      .then(response => response.json())
      .then(this.receiveOembed)

  receiveContentType = contentType =>
    contentType && this.setState({
      contentType: contentType.replace()
    })

  fetchContentType = () =>
    fetch(getContentTypeUrl(this.props.url), {
      method: 'HEAD'
    })
      .then(response => response.headers.get('content-type'))
      .then(this.receiveContentType)

  componentDidMount () {
    this.fetchContentType()
    this.fetchOembed()
  }

  updateWebViewHeight = event => {
    this.setState({
      webviewHeight: event.jsEvaluationValue
    })
  }

  render () {
    const {
      url
    } = this.props

    const {
      oembed,
      webviewHeight,
      contentType
    } = this.state

    if (!oembed.html && !contentType) return null

    return (
      <View style={[styles.wrapper]}>
        {oembed.html &&
          <WebView
            style={[styles.web, {height: webviewHeight}]}
            injectedJavascript='document.body.scrollHeight'
            scrollEnabled={false}
            automaticallyAdjustContentInsets={true}
            onLoad={this.updateWebViewHeight}
            source={{html: oembed.html}}
          />
        }
        {contentType.startsWith('image') &&
          <Image
            source={{uri: url}}
            style={styles.image}
          />
        }
      </View>
    )
  }
}
