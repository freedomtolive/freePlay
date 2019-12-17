const http = require("http");

/*
    http.Server 类
    new http.Server()
    http.createServer()
*/

const server = http.createServer();


// 80 默认，约定 给http使用

server.on('request',() => {
    // 有连接请求时，执行该函数
    console.log("有人接收到了请求");
})

// 监听所有网卡
server.listen(80,"0.0.0.0")