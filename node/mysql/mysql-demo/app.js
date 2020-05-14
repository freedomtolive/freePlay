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

        // 按照是否完成倒序排，按照id值倒序排（从大到小）
        // const [data] = await connection.query("SELECT id,title,done FROM todos ORDER BY done DESC, id DESC");


        /**
         * 排序
         * ORDER BY
         * 
         * 
         * 查询数量限制
         * LIMIT - top 10
         * 查询偏移
         * OFFSET
         * 
         * 分页:
         *  把一定的数据按照每页固定的条数去显示，我们需要首先定义每页显示多少
         * 
         * 每页显示3条
         *  1 : 0 - 2
         *  2 : 3 - 5
         *  3 : 6 - 8
         * 每页显示 -> LIMIT
         * 当前的页码 -> OFFSET
         * 
         * 如果页码从1开始算，那么对应的记录应该    LIMIT 3 OFFSET (页码-1 * 3)
         * 
         * 总页码
         */


        // 只查询两条数据（只展示两条并且根据id倒序排序）
        // const [data] = await connection.query("SELECT id,title,done FROM todos ORDER BY id DESC LIMIT 2");

        
        // 查询3条数据，并且从第(page - 1) * 3开始查询（分页的基本原理）
        const page = 1; //第几页
        const prepage = 4; //每页显示几条
        const [todos] = await connection.query(`SELECT id,title,done FROM todos ORDER BY id DESC LIMIT ${prepage} OFFSET ${(page - 1) * prepage}`) ;

        ctx.body = {
            code: 0,
            data : {
                page,
                prepage,
                todos
            }
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