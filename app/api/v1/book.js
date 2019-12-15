const Router=require('koa-router')
const {HotBook}=require('@models/hot-book')
const router=new Router();

//获取热门书籍
router.get('/v1/book/hot_list',async(ctx,next)=>{
    const favors=await HotBook.getAll()
    ctx.body={
        books:favors
    }
})
router.get('/v1/book/latest',(ctx,next)=>{
    ctx.body={key:'book'}
});
module.exports=router