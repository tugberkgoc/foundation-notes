#!/usr/bin/env node

const Koa = require('koa')
const app = new Koa()

const port = 8080

app.use( ctx => ctx.body = 'Hello World')

module.exports = app.listen(port, () => console.log(`listening on port ${port}`))
