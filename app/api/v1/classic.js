const Router=require('koa-router')
const {Flow}=require('../../models/flow')
const router=new Router({
    prefix:'/v1/classic'
});
const {PostiveIntegerValidator}=require('../../validators/validator')
const {Auth}=require('../../../middlewares/auth')

router.get('/latest',new Auth().m,async (ctx,next)=>{
    const flow=await Flow.findOne({
        order:[
            ['index','DESC']
        ]
    })
    ctx.body=flow
});
module.exports=router