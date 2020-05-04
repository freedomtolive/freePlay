const Koa = require("koa");
const Router = require('koa-router');
const koaStaticCache = require('koa-static-cache');
const Swig = require('koa-swig');
const co = require('co');
const bodyParser = require('koa-bodyparser');


const app = new Koa();

app.use( bodyParser({}));

const router = new Router()

/**
 * 存储所有的数据
 * 当前这个数据是存储在服务器运行中的内存中
 */
let datas = {
    maxId: 3,
    appName: 'TodoList',
    skin: 'index.css',
    tasks: [
        {id: 1, title: '测试任务一', done: true},
        {id: 2, title: '学习koa', done: false},
        {id: 3, title: '学习sequelize', done: false}
    ]
};

/**
 * 静态资源
 */
app.use( koaStaticCache( __dirname + '/static' , {
    prefix : '/static',
    gzip : true     
}));

/**
 * 设置模板引擎
 */
app.context.render = co.wrap( Swig({
    root: __dirname + '/views',
    autoescape: true,   //是否html编码，为了安全起见，一般不开启该功能，设置为true
    cache: false,
    // cache: 'memory', //memory : 把解析后的结果保存在内存中，避免每次访问都去解析模板，一般用于线上生成环境
    ext: 'html'
}) );


/**
 * 首页：用于展示清单
 * 
 */
router.get('/',async ctx => {
    ctx.body = await ctx.render('index.html', {
        datas
    });
})

/**
 * 添加数据处理页面：用来通过添加页面提交的数据
 */
// get请求
// router.get('/posttask', ctx => {
//     // 后台接收并处理提交的数据
//     let title = ctx.query.title;
//     ctx.body = '接收提交的页面' + title;
// })

// post请求
router.post('/posttask', ctx => {
    // 后台接收并处理提交的数据
    // koa-bodyparser处理过的post提交的数据会在ctx.request.body中
    let title = ctx.request.body.title;
    ctx.body = '接收提交的页面' + title;
})


/**
 * 添加：用来展示添加任务的页面
 */
router.get('/add',async ctx => {
    ctx.body = await ctx.render('add.html', {
        datas
    });
})


/**
 * 改变状态
 */
router.get('/change/:id',ctx => {
    ctx.body = '/change/' + ctx.params.id;
})

/**
 * 删除
 */
router.get('/remove/:id',ctx => {
    ctx.body = '/remove/' + ctx.params.id;
})



app.use(router.routes());





app.listen(80);
