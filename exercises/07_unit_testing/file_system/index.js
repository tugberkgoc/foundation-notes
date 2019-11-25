#!/usr/bin/env node
//todo: fix this
'use strict'

const File = require('./modules/file')

const Koa = require('koa')
const Router = require('koa-router')
const koaForm = require("formidable-upload-koa");
const views = require('koa-views')
const status = require('http-status-codes')

const port = 8080
const file = new File()

const app = new Koa()
app.use(views(`${__dirname}/views`, { extension: 'html' }, {map: { handlebars: 'handlebars' }}))
// app.use(Body({
// 	encoding: 'multipart/form-data'
// }))
// app.use(BodyParser({
// 	formidable:{uploadDir: './uploads'},    //This is where the files would come
// 	multipart: true,
// 	urlencoded: true
//  }))
const options = {
	uploadDir: `./upload/`,
	keepExtensions: true
}
const router = new Router()

router.get('/', async ctx => {
	await ctx.render('pictures.html')
})
router.post('/', koaForm(options), ctx => {
	try {
		console.log('processing the post request')
		// const body = ctx.request.body
		// console.log(ctx.request.body)
		console.log(ctx.req.files)
	} catch(err) {
		console.log(err)
		ctx.status = status.UNPROCESSABLE_ENTITY
		ctx.body = err.message
	}
})

app.use(router.routes())
module.exports = app.listen(port, () => console.log(`listening on port ${port}`))
