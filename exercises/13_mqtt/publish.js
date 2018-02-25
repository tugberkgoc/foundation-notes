#!/usr/bin/env node

'use strict'
const readline = require('readline-sync')
const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://test.mosquitto.org')

console.log('\x1b[36m%s\x1b[0m', 'an MQTT Client')

while(1) {
    const input = String(readline.question('enter command: ')).trim()
    client.publish('205CDE/mark', input)
}


// client.on('connect', () => {
//     client.subscribe('205CDE/mark')
// })

// client.on('message', (topic, message) => {
//     console.log(topic)
//     console.log(`\t${message.toString()}`)
// })
