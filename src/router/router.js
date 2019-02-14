const Router = require('koa-router');
const router = new Router();
const views = require('koa-views');
// const data = require('../dao/news')
const pcRouter = require('./pc')
const mobileRouter = require('./mobile')

console.log(pcRouter.routes())


router.use('/pc', pcRouter.routes(), pcRouter.allowedMethods()) 
router.use('/mobile', mobileRouter.routes(), mobileRouter.allowedMethods())

module.exports = router;