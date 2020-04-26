const Koa = require('koa');



// 创建一个http服务器，监听请求
const app = new Koa();


// 注册中间件
// 中间件等同于迭代器，只有调用next之后才会执行下一个中间件函数，否则后面函数不执行
app.use( (ctx,next) => {
    console.log("111");
    ctx.body = "Hello Koa";
    // 作用：权限控制，判断当前用户是否有权限，如果有权限，再调用next
    next();
} )


app.use( (ctx,next) => {
    console.log("222");
    ctx.body = "Hello Koa222";
} )

// 监听当前机器的地址，端口
app.listen(80);
