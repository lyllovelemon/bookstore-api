const Koa = require('koa')
const parser=require('koa-bodyparser')
const InitManager=require('./core/init')
const catchError=require('./middlewares/exception')

const app=new Koa();
app.use(catchError)
app.use(parser())
//console.log(process.cwd());//根目录绝对路径

InitManager.initCore(app);
app.listen(3000)


/**
 * 版本号携带策略:
 * 1. http header
 * 2. 陆军
 * 3. 查询参数
 * **/