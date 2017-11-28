import React, {PureComponent} from 'react'

import {
  View,
  StyleSheet,
  Text
} from 'react-native'

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    padding: 4,
    backgroundColor: '#343436',
    position: 'absolute',
    left: 0,
    right: 0,
    height: 20,
    flexShrink: 1
  },
  item: {
    paddingTop: 1,
    paddingRight: 8,
    fontSize: 10,
    color: '#fff'
  }
})

export default class BufferTitle extends PureComponent {
  render () {
    const {
      number = '',
      name = '',
      topic = ''
    } = this.props

    return (
      <View style={styles.view}>
        <Text style={[styles.item, styles.number]}>
          {number}
        </Text>
        <Text style={[styles.item, styles.name]}>
          {name}
        </Text>
        <Text style={[styles.item, styles.topic]}>
          {topic}
        </Text>
      </View>
    )
  }
}
