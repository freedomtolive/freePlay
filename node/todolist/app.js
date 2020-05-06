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
 *  
 *  注意：
 *      querystring与当前请求的方式是没有关系的，无论是get还是post，querystring一样
 *      都可以传递数据，querystring与get没有任何一毛钱的关系
 * 
 *      get 方式请求不能操作正文
 *      let title_1 = ctx.query.title;
 * 
 */
// get请求
// router.get('/posttask', ctx => {
//     // 后台接收并处理提交的数据
//     let title = ctx.query.title;
//     ctx.body = '接收提交的页面' + title;
// })

// post请求
router.post('/posttask',async ctx => {
    // 后台接收并处理提交的数据
    // koa-bodyparser处理过的post提交的数据会在ctx.request.body中
    let title = ctx.request.body.title || "";
    // ctx.body = '接收提交的页面' + title;

    // 如果标题不存在，渲染失败的模板
    if (!title) {
        ctx.body = await ctx.render('message', {
            msg: '请输入任务标题',
            href: 'javascript:history.back();'
        });
        return;
    }

    // 添加数据
    datas.tasks.push({
        id: ++datas.maxId,
        title: ctx.request.body.title,
        done: false
    });

    // 渲染添加成功的模板
    ctx.body = await ctx.render('message', {
        msg: '添加成功',
        href: '/'
    });
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
router.get('/change/:id',async ctx => {
    // ctx.body = '/change/' + ctx.params.id;

    let id = ctx.params.id;
    datas.tasks.forEach( task => {
        if(task.id == id){
            task.done = !task.done       
        } 

        ctx.response.redirect('/');
    })
})

/**
 * 删除
 */
router.get('/remove/:id',async ctx => {
    // ctx.body = '/remove/' + ctx.params.id;

    let id = ctx.params.id;
    datas.tasks = datas.tasks.filter( task => id != task.id )
    
    ctx.body = await ctx.render('message', {
        msg: '删除成功',
        href: '/'
    })
})



app.use(router.routes());





app.listen(8888);
