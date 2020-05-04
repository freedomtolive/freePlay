const Koa = require("koa");
const Router = require('koa-router');
const Swig = require('koa-swig');
const co = require('co');


const app = new Koa();

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
 * 首页（用于展示清单）
 * 
 */
router.get('/',ctx => {
    ctx.body = '首页';
})

/**
 * 添加
 */
router.get('/add',ctx => {
    ctx.body = '添加';
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


/**
 * 设置模板引擎
 */
app.context.render = co.wrap( Swig({
    root: __dirname + '/views',
    autoescape: true,   //是否html编码，为了安全起见，一般不开启该功能，设置为true
    cache: false,
    // cache: 'memory', //memory : 把解析后的结果保存在内存中，比如每次访问都去解析模板，一般用于线上生成环境
    ext: 'html'
}) );



app.listen(80);
