const {sequelize}=require('../../core/db')
const {Sequelize,Model,Op}=require('sequelize')
const {Favor}=require('./favor')

class HotBook extends Model{
    constructor(){
        super()
    }
    static async getAll(){
        const books=await HotBook.findAll({
            order:[
                'index'
            ]
        })
        const ids=[]
        books.forEach((book)=>{
            ids.push(book.id)
        })
        const favors=await Favor.findAll({
            where:{
                art_id:{
                    [Op.in]:ids
                },
            },
            group:['art_id'],
            attributes:['art_id',[Sequelize.fn('COUNT','*'),'count']]
        })
        return favors
    }
}
HotBook.init({
    index:Sequelize.INTEGER,
    title:Sequelize.STRING,
    author:Sequelize.STRING,
    image:Sequelize.STRING
},{
    sequelize,
    tableName:'hot_book'
})
module.exports={
    HotBook
}