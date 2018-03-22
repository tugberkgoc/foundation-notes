#!/usr/bin/env node

'use strict'

const WebSocketServer = require('websocket').server
const http = require('http')

const messages = []
const clients = []

const server = http.createServer( (request, response) => {
    // process HTTP request. Since we're writing just WebSockets
    // server we don't have to implement anything.
  })

  server.listen(1337, () => { })
  
  // create the server
  wsServer = new WebSocketServer({
    httpServer: server
  })

  wsServer.on('request', request => {
    const connection = request.accept(null, request.origin)
  
    // This is the most important callback for us, we'll handle
    // all messages from users here.
    connection.on('message', message => {
      if (message.type === 'utf8') {
        // process WebSocket message
      }
    });
  
    connection.on('close', connection => {
      // close user connection
    })
  })