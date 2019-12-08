//music sentence movie
const {sequelize}=require('../../core/db')
const {Sequelize,Model}=require('sequelize')
const classicFields={
    image:Sequelize.STRING,
    content:Sequelize.STRING,
    pubdate:Sequelize.DATEONLY,
    fav_nums:Sequelize.INTEGER,
    title:Sequelize.STRING,
    type:Sequelize.TINYINT,
}

class Movie extends Model{
    constructor(){
        super()
    }
}
Movie.init(classicFields,
    {
        sequelize,
        tableName:'movie'
    })
class Sentence extends Model{
    constructor(){
        super()
    }
}
Sentence.init(classicFields,{
    sequelize,
    tableName:'sentence'
})
class Music extends Model{
    constructor(){
        super()
    }
}
const musicFilelds=Object.assign({
    url:Sequelize.STRING
}, classicFields)
Music.init(musicFilelds,{
    sequelize,
    tableName:'music'
})
module.exports={
    Movie,
    Sentence,
    Music
}