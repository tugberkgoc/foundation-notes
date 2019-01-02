#!/usr/bin/env node

const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()
const views = require('koa-views')
app.use(require('koa-static')('public'))
const port = 8080

app.use(views(`${__dirname}/views`, { extension: 'html' }, {map: { handlebars: 'handlebars' }}))

router.get('/', async ctx => await ctx.render('boxmodel'))
router.get('/boxmodel', async ctx => await ctx.render('boxmodel'))
router.get('/columns', async ctx => await ctx.render('columns'))
router.get('/floating', async ctx => await ctx.render('floating'))
router.get('/menu', async ctx => await ctx.render('menu'))

app.use(router.routes())
module.exports = app.listen(port, () => console.log(`listening on port ${port}`))
