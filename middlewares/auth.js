const basicAth=require('basic-auth')
const jwt=require("jsonwebtoken")
class Auth {
    constructor(level){
        this.level=level||1
        Auth.USER=8
        Auth.ADMIN=16
        Auth.SUPER_ADMIN=32
    }
    get m(){
        return async (ctx,next)=>{
            const userToken=basicAth(ctx.req)
            let errMsg='token不合法'
            //token检测 用于需要权限的api
            //HTTP 身份验证机制  HTTPBasicAuth
            if(!userToken||!userToken.name){
                throw new global.errs.Forbidden(errMsg)
            }
            try{
                var decode=jwt.verify(userToken.name,global.config.security.secretKey,)
            }
            catch (error) {
                //1.token不合法
                //2.token已过期
                if(error.name==='TokenExpiredError'){
                   errMsg= 'token令牌已过期'
                }
               throw new global.errs.Forbidden(errMsg)

            }
            if(decode.scope<this.level){
                errMsg='权限不足'
                throw new global.errs.Forbidden(errMsg)
            }
            // ctx.body=token
            ctx.auth={
                uid:decode.uid,
                scope:decode.scope
            }
            await next()
        }
    }
}
module.exports={
    Auth
}