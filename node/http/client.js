const http = require("http");


/*
    http.ClientRequest 类
    const client = new ClientRequest();
    http.request()
*/

// 创建一个客户端（能发送http请求的）的对象

/**
 *  http协议传输ht（超文本）这样的文本的规则
 *      规定了请求发送的数据格式
 *      规定了返回的数据的格式
 *      传输的规则
 * 
 *  request格式
 *      request Line 请求行
 *      request header 请求头
 *      request body 请求正文
 */
http.request({
    host : "127.0.0.1", //主机
    port : 80,  //端口
    protocol : 'http', //协议


})