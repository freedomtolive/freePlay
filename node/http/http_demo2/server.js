const http = require("http");

/*
    http.Server 类
    new http.Server()
    http.createServer()
*/

const server = http.createServer();


// 80 默认，约定 给http使用
/**
 * req,request: 客户端请求对象，保存了与当前这次请求的客户端相关的信息
 *     req.Line 请求行
 *     req.Header 请求头
 *     req.Body 请求正文
 * res，response：服务器输出对象，提供了服务端输出（相应）有关的一些方法
 *     res.Line 响应行
 *     res.Header 响应头
 *     res.Body 响应正文
 */
server.on('request',(req,res) => {  //参数：req请求信息 res响应信息
    // 有连接请求时，执行该函数
    console.log("有人接收到了请求");
    // req本质是net.socket+http协议增加的一些内容
    // console.log(req);
    // req.socket = net.socket
    // console.log(req.socket.remoteAddress);  //打印请求的ip地址
    // console.log(req.url) //打印请求的url（我们可以根据url来判断客户想要什么）

    res.setHeader("content-Type","text/html;charset=utf8") //类型为text/html类型(会解析标签)，如果为text/plain(纯文本)类型(不会解析标签)

    switch(req.url){
        case "/":
            // 设置请求头
            // content-Type 实体头部：用来确定文件的类型，做相应操作
            // content-Length 实体首部：发送内容的大小
            // Location     响应首部：从定向地址
            // cookie       请求首部：包含要发给服务器的cookie
            // set-cookie   响应首部：服务器端向客户端发送cookie

            // writeHead方法参数（状态码，状态码说明，请求头）
            
            res.writeHead(200,"ok",{
                "content-Type":"text/html;charset=utf8"
            });

            res.write("<h1>index</h1>");
        break;
        case "/list":
            res.writeHead(200,"ok",{
                "content-Type":"text/html;charset=utf8"
            });

            res.write("list");
        break;
        case "/view":
            res.writeHead(200,http.STATUS_CODES[200],{
                "content-Type":"text/html;charset=utf8"
            });

            res.write("view");
        break;
        default:
            /**
             * 状态码：
             * 1xx ： 提示信息
             * 2xx ： 成功
             * 3xx ： 重定向
             * 4xx ： 客户端错误
             * 5xx ： 服务器错误
             */
            // 页面不存在
            res.writeHead(404,http.STATUS_CODES[404],{
                "content-Type":"text/html;charset=utf8"
            })

            // 重定向
            // res.writeHead(301,http.STATUS_CODES[301],{
            //     "content-Type":"text/html;charset=utf8",
            //     // 重定向地址
            //     "Location":'http://www.baidu.com'
            // })

            res.write("<h1>页面不存在</h1>");
        break;
    }

    res.end();
})

// 监听所有网卡
server.listen(80,"0.0.0.0")