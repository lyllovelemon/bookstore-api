const Router=require('koa-router')
const {HotBook}=require('@models/hot-book')
const {Book}=require('@models/book')
const {Comment}=require('@models/book-comment')
const {PositiveIntegerValidator,SearchValidator,addShortCommentValidator}=require('@validator')
const {Auth}=require('../../../middlewares/auth')
const {Favor}=require('@models/favor')
const {success}=require('../../lib/helper')
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
//查找书籍
router.get('/search',async ctx=>{
    const v=await new SearchValidator().validate(ctx)
    const result=await Book.searchFromYushu(v.get('query.q'),v.get('query.start'),v.get('query.count'))
    ctx.body=result
})
//获取我喜欢书籍数量
router.get('/favor/count',new Auth().m,async ctx=>{
  const result=await Book.getMyFavorBookCount(ctx.auth.uid)
    ctx.body=result
})
//获取书籍点赞情况
router.get('/:book_id/favor',new Auth().m,async ctx=>{
    const v=await new PositiveIntegerValidator().validate(ctx, {
        id:'book_id'
        })
    const favor=await Favor.getBookFavor(ctx.auth.uid,v.get('path.book_id'))
    ctx.body=favor

})
//新增短评
router.post('/add/short_comment',new Auth().m,async ctx=>{
    const v=new addShortCommentValidator.validate(ctx,{
        id:'book_id'
    })
    await Comment.addComment(v.get('body.book_id'),v.get('body.content'))
    success()
})
//获取短评
router.get('/:book_id/short_comment',new Auth().m,async ctx=>{
    const v=new PositiveIntegerValidator().validate(ctx,{
        id:'book_id'
    })
    const book=await Comment.getComment(v.get('path.book_id'));
    ctx.body=book
})
//获取热评关键词
router.get('/hot_keyword',new Auth().m,async ctx=>{
    ctx.body= {
        'hot': ['Python','哈利波特','村上春树','东野圭吾','白夜行','韩寒','金庸',
        '王小波']
    }
})
module.exports=router