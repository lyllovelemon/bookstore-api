const Router=require('koa-router')
const router=new Router({
    prefix:'/v1/classic'
});
const {PostiveIntegerValidator}=require('../../validators/validator')
const {Auth}=require('../../../middlewares/auth')

router.get('/latest',new Auth(9).m,async (ctx,next)=>{
    ctx.body=ctx.auth.uid
});
module.exports=router