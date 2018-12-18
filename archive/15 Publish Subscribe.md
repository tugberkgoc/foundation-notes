
# Publish Subscribe

Up to this point all the activities have been using the **HTTP Protocol**, which uses a _request-response_ process (the client requests a resource and the server responds with this resource). If this seems unfamiliar you should work through the HTTP Protocol worksheet.

Whilst this approach works fine for delivering content to a web browser it is not a useful approach for certain applications. Imagine a chat room where you had to refresh the page to view new messages.

In this worksheet you will learn how to use a new HTML5 **websocket** protocol that allows a full duplex (2 way) communication over a single TCP connection. We will then explore the **MQTT** protocol which can be run over websockets and is used to implement a _push message_ system, technically called _publish-subscribe_.



## 2 Set Up

Start by installing the [Mosquitto Tools](https://www.eclipse.org/mosquitto/download/).

If you are using MacOS you should install the [Brew Package Manager](https://brew.sh) and use this to install Mosquitto using `brew install mosquitto`.

If you are using Ubuntu you can install using`sudo apt install mosquitto`.

```
mosquitto_sub -h test.mosquitto.org -t "#" -v
```

## 1 The MQTT Protocol

Now we have the tools installed we can start using the protocol. You have installed 2 tools, `mosquitto_pub` is used to publish messages and `mosquitto_sub` subscribes to a channel. We will use the `test.mosquitto.org` broker.

Start by opening _two_ terminal windows:

In the first window we will run the `mosquitto_sub` command  and subscribe to a _topic_ called `205CDE/XXX` where `XXX` is your university username.

```shell
$ mosquitto_sub -h test.mosquitto.org -t 205CDE/XXX
```

1. The `-h` flag allows us to specify the _host_, in this case `test.mosquitto.org`.
2. The `-t` flag allows us to specify the _topic_, in this case `205CDE/XXX` (remember to substitute your username)

In the second terminal we will run the `mosquitto_pub` command to publish messages to our topic.

```shell
$ mosquitto_pub -h test.mosquitto.org -t tyers/mark  -m 'hello world'
```

1. The `-h` flag allows us to specify the _host_, in this case `test.mosquitto.org`.
2. The `-t` flag allows us to specify the _topic_, in this case `205CDE/XXX` (remember to substitute your username)
3. The `-m` flag allows us to specify the _message_, in this case `hello world`.

If you look at the first terminal window (running `mosquitto_sub`) you should see your message displayed.

### 2.1 Test Your Understanding

Working in small groups of between 2 and 4 people:

1. Decide on the _topic name_ you will use.
2. Everyone runs the `mosquitto_sub` tool and subscribes to this same topic.
3. Each person launches a new terminal in a new pane (so you can see both terminal windows).
4. use the `mosquitto_pub` tool to send a message to your chosen _topic name_.
5. Look at the output of your `mosquitto_sub` command (in the first terminal window).

What have you produced? Can you think of any application for this...

## 3 Subscribing Using NodeJS

Open the `subscribe.js` file and study the contents:

1. When you run the script notice that the title is displayed in colour by passing 2 parameters to `console.log()`, the first parameter defines the colour:
    1. The string before the `%s` string defines the colour to be used. There is a [reference](https://coderwall.com/p/yphywg/printing-colorful-text-in-terminal-when-run-node-js-script) that defines these.
    2. The string aftet the `%s` string resets the colours to default values so that any subsequent text reverts back to the defaults.
2. We import the `mqtt` package and use this to create a new client object by calling the `connect()` function and passing in the URL.
    1. Notice we specify the **MQTT** protocol rather than **HTTP**, by specifying `mqtt://`.
    2. We are connecting to the `test.mosquitto.org` server.
3. The `client.on()` function allows us to call anonymous functions to respond to key events:
    1. Once we have connected we subscribe to one or more _topics_.
    2. When a message is received we have a callback that passed both the _topic_ and _message_ as parameters.
    3. The `\t` character combination inserts a tab character.

### 3.1 Test Your Understanding

1. Change the script so it subscribes to your group's chosen _topic_. Run it to make sure it is receiving the messages.
2. Subscribe to an additional topic called `205CDE/announcements` and use the `mosquitto_pub` tool to publish some messages to the entire class!
3. Modify the script so that the _topic names_ are dimmer than the messages.
4. Modify the script so that any messages published to the `205CDE/announcements` are coloured in **red**.

## 4 Publishing Using NodeJS

## 5 Creating a Web Client

https://github.com/jpmens/simple-mqtt-websocket-example

## Websocket

Web Sockets is a bidirectional communication technology which operates over a single socket. It is implemented using a JavaScript object called `WebSocket`. This can be used to send data to a server and receive data through an event handler.

We start by creating a new WebSocket object passing the URL of the server.

```javascript
const ws = new WebSocket(url)
```

This object contains a `readyState` property that represents the state of the connection. It contains one of four different values.

| value | meaning                                                     |
| ----# | ----------------------------------------------------------- |
| 0     | the connection has not yet been established                 |
| 1     | the connection is established and communication is possible |
| 2     | the connection is going through the closing handshake       |
| 3     | the connection has been closed or could not be opened       |

It has two functions:

1. Data can be sent to the server using `WebSocket.send()`.
2. The connection can be terminated using `WebSocket.close()`.

There are four events associated with the `WebSocket` object.

| event     | event handler      | description                         |
| --------- | ------------------ | ----------------------------------- |
| `open`    | `Socket.onopen`    | socket connection is established    |
| `message` | `Socket.onmessage` | client receives data from server    |
| `error`   | `Socket.onerror`   | error in communication              |
| `close`   | `Socket.onclose`   | connection is closed                |
