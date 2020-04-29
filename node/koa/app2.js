const Koa = require('koa');
//静态文件代理服务
const koaStaticCache = require('koa-static-cache');
// 路由
const Router = require('koa-router');


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
            


    koa-router：路由设置
		- RESTful
            representational state transfer(表象性状态转变)
		- URL
            统一资源定位符
            
            - RESTful的url设计
                使用 http 中的 method 来表述动作
                - RESTful风格的url
                    POST：http://127.0.0.1/user 新增用户
                    GET：http://127.0.0.1/user/1 查询用户
                    DELETE：http://127.0.0.1/user/1 删除用
                - HTTP 中的 method
                    - GET：用来获取资源
                    - POST：新建资源
                    - PUT：更新资源
                    - DELETE：删除资源

*/

const app = new Koa();


// 只要有请求通过，则通过koaStaticCache进行处理;
app.use( koaStaticCache( __dirname + '/static' , {
    // root : __dirname + '/static' //与第一个参数效果一样（静态文件路径）
    prefix : '/public',     //如果当前请求的url是以/public开始的,则作为静态资源请求(如果访问的路径是/public，则会自动寻找/static下的静态资源)
}));


/*app.use((ctx,next) => {
    // 其他业务逻辑(访问静态文件时不执行)
    
    下面的代码其实也是一种路由，只是特别简单，还需要处理很多其他问题
    所以我们就使用一些模板

    console.log(ctx.URL);
    switch(ctx.URL){
        case "/case":

        break;
        case "/user":

        break;
    }
})*/



// 启动路由
const router = new Router()

// 通过get方式发送请求 => http:127.0.0.1/
router.get('/',(ctx,next) => {
    ctx.body = '首页';
})

// router.get('/user',(ctx,next) => {
//     ctx.body = '用户';
// })





// 子路由(1)
const userRouter = new Router();
// 访问地址 http://127.0.0.1:8888/user
userRouter.get('/',(ctx,next) => {
    ctx.body = '用户首页';
})
// 访问地址 http://127.0.0.1:8888/user/address
userRouter.get('/address',(ctx,next) => {
    ctx.body = '用户收货地址';
})
// 把子路由挂载到路由上
router.use('/user',userRouter.routes())





// 子路由(2)
const itemRouter = new Router({
    prefix : "/item"
});
itemRouter.get('/add',(ctx,next) => {
    ctx.body = '添加item';
});
app.use(itemRouter.routes());




// 动态路由
const goodsRouter = new Router();
// :id表示获取匹配值
goodsRouter.get('/goods/:id',(ctx,next) => {
    ctx.body = '获取商品：' + ctx.params.id;




});
app.use(goodsRouter.routes());




// 路由重定向
router.redirect('/admin', '/user', 301);


// url生成器（会生成一个地址）
console.log(Router.url('/list', {page:1}, {query:{order:'desc'}}))



// 把路由对象挂在到app对象中
app.use(router.routes());







app.on( "error" , err => {
    console.log(err);
})


// 监听当前机器的地址，端口
app.listen(8888);
