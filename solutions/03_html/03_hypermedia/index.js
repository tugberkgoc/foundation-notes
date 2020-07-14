#!/usr/bin/env node

const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()
const views = require('koa-views')
app.use(require('koa-static')('public'))
const port = 8080

app.use(views(`${__dirname}/views`, { extension: 'html' }, {map: { handlebars: 'handlebars' }}))

router.get('/', async ctx => await ctx.render('index'))
router.get('/commodore', async ctx => ctx.render('commodore64'))
router.get('/spectrum', async ctx => ctx.render('spectrum'))
router.get('/paradoxes', async ctx => ctx.render('paradoxes'))
router.get('/cathedral', async ctx => ctx.render('cathedral'))

router.get('/date', async ctx => {
	const today = new Date()
	const dd = today.getDate()
	const mm = today.getMonth()+1
	const yyyy = today.getFullYear()
	ctx.body = `<h1>The date is: ${dd}/${mm}/${yyyy}`
})

router.get('/time', async ctx => {
	const today = new Date()
	const hh = today.getHours()
	const mm = today.getMinutes()
	ctx.body = `<h1>The time is: ${hh}:${mm}`
})

app.use(router.routes())
module.exports = app.listen(port, () => console.log(`listening on port ${port}`))
