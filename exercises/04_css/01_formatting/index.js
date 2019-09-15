#!/usr/bin/env node

const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()
const views = require('koa-views')
app.use(require('koa-static')('public'))
const port = 8080

app.use(views(`${__dirname}/html`, { extension: 'html' }, {map: { handlebars: 'handlebars' }}))

router.get('/', async ctx => await ctx.render('hello'))
router.get('/test', async ctx => await ctx.render('csstest'))
router.get('/comparison', async ctx => await ctx.render('comparison'))
router.get('/hello', async ctx => await ctx.render('hello-world'))
router.get('/selectors', async ctx => await ctx.render('selectors'))
router.get('/targets', async ctx => await ctx.render('targets'))

app.use(router.routes())
module.exports = app.listen(port, () => console.log(`listening on port ${port}`))
