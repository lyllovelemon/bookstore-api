const Router=require('koa-router')
const {HotBook}=require('@models/hot-book')
const {Book}=require('@models/book')
const {PositiveIntegerValidator}=require('@validator')
const router=new Router({
    prefix:'/v1/book'
});

//获取热门书籍
router.get('/hot_list',async(ctx,next)=>{
    const books=await HotBook.getAll()
    ctx.body={
       books
    }
})
//查询书籍详情
router.get('/:id/detail',async(ctx,next)=>{
    const v=await new PositiveIntegerValidator().validate(ctx)
    const book=new Book(v.get('path.id'))
    ctx.body=await book.detail()
})
router.get('/v1/book/latest',(ctx,next)=>{
    ctx.body={key:'book'}
});
module.exports=router