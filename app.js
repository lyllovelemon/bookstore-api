require('module-alias/register')

const Koa = require('koa')
const parser=require('koa-bodyparser')
const InitManager=require('./core/init')
const catchError=require('./middlewares/exception')
const static=require('koa-static')
const path=require('path')

const app=new Koa();
app.use(catchError)
app.use(parser())
app.use(static(path.join(__dirname,'./static')))
//console.log(process.cwd());//根目录绝对路径

InitManager.initCore(app);
app.listen(3000)


/**
 * 版本号携带策略:
 * 1. http header
 * 2. 路径
 * 3. 查询参数
 * **/