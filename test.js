//try/catch用于捕获同步异常
//AOP 面向切面编程
/**
 * 异步异常处理:promise, async/await 回调函数
 * **/
function func1() {
    try{
        func2()
    }
    catch (error) {
        throw  error
    }

}
async function func2() {
    try{
       await func3()
    }
    catch (error) {
      //throw  error
        console.log('err:',error)
    }

}
async function func3() {
    return new Promise((resolve,reject)=>{
        setTimeout(function () {
            const r=Math.random();
            if(r<0.5){
                reject('error')
            }
        },1000)
    })
  // await setTimeout( function(){
  //    throw new Error('error')
  // },1000)
}
func1()