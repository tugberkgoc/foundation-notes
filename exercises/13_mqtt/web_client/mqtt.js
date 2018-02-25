
'use strict'

client = new Paho.MQTT.Client('mqtt://test.mosquitto.org', 1883, "clientId")

client.onConnectionLost = responseObject => {
	if (responseObject.errorCode !== 0) {
		console.log(`onConnectionLost: ${responseObject.errorMessage}`);
	}
}

client.onMessageArrived = message => {
	console.log(`onMessageArrived: ${message.payloadString}`)
}

client.connect({onSuccess: () => {
	// Once a connection has been made, make a subscription and send a message.
	console.log('onConnect')
	client.subscribe('205CDE/mark') // subscribe to a topic
	message = new Paho.MQTT.Message('Hello')
	message.destinationName = '205CDE/mark'
	client.send(message)
  }})
