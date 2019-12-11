const {sequelize}=require('../../core/db')
const {Sequelize,Model,Op}=require('sequelize')
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
        return await sequelize.transaction(async t=>{
            Favor.create({
                art_id,
                type,
                uid
            },{transaction:t})
            const art=await Art.getData(art_id,type,false)
            await art.increment('fav_nums',{by:1,transaction:t})//+1操作
        })
    }
    static async dislike(art_id,type,uid){
        const noFavor=await Favor.findOne({
            where:{
                art_id,
                type,
                uid
            }
        })
        if(!noFavor){
            return new global.errs.DislikeError()
        }
        return await sequelize.transaction(async t=>{
            await noFavor.destroy({
                force:true,//false-软删除 true-硬删除
                transaction:t
            })
            const art=await Art.getData(art_id,type)
            await art.decrement('fav_nums',{by:1,transaction:t})//-1操作
        })
    }
    static async userLikeIt(art_id,type,uid){
        const favor=await Favor.findOne({
            where:{
                uid,
                art_id,
                type
            }
        })
        return !!favor
    }
    static async getMyClassicFavors(uid){
        const arts=await Favor.findAll({
            where:{
                uid,
                type:{
                   [Op.not]:400//排除book
                }
            }
        })
        if(!arts){
            throw new global.errs.NotFound()
        }
        return await Art.getList(arts)
    }
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