# bookstore-api
基于koa实现的书籍后端api

包括以下主要功能:
+ 路由系统
+ 全局异常处理
+ 自定义校验器
+ jwt令牌认证
## 核心第三方库
[koa-bodyparser](https://www.npmjs.com/package/koa-bodyparser):用于解析请求体 

[koa-static](https://www.npmjs.com/package/koa-static):实现静态资源服务器

[koa-router](https://github.com/ZijianHe/koa-router):koa的路由中间件，支持async/await

[sequelize](https://sequelize.org/v5/):最重要的库之一，实现连接数据库和增删改查的逻辑

[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken):用于jwt令牌加解密
## 路由系统
多个api请求可以用路由。具体代码见app/v1.步骤：
1. 引入koa-router并实例化

2. 编写路由函数

3. 把中间件注册到app上

作用:避免使用if嵌套编写api请求，有利于代码维护性
## 全局异常处理
主要处理请求接口后返回的各种异常，具体代码见middlewares/excpetion.js
## 连接数据库
引入sequelize后，根据官方文档的教程连接数据库。

它支持多种数据库语言，作者使用的是MySQL,具体代码见core/db.js。
```javascript
const {Sequelize}=require('sequelize')
const sequelize=new Sequelize(dbName,user,password,{
    dialect:'mysql',//指定数据库类型
    host,
    port,
    logging:false,//显示sql操作
    timezone:'+08:00',//时区 北京时间
    define:{
        timestamps:true,
        paranoid:true,
        createdAt:'created_at',
        updateAt:'update_at',
        deletedAt:'deleted_at',
        underscored:true,//驼峰转下划线
        freezeTableName:true,
        scopes:{
            bh:{
                attributes:{
                    exclude:['created_at','update_at','deleted_at']
                }
            }
        }
    }
})
```
## 作者
* **lyllovelemon** - *Initial work* - [PurpleBooth](https://github.com/lyllovelemon)