/**
 * 后端入口文件
 * 
 * web sever
 *      提供web浏览器服务的工具
 * 
 */

const http = require("http");
const fs = require("fs");
const Mime= require("./libs/Mime");

// 处理文件
let mime = new Mime();
//测试框架
// console.log(mime.getType("css"));
// console.log(mime.getType("html"));
// console.log(mime.getExtension("text/html"));

// 动态数据
let users = [
    {
        name: 'Reci',
        gender: '女',
        skills: ['产品','设计','程序','运维','客服','前台','行政']
    },
    {
        name: 'Kimoo',
        gender: '男',
        skills: ['烹饪', '门卫', '保安']
    },
    {
        name: 'zMouse',
        gender: '男',
        skills: ['招财']
    }
];

const app = http.createServer((req,res) => {
    // 当有用户请求时所触发的函数
    console.log("有人请求了")

    /**
     *  服务端必须对客户的每一次请求做做处理，否则就会出问题
     *      下面的处理方式有问题：
     *          1. 结构代码在node当中，处理和维护过于复杂
     *          2. 每一个文件都需要单独做处理，会特别麻烦
     * 
     */

    //  静态资源与动态资源分开处理，静态资源用fs模块直接读取文件,返回给客户端

    /**
     * 我们直接让用户访问对应的文件/static/index.html
     * 用户在url后所带的路径，我们直接把他关联到服务器本地的目录中
     * 
     */

    let content = "";

    /**
     *  把动态与静态资源区分（通过url进行区分）
     *      约定：以/static开头的部分都算是静态资源，我们约定把静态文件都放在static文件下
     */

    if(req.url.startsWith("/static")){
        // 静态资源
        sendStaticFn(__dirname+ req.url);
    }else{
        // 动态资源（接口）
        switch(req.url){
            case '/user':
                res.writeHead(200, http.STATUS_CODES[200], {
                    'Content-Type': 'application/json;charset=utf-8'
                });

                let data = users.map( user => user.name );

                res.end(JSON.stringify(data));
                break;
            break;

            case '/getbaidu':
                //代理（前台调百度数据会有跨域，但是代理给node，用node进行百度请求就不会有跨域（后台无跨域））
                const r = http.request({
                    host: 'www.baidu.com'
                }, function(badiuRes) {
                    let data = '';
                    badiuRes.on('data', (chunk) => {
                        // 处理信息
                        data += chunk.toString();
                    });
                    // 把获取到的信息返回给前台
                    badiuRes.on('end', () => {
                        // console.log('响应中已无数据。');
                        res.end(data);
                    });
                });
                r.end();
                break;
        }
    }


    function sendStaticFn(fileName, headers={"Content-Type":"text/html;charset=utf8"} ,statusCode=200){

        if(fs.existsSync(fileName)){
            // 判断文件是否存在，如果存在就输出

            // 获取扩展名，从.后开始截取
            let ext = fileName.substring(fileName.lastIndexOf('.') + 1)

            if(!ext){
                ext = "txt";
            }

            // 根据扩展名输出对应的MIME（利用MIME框架）文件类型
            headers['Content-Type'] = mime.getType(ext);


            
            res.writeHead(statusCode,http.STATUS_CODES[statusCode],headers);
            content = fs.readFileSync(fileName);
            res.end(content);

        }else{
            // 如果不存在
            sendStaticFn(__dirname+ '/static/404.html', null, 404);
        }

    }

})

/**
 * 指定监听的端口及网络
 * app,listen("80" , '0.0.0.0')
 */

app.listen("80" , '0.0.0.0',() => {
    console.log("服务器经启动~");
})
