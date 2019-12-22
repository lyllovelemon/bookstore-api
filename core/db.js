const {Sequelize,Model}=require('sequelize')
const {unset,clone,isArray}=require('lodash')
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
        createdAt:'created_at',
        updateAt:'update_at',
        deletedAt:'deleted_at',
        underscored:true,//驼峰转下划线
        freezeTableName:true,
        scopes:{
            bh:{
                attributes:{
                    exclude:['created_at','update_at','deleted_at']
                }
            }
        }
    }
})

Model.prototype.toJson=function(){
    let data=clone(this.dataValues)//浅拷贝
    unset(data,'updated_at')
    unset(data,'created_at')
    unset(data,'deleted_at')
    if(isArray(this.exclude)){
        this.exclude.forEach((value)=>{
            unset(data,value)
        })
    }
    return data
}
sequelize.sync({
    force:false
})
module.exports={
    sequelize
}