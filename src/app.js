const Koa = require('koa');
const app = new Koa();
const path = require('path');
const router = require('./router/router')
const views = require('koa-views');
//koa-static-plus
const koaStatic = require('koa-static');
const logger = require('koa-logger');
//const Router = require('koa-router')

const STATIC_PATH = process.env.NODE_ENV === 'development' ? './static' : '../assets/'

app.listen('8888');
// 注册模板引擎
app.use(views(path.resolve(__dirname, './views'), {
    map: {
        html: 'swig'
    }
}));
//app.use(logger())

// 注册路由
app.use(router.routes()).use(router.allowedMethods())

// 注册静态文件服务
// const test = new Router()
// test.use('/test', koaStatic(path.join(__dirname, STATIC_PATH), {
//   pathPrefix: '/static'
// }))
// app.use(test.routes()).use(test.allowedMethods())

app.use(koaStatic(path.join(__dirname, STATIC_PATH)))

// 匹配不存在的路由时
app.use(async (ctx, next) => {
    if(ctx.status===404){
        console.log(ctx.request.path.search(/mobile/));
        if(ctx.request.path.search(/mobile/)>0){
            console.log('mobile');
            ctx.redirect('/mobile')
        }else if(ctx.request.path.search(/pc/)>0){
            console.log('pc');
            ctx.redirect('/pc')
        }else{
            console.log('pc');
            ctx.redirect('/pc')
        }
    }else{
        await next()
    }
});

console.log('process.env is:', process.env.NODE_ENV)
