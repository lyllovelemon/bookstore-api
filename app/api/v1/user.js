const Router=require('koa-router')
const router=new Router({
    prefix:'/v1/user'
});
const {RegisterValidator}=require('../../validators/validator')
//接受参数 参数校验
router.post(`/register`,async (ctx,next)=>{
    const v=new RegisterValidator().validate(ctx)
})
module.exports=router