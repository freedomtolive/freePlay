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
console.log(mime.getType("css"));
console.log(mime.getType("html"));
console.log(mime.getType("text/html"));


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

    sendStaticFn(__dirname+ req.url);

    function sendStaticFn(fileName, headers={"content-Type":"text/html;charset=utf8"} ,statusCode=200){

        if(fs.existsSync(fileName)){
            // 判断文件是否存在，如果存在就输出

            // 获取扩展名，从.后开始截取
            let ext = fileName.substring(fileName.lastIndexOf('.') + 1)

            if(!ext){
                ext = "txt";
            }

            // 根据扩展名输出对应的MIME（利用MIME框架）

            
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
