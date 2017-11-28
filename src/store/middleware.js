import thunk from 'redux-thunk'
import weechat from './weechat/middleware'

export default [weechat, thunk]
