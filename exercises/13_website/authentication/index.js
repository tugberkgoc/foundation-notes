#!/usr/bin/env node

'use strict'

const express = require('express')
const es6Renderer = require('express-es6-template-engine')
const bodyParser = require('body-parser')
const app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.engine('html', es6Renderer)
app.set('views', 'html')
app.set('view engine', 'html')

const port = 8080

const sqlite3 = require('sqlite3').verbose()

const bcrypt = require('bcrypt')

const session = require('express-session')
const FileStore = require('session-file-store')(session)
app.use(session({
    name: 'server-session-cookie-id',
    secret: 'my express secret',
    saveUninitialized: true,
    resave: true,
    store: new FileStore()
}))

app.use(function printSession(req, res, next) {
    console.log('req.session', req.session)
    return next()
  })

const db = new sqlite3.Database('./auth.db', err => {
	if (err) return console.error(err.message)
	console.log('Connected to the SQlite database.')
})

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/html/index.html`)
})

app.get('/register', (req, res) => {
    res.sendFile(`${__dirname}/html/register.html`)
})

app.post('/register', (req, res) => {
    console.log(req.body)
    bcrypt.hash(req.body.pass, 10, (err, hash) => {
        req.body.pass = hash
        console.log(req.body)
        const sql = `INSERT INTO users(name, username, email, password) 
                    VALUES("${req.body.name}", "${req.body.user}", "${req.body.email}", "${req.body.pass}")`
        console.log(sql)
        db.run(sql, err => {
            if(err) console.error(err.message)
            console.log('new account added')
            //res.redirect('/')
        })
    })
})

app.listen(port, () => console.log(`app listening on port ${port}`))
