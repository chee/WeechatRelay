import {
  combineReducers
} from 'redux'

import activeBufferId from './activeBufferId/reducer'
import buffers from './buffers/reducer'
import composer from './composer/reducer'
import messages from './messages/reducer'
import nicks from './nicks/reducer'

export default combineReducers({
  activeBufferId,
  buffers,
  composer,
  messages,
  nicks
})
