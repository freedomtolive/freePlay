const Koa = require('koa');
//静态文件代理服务
const koaStaticCache = require('koa-static-cache');
// 路由
const Router = require('koa-router');
// 模板引擎
const Swig = require('koa-swig');
const co = require('co');


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

    koa-swig：模板引擎
        安装使用
            npm i koa-swig
            const Swig = require('koa-swig')
            const render = Swig(options)
        加载 co 模块
            koa v2.x 需要使用 co 函数
            npm i co
            const co = require('co')
        把渲染方法挂载到 Context 下
            app.context.render = co.wrap( render(opts) )		
            opts:
                - root: 模板存放目录
                - autoescape：是否自动 escape 编码
                - cache：是否启用缓存
                - ext：模板后缀，'html'

        模板语法
            输出：{{表达式}}
            判断
                {% if 条件 %}{% endif %}
                {% if 条件 %}{%elseif 条件%}{% endif %}
                {% if 条件 %} {%else%}{% endif %}
            循环
                {% for x in y %}{% endfor %}
                {%for key, val in data%}
			内置变量
				loop.index：从1计算
				loop.index0：从0计算
                loop.length：长度
            继承
                {% extends "base.html" %}
                {% block name %}{% endblock %}
                类似类的方法，子模板可以重写
            包含导入
			    {% include 'widget.html' %}
            变量设置与传参
                {% set name = 'zMouse' %}
                {% include 'widget.html' with name %}
                在使用 include 的模板中可以使用 name


    koa-bodyparser：body解析、数据提交
	安装
		npm i koa-bodyparser
	使用
		const bodyParser = require('koa-bodyparser')
		app.use( bodyParser([opts]) )
            该中间件会在解析来自正文的数据以后，把解析后的数据挂载在ctx.request.body下面
            
            opts
                - enableTypes: 允许解析的类型，['json', 'form']
                - encoding：编码，默认 utf-8
                - formLimit：urlencode 编码类型数据的最大size，默认 56kb
                - jsonLimit：json 格式数据最大size，默认 1mb
                - textLimit：文本格式数据最大size，默认 1mb
                - strict：是否是严格默认，json只接受数组和对

*/


// 数据
let users = [
    {username: 'mt'},
    {username: 'reci'},
    {username: 'kimoo'},
    {username: 'zMouse'}
];

const app = new Koa();



// 只要有请求通过，则通过koaStaticCache进行处理;
app.use( koaStaticCache( __dirname + '/static' , {
    prefix : '/public',     //如果当前请求的url是以/public开始的,则作为静态资源请求(如果访问的路径是/public，则会自动寻找/static下的静态资源)
}));




// 启动路由
const router = new Router()


// 模板引擎
const render = Swig({
    root : __dirname + '/views',
    autoescape: true,
    cache: false,   //缓存
    // cache: "memory",   //memory : 把解析后的结果保存在内存中，避免每次访问都去解析模板，一般用于线上生成环境
    ext: '.html'    //后缀
})
// 把render函数绑定在app上
app.context.render = co.wrap(render);


// 通过get方式发送请求 => http:127.0.0.1/
// 异步操作
router.get('/list',async (ctx,next) => {
    // 用模板引擎(第一个参数为模板页面，第二个参数为要代入页面的数据);
    ctx.body = await ctx.render('list.html', {
        users
    });
})



// 把路由对象挂在到app对象中
app.use(router.routes());





app.on( "error" , err => {
    console.log(err);
})



// 监听当前机器的地址，端口
app.listen(8888);
