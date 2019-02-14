const Router = require('koa-router');
const pc = new Router();
const path = require('path')
const news = require('../dao/news')

let menu = [
    {name: '首页', href: 'index'},
    {name: '产品', href: 'product'},
    {name: '价格', href: 'price'},
    {name: '案例', href: 'case'},
    {name: '合作', href: 'partner'},
    {name: '关于', href: 'about'},
]
function routerCreator({name, href}) {
    pc.get(`/${href}`, async (ctx, next) => {
        await ctx.render(`pc/${href}`, {title: name, menu: menu});
    });
}
pc.get('/', async ctx => {
    // let data=await news.getAll()
    // console.log(data);
    ctx.redirect('pc/index');
})

menu.forEach(item => {
    routerCreator(item)
})


// 案例case
pc.get('/hunsha', async ctx => {
    await ctx.render('pc/hunsha')
})
pc.get('/jiazhuang', async ctx => {
    await ctx.render('pc/jiazhuang')
})
pc.get('/qiche', async ctx => {
    await ctx.render('pc/qiche')
})
pc.get('/yimei', async ctx => {
    await ctx.render('pc/yimei')
})
pc.get('/beikang', async ctx => {
    await ctx.render('pc/beikang')
})
pc.get('/chanxin', async ctx => {
    await ctx.render('pc/chanxin')
})
pc.get('/jiaoyu', async ctx => {
    await ctx.render('pc/jiaoyu')
})
pc.get('/yinhang', async ctx => {
    await ctx.render('pc/yinhang')
})

module.exports = pc
