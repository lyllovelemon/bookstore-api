const Router=require('koa-router')
const router=new Router();
const {PostiveIntegerValidator}=require('../../validators/validator')
router.post('/v1/:id/classic/latest',(ctx,next)=>{
    const path=ctx.param
    const query=ctx.request.query
    const header=ctx.request.header
    const body=ctx.request.body
    const v=new PostiveIntegerValidator();
    v.validate(ctx)
    const id=v.get('path.id',parsed=false)
    // if(!query){
    //     const error=new global.errs.ParameterException()
    //     error.requestUrl=`${ctx.method} ${ctx.path}`
    //     throw error
    // }
    ctx.body={
        key:'classic'
    }
    throw new Error('API Exception')
});
module.exports=router