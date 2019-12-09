//flow查询具体类型js
const {Movie,Sentence,Music}=require('./classic')
class Art {
    static async getData(art_id,type){
        let art=null
        const finder={
            where:{
                id:art_id
            }
        }
        switch (type) {
            case 100:
                art=await Movie.scope('bh').findOne(finder)
                break;
            case 200:
                art=await Music.scope('bh').findOne(finder)
                break;
            case  300:
                art=await Sentence.scope('bh').findOne(finder)
                break;
                //400-book
            case  400:
                break;
            default:
                break;
        }
        return art
    }
}
module.exports={
    Art
}