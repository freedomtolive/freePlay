const Koa = require("koa");
const Router = require('koa-router');
const koaStaticCache = require('koa-static-cache');
const BodyParser = require('koa-bodyparser');
const fs = require('fs');


let datas = JSON.parse(fs.readFileSync('./data/data.json'));

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

// body 解析
app.use( BodyParser() );

/**
 * 接收响应
 */
const router = new Router();

router.get('/', async ctx => {
    ctx.body = 'hello';
})

router.get('/todos', async ctx =>{
    ctx.body = {
        code: 0,
        data: datas.todos
    };
})

// 切换选中状态
router.post('/toggle', async ctx => {
    // 获取post提交的id值;

    let id = ctx.request.body.id || 0;

    if(!id){
        ctx.body = {
            code: 1,
            data: '请传入id'
        }
    }else{
        let todo = datas.todos.find( todo => todo.id == id);

        todo.done = !todo.done;

        ctx.body = {
            code : 0,
            data : todo
        }
    
        fs.writeFileSync('./data/data.json', JSON.stringify(datas));
    }
})

// 删除
router.post('/remove', async ctx => {
    let id = ctx.request.body.id || 0;
    if(!id){
        ctx.body = {
            code: 1,
            data: '请传入id'
        }
    }else{
        datas.todos = datas.todos.filter( todo => todo.id != id );

        ctx.body = {
            code: 0,
            data: '删除成功'
        }

        fs.writeFileSync('./data/data.json', JSON.stringify(datas));
    }

})


// 添加
router.post('/add', async ctx => {
    // 接受title字段
    let title = ctx.request.body.title || 0;
    if(!title){
        ctx.body = {
            code: 1,
            data: '请传入任务标题'
        }
    }else{
        let newTask = {
            id : ++datas._id,
            title : title
        }
        datas.todos.push(newTask);

        ctx.body = {
            code: 0,
            data: newTask
        }

        fs.writeFileSync('./data/data.json', JSON.stringify(datas));
    }

})

app.use( router.routes() );


app.listen(8888);