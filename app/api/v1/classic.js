const Router=require('koa-router')
const {Flow}=require('@models/flow')
const {Art}=require('@models/art')
const {Favor}=require('@models/favor')
const router=new Router({
    prefix:'/v1/classic'
});
const {PostiveIntegerValidator}=require('@validator')
const {Auth}=require('../../../middlewares/auth')
//获取最新一期
router.get('/latest',new Auth().m,async (ctx,next)=>{
    const flow=await Flow.findOne({
        order:[
            ['index','DESC']
        ]
    })
    const art=await Art.getData(flow.art_id,flow.type)
    const likeLatest=await Favor.userLikeIt(flow.art_id,flow.type,ctx.auth.uid)
   // art.dataValues.index=flow.index
    art.setDataValue('index',flow.index)
    art.setDataValue('like_status',likeLatest)
    ctx.body=art
});
//获取当前一期的下一期
router.get('/:index/next',new Auth().m,async (ctx,next)=>{
 const v=await new PostiveIntegerValidator().validate(ctx,{
     id:'index'
 })
    const index=v.get('path.index')
    const flow=await Flow.findOne({
        where:{
            index:index+1
        }
    })
    if(!flow){
        return new global.errs.NotFound('不存在下一期')
    }
    let art=await Art.getData(flow.art_id,flow.type)
    let likeNext=await Favor.userLikeIt(flow.art_id,flow.type,ctx.auth.uid)
    // art.dataValues.index=flow.index
    art.setDataValue('index',flow.index)
    art.setDataValue('like_status',likeNext)
    ctx.body=art
})
//获取当前的上一期
router.get('/:index/previous',new Auth().m,async (ctx,next)=>{
    const v=await new PostiveIntegerValidator().validate(ctx,{
        id:'index'
    })
    const index=v.get('path.index')
    const flow=await Flow.findOne({
        where:{
            index:index-1
        }
    })
    if(!flow){
        return new global.errs.NotFound('不存在下一期')
    }
    let art=await Art.getData(flow.art_id,flow.type)
    let likePrevious=await Favor.userLikeIt(flow.art_id,flow.type,ctx.auth.uid)
    // art.dataValues.index=flow.index
    art.setDataValue('index',flow.index)
    art.setDataValue('like_status',likePrevious)
    ctx.body=art
})
module.exports=router