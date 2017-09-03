"use strict";
const Koa = require('koa');
const koaBody = require('koa-body');
const route = require('koa-route');
const app = new Koa();
const port = process.env.PORT || 5013;
const controllersDir = './controllers';
const products = require(`${controllersDir}/productsController`);
const companies = require(`${controllersDir}/companiesController`);
const errors = require('./constants/errorTypes');
app.use(koaBody());


const setOkCodeAfter = (fn)=>{
    return (async(ctx, ...args)=>{
        await fn(ctx, ...args);
        ctx.status = 200; 
    });
};

const myRoute = {
    get: (url, fn)=>{
        return route.get(url, setOkCodeAfter(fn));
    },
    put: (url, fn)=>{
        return route.put(url, setOkCodeAfter(fn));
    },
    post: (url, fn)=>{
        return route.post(url, setOkCodeAfter(fn));
    },
    delete: (url, fn)=>{
        return route.delete(url, setOkCodeAfter(fn));
    },
    update: (url, fn)=>{
        return route.update(url, setOkCodeAfter(fn));
    },

};


app.use(
async(ctx, next)=> {
    try{
        await next();
        if(!ctx.status){
            ctx.status = 404; //404 if no exception has been thrown and no url matched
        }
    }
    catch(e){
    	let code, msg=null;
    	switch(e.type){
            case errors.DBNOTFOUND:
                code = 404;
                break;
            case errors.DBCONFLICT:
                code = 409;
                break;
            case errors.INVALIDDATA:
                code = 422;
                break;
            default:
                code = 520;
                msg = 'unknown error';
                break;
        }
    	ctx.throw(code, msg ? msg : e.message);
    }
});

app.use(myRoute.get('/products', products.index));
app.use(myRoute.get('/products/:id', products.get));
app.use(myRoute.post('/products', products.add));
app.use(myRoute.delete('/products/:id', products.delete));
app.use(myRoute.put('/products/:id', products.update));
app.use(myRoute.get('/companies', companies.index));
app.use(myRoute.get('/companies/:id', companies.get));
app.use(myRoute.post('/companies', companies.add));
app.use(myRoute.delete('/companies/:id', companies.delete));
app.use(myRoute.put('/companies/:id', companies.update));
app.use(myRoute.get('/companies/:id/products', companies.getProducts));
app.use(myRoute.post('/companies/:compId/products/:prodId', companies.addProduct));
app.use(myRoute.delete('/companies/:compId/products/:prodId', companies.deleteProduct));

app.listen(port);
