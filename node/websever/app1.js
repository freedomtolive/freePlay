/**
 * 后端入口文件
 * 
 * web sever
 *      提供web浏览器服务的工具
 * 
 */

const http = require("http");
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

    switch(req.url){
        case "/":
            res.write(`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                <link rel="stylesheet" href="/index.css">    
            </head>
            <body>
                <h1>home</h1>
            </body>
            </html>`);
            res.end();
        break;
        case "/list":
            res.write("list");
            res.end();
        break;
        case "/view":
            res.write("view");
            res.end();
        break;
        case "/index.css":
            res.writeHead(200,http.STATUS_CODES[200],{
                "content-Type":"text/css;charset=utf8"
            });
            res.write("body{color:red;}");
            res.end();
        break;
        default:
            // 头信息在write、end之前调用，否则无效（头信息的设置必须早与内容的发送）

            res.writeHead(404,http.STATUS_CODES[404],{
                "content-Type":"text/html;charset=utf8"
            });

            res.write("<h1>页面不存在</h1>");
            res.end();
        break;
    }


})

/**
 * 指定监听的端口及网络
 * app,listen("80" , '0.0.0.0')
 */

app.listen("80" , '0.0.0.0',() => {
    console.log("服务器经启动~");
})
