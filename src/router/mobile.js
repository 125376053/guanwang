const Router = require('koa-router');
const mobile = new Router();

let menu = [
  {name: '首页', href: 'mindex'},
  {name: '产品', href: 'mproduct'},
  {name: '价格', href: 'mprice'},
  {name: '案例', href: 'mcase'},
  {name: '合作', href: 'mjoin'},
  {name: '关于', href: 'mabout'},
]
function routerCreator({name, href}) {
  mobile.get(`/${href}`, async (ctx, next) => {
    await ctx.render(`mobile/${href}`, { title: name, menu: menu});
  });
}
menu.forEach(item => {
  routerCreator(item) 
})
mobile.get('/', ctx => {
  ctx.redirect('mobile/mindex');
})

// 申请体验
mobile.get('/mapply', async ctx => {
    await ctx.render('mobile/mapply')
})

// 案例case
mobile.get('/mhunsha', async ctx => {
    await ctx.render('mobile/mhunsha')
})
mobile.get('/mjiazhuang', async ctx => {
    await ctx.render('mobile/mjiazhuang')
})
mobile.get('/mqiche', async ctx => {
    await ctx.render('mobile/mqiche')
})
mobile.get('/myimei', async ctx => {
    await ctx.render('mobile/myimei')
})
mobile.get('/mbeikang', async ctx => {
    await ctx.render('mobile/mbeikang')
})
mobile.get('/mchanxin', async ctx => {
    await ctx.render('mobile/mchanxin')
})
mobile.get('/mjiaoyu', async ctx => {
    await ctx.render('mobile/mjiaoyu')
})
mobile.get('/myinhang', async ctx => {
    await ctx.render('mobile/myinhang')
})

module.exports = mobile