const bcrypt =require("bcryptjs")
const { sequelize}=require('../../core/db')
const {Sequelize,Model} =require('sequelize')

class User extends Model{
    static async verifyEmailPassword(email,plainPassword){
        const user=await User.findOne({
            where:{
                email
            }
        })
        if(!user){
            throw new global.errs.NotFound('账号不存在')
        }
        const correct=bcrypt.compareSync(plainPassword,user.password)
        if(!correct){
            throw  new global.errs.AuthFailed('密码不正确')
        }
        return  user
    }
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
    email:{
        type:Sequelize.STRING(128),
        unique:true
    },
    //观察者模式 ES6 Reflect
    password:{
        type:Sequelize.STRING,
        set(val){
            const salt=bcrypt.genSaltSync(10)
            const psw=bcrypt.hashSync(v.get('body.password1',salt))
            this.setDataValue('password',psw)
        }
    },
    openid:{
        type:Sequelize.STRING(64),
        unique:true//唯一
    },
},{
    sequelize,
    tableName:'user'
})

//数据迁移 使用成本高 SQL
module.exports={User}