// TODO rewrite
var Protocol = require('./protocol.js')
var Buffer = require('buffer/').Buffer

function Parser (cb) {
  var self = this
  var buffer = Buffer.alloc(0)
  var total = 0
  var unzipping = false
  var protocol = new Protocol()

  function parseData (data) {
    protocol.setData(data)
    var id = protocol.getString()
    var obj = protocol.parse()

    if (cb) cb(id, obj)
    total = 0
  }

  function handleData (data) {
    protocol.setData(data)
    // Remove total from data
    protocol.getInt()
    var compression = protocol.getChar()
    data = protocol.getData()

    if (compression) {
      unzipping = true
      zlib.unzip(data, function (err, data) {
        unzipping = false
        if (err) throw err
        parseData(data)
        self.onData()
      })
    } else {
      parseData(data)
      self.onData()
    }
  }

  function concatBuffers (bufferA, bufferB) {
    var buffer = Buffer.alloc(bufferA.length + bufferB.length)
    bufferA.copy(buffer)
    bufferB.copy(buffer, bufferA.length)
    return buffer
  }

  self.onData = function (part) {
    var data

    if (part) {
      buffer = concatBuffers(buffer, Buffer.from(part))
    }

    // Need at least 1 int (4 bytes) in buffer
    if (!unzipping && buffer.length > 4) {
      if (total === 0) {
        protocol.setData(buffer)
        total = protocol.getInt()
      }

      // Ready to parse buffer
      if (buffer.length >= total) {
        data = buffer.slice(0, total)
        buffer = buffer.slice(total)
        total = 0
        handleData(data)
      }
    }
  }
}

module.exports = Parser
