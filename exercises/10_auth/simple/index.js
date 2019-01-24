
'use strict'

const Router = require('koa-router')
const auth = require('koa-simple-auth')
const koaBody = require('koa-body')()
const router = module.exports = new Router()
 
const catch_api_error = async ctx => {
	try{
		yield next
	} catch(err){
		this.body = JSON.stringify({ 'error': err.message })
	}
}

router.post('/login',
	catch_api_error,
	koaBody,
	auth.login,
	function *() {
		this.body = JSON.stringify({ authenticated: true })
	}
)

router.post('/register', catch_api_error, koaBody, auth.register, function *() {
	this.body = JSON.stringify({ authenticated: true })
})

router.get('/unregister', catch_api_error, koaBody, auth.unregister, function *() {
	this.body = JSON.stringify({ authenticated: false })
})

router.get('/logout', auth.logout, function *() {
	this.body = JSON.stringify({ authenticated: false })
})
