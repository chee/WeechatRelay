import React, {PureComponent} from 'react'

import {
  Linking,
  Text,
  View,
  StyleSheet
} from 'react-native'

import {
  uniq
} from 'ramda'

import Embed from './Embed'

const colors = {
  black: '#333',
  'dark gray': '#666',
  'dark red': '#900',
  'light red': '#f66',
  'dark green': '#393',
  'light green': '#3f6',
  brown: '#a63',
  yellow: '#ff6',
  'dark blue': '#339',
  'light blue': '#3cf',
  'dark magenta': '#c09',
  'light magenta': '#f47',
  'dark cyan': '#39a',
  'light cyan': '#6cf',
  gray: '#999',
  white: '#eee'
}

const urlRegex = /((?:https?|ftp):\/\/[^\s/$.?#].[^\s]*)/ig

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column'
  },
  embed: {
    flex: 0.2
  },
  bit: {
    marginRight: 4,
    lineHeight: 18
  },
  message: {
    flexDirection: 'row',
    padding: 2,
    flex: 1
  },
  link: {
    color: '#49c'
  }
})

const getUrls = text => text.match(urlRegex)

const addLinks = (text, components = []) => {
  const urls = getUrls(text)

  if (!urls || !urls.length) {
    return components.length
      ? components
      : text
  }

  const url = urls[0]

  const index = text.indexOf(url)

  const {
    length
  } = url

  const firstKey = `${text}${index}`
  const secondKey = `${text}${index + length}`

  const nextComponents = [
    ...components,
    <Text key={firstKey}>
      {text.substr(0, index)}
    </Text>,
    <Text
      onPress={() => {
        Linking.openURL(url)
      }}
      accessibilityRole='link'
      key={secondKey}
      style={styles.link}
      href={url}>
      {text.substr(index, length)}
    </Text>
  ]

  return addLinks(text.substr(index + length), nextComponents)
}

const Bit = ({style, children}) =>
  <Text style={[styles.bit, style]}>
    {addLinks(children)}
  </Text>

const StyledBit = ({fg, bg, style, children}) => {
  const relayStyle = {
    color: colors[fg],
    backgroundColor: colors[bg]
  }
  return (
    <Bit style={[style, relayStyle]}>
      {children}
    </Bit>
  )
}

const Bits = ({bits, style, handleUrls}) =>
  bits.map(({text, ...bit}, index) => {
    handleUrls && handleUrls(getUrls(text))
    return (
      <StyledBit
        key={text + index}
        style={style}
        {...bit}>
        {text}
      </StyledBit>
    )
  })

export default class Message extends PureComponent {
  render () {
    const {
      prefix,
      message
    } = this.props

    const urls = message.reduce((urls, bit) => [
      ...urls,
      ...getUrls(bit.text) || []
    ], [])

    return (
      <View style={styles.wrapper}>
        <View style={styles.message}>
          {prefix &&
            <Bits
              bits={prefix}
            />
          }
          {message &&
            <Bits
              handleUrls={this.handleUrls}
              bits={message}
            />
          }
        </View>
        {uniq(urls).map(url =>
          <Embed
            key={url}
            url={url}
          />
        )}
      </View>
    )
  }
}
