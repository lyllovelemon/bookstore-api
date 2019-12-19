const {sequelize}=require('../../core/db')
const {Sequelize,Model}=require('sequelize')
const axios=require('axios')
const util=require('util')
const {Favor}=require('./favor')
class Book extends Model{
    constructor(id){
        super()
        this.id=id
    }
    async detail(){
        const url=util.format(global.config.yushu.detailUrl,id)
        const detail=axios.get(url)
        return detail.data
    }
    //summary 是否展示概要信息 1-概要 2-详细
    static async searchFromYushu(q,start,count,summary=1){
        const url=util.format(global.config.yushu.keywordUrl,encodeURI(q),start,count,summary)
        const result=await axios.get(url)
        return result.data
    }
    static async getMyFavorBookCount(uid){
        const count=await Favor.count({
            where:{
                type:400,
                uid
            }
        })
        return count
    }
    static async getBookFavor(uid,bookId){
        const favorNums=await Favor.count({
            where:{
                art_id:bookId,
                type:400
            }
        })
        const myFavor=await Favor.findOne({
            where:{
                art_id:bookId,
                uid,
                type:400
            }
        })
        return{
            fav_nums:favorNums,
            like_status: myFavor?1:0
        }
    }
}
Book.init({
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    fav_nums:{
        type:Sequelize.INTEGER,
        defaultValue:0
    }
    },{
    sequelize,
    tableName:'book'
})
module.exports={
    Book
}