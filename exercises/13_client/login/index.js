#!/usr/bin/env node

'use strict'

const express = require('express')
const app = express()
app.use(express.static('public'))
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const port = 8080

const status = {
	OK: 200,
	NOT_AUTHORISED: 401,
	NOT_FOUND: 404
}

app.get('/', (req, res) => {
	res.sendFile(`${__dirname}/html/index.html`)
})

app.get('/login', (req, res) => {
	res.sendFile(`${__dirname}/html/login.html`)
})

app.post('/checkauth', (req, res) => {
	//console.log(req.headers)
	console.log(JSON.stringify(req.body))
	res.setHeader('content-type', 'application/json')
	console.log(req.body.username)
	console.log(req.body.password)
	if(req.body.username !== 'jdoe' || req.body.password !== 'p455w0rd') {
		console.log('bad credentials')
		res.status(status.NOT_AUTHORISED).json({message: 'invalid credentials'})
	} else {
		console.log('good credentials')
		res.status(status.OK).json({message: 'valid credentials'})
	}
})

/**
 * Route to check the validity of a Basic Auth request.
 * It uses the HTTP HEAD method since only the response header is required.
 */
app.get('/checkauth', (req, res) => {
	console.log('HEAD: /checkauth')
	console.log(`req.headers.authorization: ${req.headers.authorization}`)
	if(!req.headers.authorization) res.status(status.NOT_AUTHORISED).end()
	console.log('authorization header found')
	if(req.headers.authorization.indexOf('Basic ') !== 0) res.status(status.NOT_AUTHORISED).end()
	console.log('basic auth detected')
	console.log(`header: ${req.headers.authorization}`)
	const [,token] = req.headers.authorization.split(' ') // destructuring assignment
	console.log(`token: ${token}`)
	const decoded = Buffer.from(token, 'base64').toString()
	console.log(`decoded: ${decoded}`)
	const [username, password] = decoded.split(':') // destructuring assignment
	console.log(`username: ${username}, password: ${password}`)
	if(username !== 'jdoe' || password !== 'p455w0rd') res.status(status.NOT_AUTHORISED).end()
	console.log('authorised')
	res.status(status.OK).end('')
})

app.listen(port, () => {
	console.log(`app listening on port ${port}`)
})
