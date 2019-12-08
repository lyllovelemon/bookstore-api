const Router=require('koa-router')
const router=new Router({
    prefix:'/v1/like'
})
const {Auth}=require('../../../middlewares/auth')
const {LikeValidator}=require('../../validators/validator')
const {Favor}=require('../../models/favor')
const {success}=require('../../lib/helper')
router.post('/',new Auth(),async ctx=>{
    const v=await new LikeValidator().validate(ctx)
    const like=await Favor.like(v.get('body.art_id'), v.get('body.type'),ctx.auth.uid)
    success()
})

module.exports=router