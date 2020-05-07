const Koa = require("koa");
const Router = require('koa-router');
const koaStaticCache = require('koa-static-cache');
const Swig = require('koa-swig');
const co = require('co');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

/**
 * 通过服务器请求拿到一个基础页面，后续的内容就不要再通过浏览器发请求获取了
 * 因为通过浏览器发请求就会导致浏览器重新渲染，跳转，新开窗口
 * 
 * 首先通过浏览器拿到一个基础页面
 * 然后在基础页面中写入js，通过js的ajax来发送请求，ajax发送请求并不会直接渲染页面
 * 而是会把获取到的数据存储在ajax对象下
 */


/**
 * 静态资源
 */
app.use( koaStaticCache( __dirname + '/static' , {
    prefix : '/static',
    gzip : true     
}));

/**
 * 接收响应
 */
const router = new Router();

router.get('/', async ctx => {
    ctx.body = 'hello';
})

app.use( router.routes() );


app.listen(8888);