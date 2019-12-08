const {sequelize}=require('../../core/db')
const {Sequelize,Model}=require('sequelize')
const {Art}=require('../models/art')
class Favor extends Model{
    constructor(){
        super()
    }
    static async like(art_id,type,uid){
        //1.favor表添加记录 2.book/music/sentence/movie表中的fav_nums+1
        const favor=await Favor.findOne({
            where:{
                art_id,
                type,
                uid
            }
        })
        if(favor){
            return new global.errs.LikeError()
        }
        await sequelize.transaction(async t=>{
            Favor.create({
                art_id,
                type,
                uid
            },{transaction:t})
            const art=Art.getData(art_id,type)
            await art.increment('fav_nums',{by:1,transaction:t})//+1操作
        })
    }
    static async dislike(art_id,type,uid){}
}
Favor.init({
    uid:Sequelize.INTEGER,
    art_id:Sequelize.INTEGER,
    type:Sequelize.INTEGER
},{
    sequelize,
    tableName:'favor'
})
module.exports={
    Favor
}