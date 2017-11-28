// TODO rewrite
//
//  http://www.weechat.org/files/doc/devel/weechat_relay_protocol.en.html
//
// Helper
function loop (range, cb) {
  var i
  for (i = 0; i < range; i++) {
    cb(i)
  }
}

function Protocol () {
  var self = this
  var data
  var types = {
    chr: getChar,
    'int': getInt,
    // hacks
    lon: getPointer,
    str: getString,
    buf: getBuffer,
    ptr: getPointer,
    // hacks
    tim: getPointer,
    htb: getHashtable,
    hda: getHdata,
    inf: getInfo,
    inl: getInfolist,
    arr: array
  }

  // Map all types to exports
  Object.keys(types).forEach(function (name) {
    var type = types[name]
    self[type.name] = type
  })

  function runType (type) {
    if (types[type]) {
      return types[type]()
    } else {
      throw new Error('Unknown type: ' + type)
    }
  }

  function getChar () {
    var c = data[0]
    data = data.slice(1)
    return c
  }

  function getInt () {
    var i = ((data[0] & 0xff) << 24) | ((data[1] & 0xff) << 16) | ((data[2] & 0xff) << 8) | (data[3] & 0xff)
    data = data.slice(4)
    return i >= 0 ? i : null
  }

  function getString () {
    var l = getInt()
    var s = data.slice(0, l)

    data = data.slice(l)
    return s.toString()
  }

  function getBuffer () {
    throw new TypeError('Type not implemented: Buffer')
  }

  function getPointer () {
    var l = data[0]
    var pointer = data.slice(1, l + 1)

    data = data.slice(l + 1)
    return pointer.toString()
  }

  function getHashtable () {
    var typeKeys = getType()
    var typeValues = getType()
    var count = getInt()
    var obj = {}

    loop(count, function () {
      obj[types[typeKeys]()] = runType(typeValues)
    })
    return obj
  }

  function getHdata () {
    var keys
    var paths
    var count
    var objs = []
    var hpath = getString()

    keys = getString().split(',')
    paths = hpath.split('/')
    count = getInt()

    keys = keys.map(function (key) {
      return key.split(':')
    })

    loop(count, function () {
      var tmp = {}
      // TODO: Why is path not used here?
      tmp.pointers = paths.map(function (path) {
        return getPointer()
      })
      keys.forEach(function (key) {
        tmp[key[0]] = runType(key[1])
      })
      objs.push(tmp)
    })
    return objs
  }

  function getInfo () {
    return {
      key: getString(),
      value: getString()
    }
  }

  function getType () {
    var t = data.slice(0, 3)
    data = data.slice(3)
    return t
  }

  function getInfolist () {
    throw new TypeError('Type not implemented: infolist')
  }

  function array () {
    var type
    var count
    var values

    type = getType()
    count = getInt()
    values = []
    loop(count, function () {
      values.push(runType(type))
    })
    return values
  }

  self.setData = function (d) {
    data = d
  }

  self.getData = function () {
    return data
  }

  self.parse = function () {
    if (data.length < 3) {
      return null
    }
    return runType(getType())
  }
}

module.exports = Protocol
