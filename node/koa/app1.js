const Koa = require('koa');

/*  
    中间件
		- koa-static-cache：静态文件代理服务
		- koa-router：路由
		- koa-swig：模板引擎
		- koa-bodyparser：body解析
        - koa-multer：formData解析
*/




// 创建一个http服务器，监听请求
const app = new Koa();


// 注册中间件
/**
 *  中间件等同于迭代器，只有调用next之后才会执行下一个中间件函数，否则后面函数不执行
    context 对象
			每一次请求都会包装一个context对象
		- next
			每一个中间件都是一个迭代器
		- 异步中间件
			.use(async callback)

 */
app.use( (ctx,next) => {
    /**
     *  ctx 是 context对象
     *  context 对象
     *      - .req：Node 的 request 对象
     *      - .res：Node 的 response 对象
     *      注意：在 Koa 中尽量使用Koa提供的封装对象
     *      - .request：Koa 的 request 对象
     *      - .response：Koa 的 response 对象
     *      - .state：用户数据存储空间(用来存储数据的命名空间)
     *      - .app：当前应用程序实例 - Application 对象
     *      
     *      - .cookies 对象
	 *		- .get(name, [options])
	 *		- .set(name, value, [options])
	 *		- options
	 *			- .maxAge	- .signed
	 *			- .expires	- .path
	 *			- .domain	- .secure
	 *			- .httpOnly	- .overwrite
     *      
     */


    let n = Math.random();
    ctx.state.n = n;
    // console.log("111");
    // ctx.body 和 ctx.response.body相同
    ctx.body = "Hello Koa";
    // 作用：权限控制，判断当前用户是否有权限，如果有权限，再调用next

    // 抛出错误，第一个参数为错误类型，第二个参数为错误信息，刻在app.on中通过err.message获取
    // ctx.throw(404,'页面没了')

    // request（与请求相关的数据）
    // console.log(ctx.request);



    /* response (与响应相关的数据)
     - .body：响应内容
		- .body=：设置响应内容，如果status没有设置，Koa会默认设置status为：200 或者 204，同时 Koa 会根据返回的数据类型自动设置 content-type
			- string：text/html 或 text/plain
			- buffer/Stream：application/octet-stream
            - object：application/json
        - .redirect(url)：重定向，默认重定向状态码为：302，可以通过status进行设置
		- .attachment([filename])：设置下载文件头，filename为下载文件的名称
    */
    // ctx.response.body = {a:1,b:2,c:3}
    
    // 下载附件的头信息 
    // ctx.attachment("a.txt");

    // 迭代器
    // next();
})


app.use( (ctx,next) => {
    console.log("222");
    console.log(ctx.state.n);
    ctx.body += " Hello Koa222";
})

// 异步中间件
// app.use( async(ctx,next) => {
//     console.log("222");
//     ctx.body += " Hello Koa222";
// } )



// 错误处理（监听错误时的函数）
app.on( "error" , err => {
    // 通过err.message可以拿到ctx.throw中的值
    console.log(err);
})



// 监听当前机器的地址，端口
app.listen(80);
