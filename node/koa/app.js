const Koa = require('koa');
//静态文件代理服务
const koaStaticCache = require('koa-static-cache');

/*  
    中间件
		- koa-static-cache：静态文件代理服务
		- koa-router：路由
		- koa-swig：模板引擎
		- koa-bodyparser：body解析
        - koa-multer：formData解析




    koa-static-cache：静态文件代理服务
        const koaStaticCache = require('koa-static-cache');
		staticCache(dir [, options] [, files])
			- dir：服务器上存放静态资源的目录
            - options：选项设置
                - prefix：URL前缀，默认是 '.'
                - maxAge：缓存时间，单位毫秒，默认为0
                - gzip：启用gzip压缩传输，默认为true
			- files：合并的文件对象

*/

const app = new Koa();

// 只要有请求通过，则通过koaStaticCache进行处理;
app.use( koaStaticCache( __dirname + '/static' , {
    // root : __dirname + '/static' //与第一个参数效果一样（静态文件路径）
    prefix : '/public',     //如果当前请求的url是以/public开始的,则作为静态资源请求(如果访问的路径是/public，则会自动寻找/static下的静态资源)
}));

app.use((ctx,next) => {
    // 其他业务逻辑(访问静态文件时不执行)
    console.log("111");
    console.log(ctx.URL);

})

app.use( (ctx,next) => {
    console.log("222");
    console.log(ctx.state.n);
    ctx.body += " Hello Koa222";
})



app.on( "error" , err => {
    console.log(err);
})



// 监听当前机器的地址，端口
app.listen(8888);
