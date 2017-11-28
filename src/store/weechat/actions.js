import {default as createAction} from '../createAction'

import flag from './flag'

function createRelayAction (type) {
  return createAction(type, flag)
}

export const connect = createRelayAction('connect to relay')

export const disconnect = createRelayAction('disconnect from relay')

export const sendMessage = createRelayAction('send message')

export const openBuffer = createRelayAction('open buffer')

export const getMessages = createRelayAction('get messages')

export const getNicks = createRelayAction('get nicks')

export const getBuffers = createRelayAction('get buffers')
