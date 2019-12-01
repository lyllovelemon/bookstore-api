const {HttpException} =require('../core/http-exception')

/**
 * error需要简化,不能直接把错误返回客户端
 * HTTP Status Code
 * message
 * error_code  详细错误 开发者自定义
 * request_url 当前请求的url

 * 已知错误 客户端参数传错 try/catch
 * 未知错误 程序潜在错误 无意识的 不知道出错了
 * **/
const catchError=async (ctx,next)=> {
   try{
      await next()
   }
   catch (error) {
      const isHttpException=error instanceof HttpException
      const isDev=global.config.environment==='dev'
      if(isDev && !isHttpException){
         throw error//开发环境需要错误提示信息 ，生产环境不需要
      }

      //已知错误 有error_code
      if(isHttpException){
         ctx.body={
            msg:error.msg,
            error_code:error.errorCode,//为兼容壹仟python接口，使用下划线命名
            request:`${ctx.method} ${ctx.path}`,
         }
         ctx.status=error.code;
      }
      //未知异常
      else {
         ctx.body={
            msg:'未知异常',
            error_code:999,
            request:`${ctx.method} ${ctx.path}`,
         }
         ctx.status=500
      }
   }
}
module.exports=catchError