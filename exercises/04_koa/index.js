#!/usr/bin/env node

const Koa = require('koa')
const Router = require('koa-router')
const views = require('koa-views')
const stat = require('koa-static')

const app = new Koa()
const router = new Router()
app.use(stat('public'))
app.use(views(`${__dirname}/views`, { extension: 'html' }, {map: { handlebars: 'handlebars' }}))
app.use(router.routes())

const port = 8080

router.get('/', async ctx => await ctx.render('hello'))

module.exports = app.listen(port, () => console.log(`listening on port ${port}`))
