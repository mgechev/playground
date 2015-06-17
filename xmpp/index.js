var Server = require('node-xmpp-server').C2SServer,
    xmpp = require('node-xmpp'),
    server = new Server({
      domain: 'localhost',
      port: 55222
    });

server.on('connect', function (client) {
  // That's the way you add mods to a given server.

  // Allows the developer to register the jid against anything they want
  client.on('register', function(opts, cb) {
    console.log('REGISTER')
    cb(true)
  })

  // Allows the developer to authenticate users against anything they want.
  client.on('authenticate', function(opts, cb) {
    console.log('AUTH' + opts.jid + ' -> ' +opts.password)
    cb(null, opts) // cb(false)
  })

  client.on('online', function() {
    console.log('ONLINE')
    client.send(new xmpp.Message({ type: 'chat' }).c('body').t('Hello there, little client.'))
  })

  // Stanza handling
  client.on('stanza', function(stanza) {
    console.log('STANZA' + stanza)
  })

  // On Disconnect event. When a client disconnects
  client.on('disconnect', function() {
    console.log('DISCONNECT')
  })
});