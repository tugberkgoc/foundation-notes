#!/usr/bin/env node

var Koa = require("koa")  
var Router = require("koa-router"); 
var stat = require("koa-static");
var bodyParser = require("koa-bodyparser");
var handlebars = require("koa-hbs-renderer");	

var app = new Koa();
var router = new Router();
app.use(stat ("public"));
app.use(bodyParser());
app.use(handlebars({ paths: { views: __dirname + "/views" } }));
app.use(router.routes());

var port = 8080

const List = require('./modules/list').List
const list = new List()

router.get("/", async function(ctx) {
    try {
        var items = [] // you will need to REPLACE this with a call to the 'list' object!!!
        console.log(items)
        var data = {items}
        ctx.render('home', data);
    } catch(err) {
        console.log(err.message);
        ctx.render('home', {msg: err.message});
    }
});

router.post("/", function(ctx) {
    try {
        var body = ctx.request.body;
        console.log(body)
        // you will need to add a call to the 'list' object!!!		
        ctx.redirect("/"); 
    } catch(err) {
        console.log(err.message);	
        ctx.redirect("/?msg=" + err.message); 
    }
});

router.get("/delete/:key", function(ctx) { 
    try {
        console.log(`key: ${ctx.params.key}`); 
        // you will need to add a call to the 'list' object!!!
        ctx.redirect('/?msg=item deleted');
    } catch(err) {	
        console.log(err.message);
        ctx.redirect("/" + err.message); 
    }
});

module.exports = app.listen(port, function() {
});