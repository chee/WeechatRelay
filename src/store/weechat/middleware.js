import config from '../../../config.json'

import * as weechat from '../../weechat'

import {
  REGULAR_MESSAGE,
  JOIN_MESSAGE,
  PART_MESSAGE,
  QUIT_MESSAGE,
  NICK_MESSAGE
} from '../messages/types'

import {
  addMessage
} from '../messages/actions'

import {
  addBuffer,
  removeBuffer,
  selectBuffer
} from '../buffers/actions'

import {
  connect,
  disconnect,
  sendMessage,
  openBuffer,
  getMessages,
  getNicks,
  getBuffers
} from './actions'

import flag from './flag'

const NICK_REGEX = /^nick_(\S+)/i

function createBufferCommand ({bufferId = 'gui_buffers(*)'}) {
  return `hdata buffer:${bufferId} number,short_name,title,local_variables`
}

function createMessagesCommand ({bufferId, count = 10}) {
  return `hdata buffer:${bufferId}/own_lines/last_line(-${count})/data`
}

function parseBufferLine (buffer) {
  if (!buffer || !buffer.pointers) return null

  const id = buffer.pointers[0]

  const {
    number = 0,
    local_variables: {
      channel: name = buffer.local_variables.plugin,
      server = 'weechat',
      type
    }
  } = buffer

  return {
    key: `${number} ${server} ${name}`,
    id,
    number,
    name,
    server,
    type
  }
}

function createLineKey (line, index) {
  const {
    date,
    message
  } = line

  return `${index}: ${date} ${weechat.noStyle(message)}`
}

function parseLine (line, index) {
  const {
    tags_array: tags,
    date,
    highlight,
    prefix,
    buffer: bufferId,
    displayed,
    message
  } = line

  const types = [
    JOIN_MESSAGE,
    PART_MESSAGE,
    QUIT_MESSAGE,
    NICK_MESSAGE
  ]

  const type = types.find(type =>
    tags.includes(type)
  ) || REGULAR_MESSAGE

  const nick = tags.find(tag => {
    const match = NICK_REGEX.exec(tag)
    return match && match[1]
  })

  return {
    key: createLineKey(line, index),
    bufferId,
    prefix: weechat.style(prefix),
    date: Number(date),
    type,
    nick: nick && nick.replace(NICK_REGEX, '$1'),
    highlight: !!highlight,
    displayed: displayed == null || !!displayed,
    message: weechat.style(message)
  }
}

export default function weechatMiddleware (store) {
  let client

  const createClient = function createClient (options) {
    const {
      host,
      port,
      password,
      ssl,
      reconnect
    } = options

    if (client && !reconnect) {
      return Promise.resolve(client)
    }

    return new Promise(resolve => {
      client = weechat.connect(host, port, password, ssl, () => {
        client.on('error', error => {
          console.error(error)
        })

        resolve(client)
      })
    })
  }

  return next => async nextAction => {
    const {
      [flag]: action
    } = nextAction

    if (!action) {
      return next(nextAction)
    }

    const {
      type,
      payload = {}
    } = action

    switch (type) {
      case connect.actionType: {
        const options = {
          ...config,
          ...payload
        }

        const {
          host,
          port,
          password,
          ssl,
          reconnect
        } = options

        await createClient({
          host,
          port,
          password,
          ssl,
          reconnect
        })

        client.on('open', buffer => {
          const bufferId = buffer.pointers[0]
          next(selectBuffer(bufferId))
          store.dispatch(getBuffers({bufferId}))
        })

        client.on('close', buffer => {
          const bufferId = buffer.pointers[0]
          next(removeBuffer(bufferId))
        })

        client.on('line', line => {
          const lines = Array.isArray(line)
            ? line
            : [line]

          lines.forEach((line, index) => {
            next(addMessage(parseLine(line, index)))
          })
        })

        store.dispatch(getBuffers())

        return client
      }
      case getBuffers.actionType: {
        const {
          bufferId
        } = payload

        const command = createBufferCommand({bufferId})

        client.send(command, line => {
          const bufferLines = Array.isArray(line)
            ? line
            : [line]

          bufferLines.forEach(bufferLine => {
            const buffer = parseBufferLine(bufferLine)

            if (!buffer) return

            next(addBuffer(buffer))
          })
        })

        return
      }
      case getMessages.actionType: {
        const {
          count
        } = payload

        const {
          activeBufferId
        } = store.getState()

        const bufferId = payload.bufferId || activeBufferId

        const command = createMessagesCommand({
          bufferId,
          count
        })

        client.send(command, line => {
          const lines = Array.isArray(line)
            ? line.reverse()
            : [line]

          lines.forEach((line, index) => {
            next(addMessage(parseLine(line, index)))
          })
        })

        return
      }
      case sendMessage.actionType: {
        const {
          message
        } = payload

        const {
          activeBufferId
        } = store.getState()

        const bufferId = payload.bufferId || activeBufferId

        return client.send(`input ${bufferId} ${message}`)
      }
      case disconnect.actionType: {
        return client.disconnect()
      }
      default:
    }
  }
}
