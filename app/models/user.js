const { sequelize}=require('../../core/db')
const {Sequelize,Model} =require('sequelize')

class User extends Model{
    constructor(){
        super()
    }
}
User.init({
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,//设置为主键,主键不能重复 不能为空
        autoIncrement:true,//自增长
    },
    nickname:Sequelize.STRING,
    email:Sequelize.STRING,
    password:Sequelize.STRING,
    openid:{
        type:Sequelize.STRING(64),
        unique:true//唯一
    },
},{
    sequelize,
    tableName:'user'
})

//数据迁移 使用成本高 SQL
