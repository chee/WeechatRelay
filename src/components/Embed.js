import React, {PureComponent} from 'react'

import {
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
    padding: 5
  }
})

export default class Embed extends PureComponent {
  state = {
    oembed: {},
    height: 100
  }

  receiveOembed = oembed =>
    this.setState({
      oembed
    })

  componentDidMount () {
    fetch(`https://noembed.com/embed?url=${this.props.url}`)
      .then(response => response.json())
      .then(this.receiveOembed)
  }

  updateWebViewHeight = event => {
    console.log('hello', event.jsEvaluationValue)
    this.setState({
      height: event.jsEvaluationValue
    })
  }

  render () {
    const {
      oembed,
      height
    } = this.state

    if (!oembed) return null

    if (!oembed.html) return null


    console.log(oembed.html )

    return (
      <View style={[styles.wrapper]}>
        <WebView
          style={[styles.web, {height}]}
          injectJavascript={what => {
            console.log(what)
            document.body.style.backgroundColor = '#ff2a50'
          }}
          injectedJavascript='document.body.scrollHeight'
          scrollEnabled={false}
          automaticallyAdjustContentInsets={true}
          onLoad={this.updateWebViewHeight}
          source={{html: oembed.html}}
        />
      </View>
    )
  }
}
