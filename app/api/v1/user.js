const bcrypt=require("bcryptjs")
const Router=require('koa-router')
const {success}=require('../../lib/helper')

const router=new Router({
    prefix:'/v1/user'
});
const {RegisterValidator}=require('../../validators/validator')
const {User}=require('../../models/user')

//接受参数 参数校验
router.post(`/register`,async (ctx,next)=>{
    const v=await new RegisterValidator().validate(ctx)
    const user={
        email:v.get('body.email'),
        password:v.get('body.password1'),
        nickname:v.get('body.nickname')
    }
    const r=await User.create(user)
    success()


})
module.exports=router