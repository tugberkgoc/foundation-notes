#!/usr/bin/env node

'use strict'

// https://blog.theodo.fr/2016/11/securize-a-koa-api-with-a-jwt-token/

const Koa = require('koa')
const Router = require('koa-router')
//const koaBetterBody = require('koa-better-body')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
app.use(bodyParser())
const router = new Router()

const customerService = require('./customerService')
const jwt = require('./jwt')
const authenticate = require('./authenticate.js')

//app.use(koaBetterBody({fields: 'body'}))

router.post('/login', async ctx => {
	authenticate(ctx)
})

router.get('/customer', jwt, async ctx => {
	ctx.body = customerService.getCustomers()
})

router.get('/customer/:id', async ctx => {
	if (customerService.getCustomer(this.params.id)) {
		ctx.body = customerService.getCustomer(this.params.id)
	} else {
		this.status = 404
		ctx.body = {'error': 'There is no customer with that id'}
	}
})

router.post('/customer', async ctx => {
	this.body = customerService.postCustomer(this.request.body)
})

app.use(router.routes())
//.use(router.allowedMethods())

app.listen(8080)
