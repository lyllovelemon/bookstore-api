//flow查询具体类型js

const {Movie,Sentence,Music}=require('./classic')
const {Op}=require('sequelize')
const {flatten}=require('lodash')
class Art {
    constructor(art_id,type){
        this.art_id=art_id
        this.type=type
    }
    async getDetail(uid){
        const {Favor}=require('./favor')
        const art=await Art.getData(this.art_id,this.type)//获取fav_nums
        if(!art){
            throw new global.errs.NotFound()
        }

        let like=await Favor.userLikeIt(this.art_id,this.type,uid)//获取like_status
        art.setDataValue('like_status',like)
        return  {
            art,
            like_status:like
        }
    }
    static async getList(artInfoList){
        const artInfoObj={
            100:[],
            200:[],
            300:[]
        }
        for(let artInfo of artInfoList){
            //artInfo.type  artInfo.art_id
            artInfoObj[artInfo.type].push(artInfo.art_id)
        }
        let arts=[]
        for(let key in artInfoObj){
            const ids=artInfoObj[key]
            if(ids.length===0){
                continue
            }
            key=parseInt(key)
            arts.push(await Art._getListByType(artInfoObj[key],key))
        }
        return flatten(arts)
    }
    static async _getListByType(ids,type){
        let arts=null
        const finder={
            where:{
                id:{
                    [Op.in]:ids
                }
            }
        }
        const scope='bh'
        switch (type) {
            case 100:
                arts=await Movie.scope(scope).findAll(finder)
                break;
            case 200:
                arts=await Music.scope(scope).findAll(finder)
                break;
            case  300:
                arts=await Sentence.scope(scope).findAll(finder)
                break;
            //400-book
            case  400:
                break;
            default:
                break;
        }
        return arts
    }
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
                const {Book}=require('./book')
                art=await  Book.scope(scope).findOne(finder)
                if(!art){
                    art=await Book.create({
                        id:art_id
                    })
                }
                break;
            default:
                break;
        }
        if(art&&art.image){
            let imgUrl=art.dataValues.image
            art.dataValues.image=global.config.host+imgUrl
        }
        return art
    }
}
module.exports={
    Art
}