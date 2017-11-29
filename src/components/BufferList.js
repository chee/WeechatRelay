import React, {PureComponent} from 'react'

import {
  sortBy,
  values,
  compose,
  prop
} from 'ramda'

import {
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView
} from 'react-native'

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#366',
    flex: 1
  },
  item: {
    color: 'white',
    padding: 6
  },
  activeItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    color: '#366'
  },
  scrollView: {
    flex: 1
  }
})

const BufferName = props => {
  const {
    name,
    active,
    selectBuffer,
    id
  } = props

  const style = [
    styles.item,
    active && styles.activeItem
  ].filter(Boolean)

  return (
    <Text
      onPress={() => {
        selectBuffer(id)
      }}
      onClick={() => {
        selectBuffer(id)
      }}
      style={style}>
      {name}
    </Text>
  )
}

const sortBuffers = compose(
  sortBy(prop('number')),
  values
)

export default class BufferList extends PureComponent {
  render () {
    const {
      selectBuffer,
      activeBufferId,
      buffers = {},
      style
    } = this.props

    return (
      <SafeAreaView style={[styles.view, style]}>
        <ScrollView style={[styles.scrollView, style]}>
          {sortBuffers(buffers).map(buffer =>
            <BufferName
              {...buffer}
              key={buffer.id}
              selectBuffer={selectBuffer}
              active={activeBufferId === buffer.id}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    )
  }
}
