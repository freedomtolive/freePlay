/**
 * 后端入口文件
 * 
 * web sever
 *      提供web浏览器服务的工具
 * 
 */

const http = require("http");
const fs = require("fs");
const app = http.createServer((req,res) => {
    // 当有用户请求时所触发的函数
    console.log("有人请求了")

    /**
     * req:
     *      IncomingMessage对象（提供了访问http请求相关数据的接口）
     *      参数：
     *          http.Version http的版本
     *          .method 请求使用的方法
     *          .socket 与当前连接相关的net.Socket对象
     *          等其他参数
     * res：
     *      
     */

    // 像客户端发送数据需要用到res对象
    // res.write();
    // end方法中传参会自动调用write方法;
    // res.end("hello");


    /**
     *  我们需要根据不同的url返回对应的数据
     *      获取url地址: req.url
     *      
     * 
     * */ 

    /** 设置并写入头信息
     *   res.writeHead(状态码，状态码描述，头信息)
     * 
     *   res.writeHead(200,http.STATUS_CODES[200],{
     *       "content-Type":"text/html;charset=utf8"
     *   });
     *
     *  设置头信息
     *  res.setHeader(头信息名称，值)
     * 
     *  头信息设置需要注意的问题：
     *      头信息的写入设置必须在res的weite、end之前
     *
     * */ 


    /**
     *  服务端必须对客户的每一次请求做做处理，否则就会出问题
     *      下面的处理方式有问题：
     *          1. 结构代码在node当中，处理和维护过于复杂
     *          2. 每一个文件都需要单独做处理，会特别麻烦
     * 
     */

    //  静态资源与动态资源分开处理，静态资源用fs模块直接读取文件,返回给客户端

    let content = "";

    switch(req.url){
        case "/":
            sendStaticFn(__dirname+ '/static/index.html');
        break;
        case "/list":
            sendStaticFn(__dirname+ '/static/list.html');
        break;
        case "/view":
            sendStaticFn(__dirname+ '/static/view.html');
        break;
        case "/index.css":
            sendStaticFn(__dirname+ '/static/index.css',{"content-Type":"text/css;charset=utf8"});
            res.end();
        break;
        default:
            // 头信息在write、end之前调用，否则无效（头信息的设置必须早与内容的发送）

           
            sendStaticFn(__dirname+ '/static/404.html', null, 404);
        break;
    }

    function sendStaticFn(fileName, headers={"content-Type":"text/html;charset=utf8"} ,statusCode=200){
        res.writeHead(statusCode,http.STATUS_CODES[statusCode],headers);
        content = fs.readFileSync(fileName);
        res.end(content);
    }

})

/**
 * 指定监听的端口及网络
 * app,listen("80" , '0.0.0.0')
 */

app.listen("80" , '0.0.0.0',() => {
    console.log("服务器经启动~");
})
