const Router=require('koa-router')
const {TokenValidator, NotEmptyValidator}=require('../../validators/validator')
const {LoginType}=require('../../lib/enum')
const {User}=require('../../models/user')
const {generateToken}=require('../../../core/util')
const {Auth}=require('../../../middlewares/auth')
const { WxManager}=require('../../services/wx')
const router=new Router({
    prefix:'/v1/token'
})
router.post('/',async(ctx)=>{
    const v=await new TokenValidator().validate(ctx)
    let token
    switch(v.get('body.type')){
        case LoginType.USER_EMAIL:
            token=await emailLogin(v.get('body.account'),v.get('body.secret'))
            break;
        case LoginType.USER_MINI_PROGRAM:
            token=await WxManager.codeToToken(v.get('body.account'))
            break;
        case LoginType.ADMIN_EMAIL:
            break;
        case  LoginType.USER_MOBILE:
            break;
        default:
            throw new global.errs.ParameterException('没有相应的处理函数')
    }
})
router.post('/verify',async (ctx)=>{
const v=await new NotEmptyValidator().validate(ctx)
    const result=Auth.verifyToken(v.get('body.token'))
    ctx.body={
        result:true
    }
})
async function emailLogin(account,secret){
    //比对账号密码是否和数据库的账号密码相同
    const user=await User.verifyEmailPassword(account,secret)
    return generateToken(user.id,Auth.USER)
}
module.exports=router