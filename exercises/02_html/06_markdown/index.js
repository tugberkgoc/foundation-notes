#!/usr/bin/env node

const marked = require('marked')
const readFile = require('fs-readfile-promise')

const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()
app.use(require('koa-static')('public'))
const port = 8080

router.get('/', async ctx => ctx.body = marked(await readFile('./computers.md', 'utf8')))

app.use(router.routes())
module.exports = app.listen(port, () => console.log(`listening on port ${port}`))
