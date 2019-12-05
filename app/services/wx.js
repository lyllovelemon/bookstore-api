const util=require('util')
const axios=require('axios')
const {User}=require('../models/user')
const {generateToken}=require('../../core/util')
const {Auth}=require('../../middlewares/auth')
class WxManager {
    static async codeToToken(code){
        //需要 code appId appSecret三个参数
        const url=util.format(global.config.wx.loginUrl,global.config.wx.appId,global.config.wx.appSecret,
            code)
        const result=await axios.get(url)
        if(result.status!==200){
            throw new global.errs.AuthFailed('openId获取失败')
        }
        const errCode=result.data.errcode
        if(errCode!==0){
            throw new global.errs.AuthFailed('openId获取失败'+errCode)
        }
        let user=await User.getUserByOpenid(result.data.openid)
        if(!user){
            user=User.registerByOpenid(result.data.openid)
        }
        return generateToken(user.id,Auth.USER)
    }
}
module.exports={
    WxManager
}