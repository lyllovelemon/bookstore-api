const Sequelize=require('sequelize')
const {
    dbName,
    host,
    port,
    user,
    password
}=require('../config/config').database
/**接受四个参数 数据库名  账号 密码  js对象**/


const sequelize=new Sequelize(dbName,user,password,{
    dialecct:'mysql',//指定数据库类型
    host,
    port,
    logging:true,//显示sql操作
    timezone:'+08:00',//时区 北京时间
    define:{

    }
})
module.exports={sequelize}