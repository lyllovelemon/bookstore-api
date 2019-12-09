//flow查询具体类型js
const {Movie,Sentence,Music}=require('./classic')
class Art {
    /**
     * useScope 是否使用全局scope
     * **/
    static async getData(art_id,type,useScope=true){
        let art=null
        const finder={
            where:{
                id:art_id
            }
        }
        const scope=useScope?'bh':null
        switch (type) {
            case 100:
                art=await Movie.scope(scope).findOne(finder)
                break;
            case 200:
                art=await Music.scope(scope).findOne(finder)
                break;
            case  300:
                art=await Sentence.scope(scope).findOne(finder)
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