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
    switch(req.url){
        case "/":
            res.write("index");
        break;
        case "/list":
            res.write("list");
        break;
        case "/view":
            res.write("view");
        break;
    }

    res.end();
})

// 监听所有网卡
server.listen(80,"0.0.0.0")