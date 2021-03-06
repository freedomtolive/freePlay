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
         * 
         * 
         */


        // 只查询两条数据（只展示两条并且根据id倒序排序）
        // const [data] = await connection.query("SELECT id,title,done FROM todos ORDER BY id DESC LIMIT 2");

        
        // 查询3条数据，并且从第(page - 1) * 3开始查询（分页的基本原理）
        // 接受参数（通过query传参的方式）
        let page = ctx.query.page || 1; //第几页
        let prepage = ctx.query.prepage || 4; //每页显示几条
        let type = ctx.query.type; //已完成未完成查询
        let where = "";
        // 如果type值存在，则拼where语句
        if(type){
            // WHERE 条件选择
            where = 'WHERE done=' + type;
        }

        let sql = `SELECT id,title,done FROM todos ${where}`;
        let [todosAll] = await connection.query(sql); //总页码数
        let pages = Math.ceil(todosAll.length / prepage);

        const sql2 = `SELECT id,title,done FROM todos ${where} ORDER BY id DESC LIMIT ${prepage} OFFSET ${(page - 1) * prepage}`;
        const [todos] = await connection.query(sql2);


        ctx.body = {
            code: 0,
            data : {
                page,
                prepage,
                pages,
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

    router.post('/toggle', async ctx=> {
        const  id = Number(ctx.request.body.id) || 0;
        const  todo = Number(ctx.request.body.todo) || 0;

         /**
         * 
         * 查询参数占位符
         *   WHERE ??=?  :  ?? 表示字段或表名，? 表示值
         * 
         */
        // 修改该id值得done字段
        let sql = "UPDATE todos SET ??=? WHERE ??=?";
        let [rs] = await connection.query(sql, ['done', todo, 'id', id]);
     

        if (rs.affectedRows > 0) {
            ctx.body = {
                code: 0,
                data: '修改成功'
            }
        } else {
            ctx.body = {
                code: 2,
                data: '修改失败'
            }
        }


    })

    router.post('/remove', async ctx => {
        const id = Number(ctx.request.body.id)  || 0;
        // 删除语句
        let sql = "DELETE FROM todos WHERE ??=?";
        let [rs] = await connection.query(sql, ['id', id]);

        if (rs.affectedRows > 0) {
            ctx.body = {
                code: 0,
                data: '删除成功'
            }
        } else {
            ctx.body = {
                code: 2,
                data: '删除失败'
            }
        }
    })

    app.use( router.routes() );


    app.listen(8888)
})()