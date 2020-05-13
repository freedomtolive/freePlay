(async function(){
    const koa = require("koa");
    const koaStaticCache = require('koa-static-cache');
    const Router = require('koa-router');
    const Bodyparser = require('koa-bodyparser');
    const mysql = require('mysql2/promise');

    const app = new koa();

    app.use( koaStaticCache( __dirname + '/static' , {
        prefix : '/static',   
        gzip : true
    }));

    app.use( Bodyparser() );
    
    const connection = await mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'node_sql'
    });

    const router = new Router();

    router.get('/todos', async ctx => {
        // ctx.body = {
        //     code : 0,
        //     data : [{id: 1, title: '学习node', done: true},
        //     {id: 2, title: '学习koa', done: true},
        //     {id: 3, title: '学习mysql', done: false}]
        // };

        const [data] = await connection.query("SELECT id,title,done FROM todos ORDER BY done DESC");

        ctx.body = {
            code: 0,
            data
        }
    });

    router.post('/add', async ctx => {
        const  title = ctx.request.body.title || '';

        if (title == '') {
            ctx.body = {
                code: 1,
                data: 'title不能为空'
            }
            return;
        }

        // 添加数据
        const [rs] = await connection.query("INSERT INTO todos (title, done) VALUES ('"+ title +"', 0)");

        // 如果rs.affectedRows > 0，添加成功，否则失败
        if (rs.affectedRows > 0) {
            ctx.body = {
                code: 0,
                data: '添加成功'
            }
        } else {
            ctx.body = {
                code: 2,
                data: '添加失败'
            }
        }
        
    });

    app.use( router.routes() );


    app.listen(8888)
})()