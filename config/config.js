module.exports={
    environment:'dev',//或 prod
    database:{
        dbName:'island',
        host:'localhost',
        port:3306,
        user:'root',
        password:''
    },
    security:{
        secretKey:'fgdhgdfhafsfasf',
        expiresIn:60*60*24*30//一个月
    },
    wx:{
        appId:'grrewhye',
        appSecret:'',
        loginUrl:' https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code',

    }
}