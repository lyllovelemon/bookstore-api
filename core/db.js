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
    dialect:'mysql',//指定数据库类型
    host,
    port,
    logging:false,//显示sql操作
    timezone:'+08:00',//时区 北京时间
    define:{
        //create_time update_time delete_time
        timestamps:true,
        paranoid:true,
        // createdAt:'created_at',
        // updateAt:'update_at',
        // deletedAt:'deleted_at',
        underscored:true//驼峰转下划线
    }
})
sequelize.sync({
    force:false
})
module.exports={
    sequelize
}