function isThisType(val) {
 for(let key in this){
     if(this[key]===val){
         return true
     }
     return  false
 }
}

//模拟枚举
const LoginType={
    USER_MINI_PROGRAM:100,//小程序登陆
    USER_EMAIL:101,//邮箱登陆
    USER_MOBILE:102,//手机号登陆
    ADMIN_EMAIL:200,
    isThisType
}
module.exports={
    LoginType
}