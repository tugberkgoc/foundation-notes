#!/usr/bin/env node

'use strict'

const File = require('./modules/file')

const Koa = require('koa')
const Router = require('koa-router')
const BodyParser = require('koa-bodyparser')
const views = require('koa-views')
const status = require('http-status-codes')

const port = 8080
const file = new File()

const app = new Koa()
app.use(views(`${__dirname}/views`, { extension: 'html' }, {map: { handlebars: 'handlebars' }}))
app.use(BodyParser({
    encoding: 'multipart/form-data'
}))

const router = new Router()

router.get('/', async ctx => {
    await ctx.render('pictures.html')
})
router.post('/', ctx => {
    try {
        console.log('processing the post request')
        const body = ctx.request.body
        console.log(body.fileUpload)
    } catch(err) {
        ctx.status = status.UNPROCESSABLE_ENTITY
		ctx.body = err.message
    }
})

app.use(router.routes())
module.exports = app.listen(port, () => console.log(`listening on port ${port}`))
