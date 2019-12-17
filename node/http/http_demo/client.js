const http = require("http");
const fs = require("fs");

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
const client = http.request({
    //tcp
    host : "www.baidu.com", //主机
    port : 80,  //端口

    // http
    protocol: 'http:',
    method: 'get',
    // path: '/'
    path: '/img/bd_logo1.png'
}, res => {
    //新建一个buffer对象用来存储数据
    let content = Buffer.alloc(0);

    res.on('data', data => {
        //将接收到的数据拼接起来，组成一个完整数据，解决数据传输中的分包问题
        content = Buffer.concat([content, data], content.length + data.length);
        // console.log(data.toString());
    })

    res.on('end', () => {
        // 拼接完成后利用fs模块新建页面
        // fs.writeFileSync('./baidu.html', content);
        // 新建图片
        fs.writeFileSync('./baidu.png', content);
    });
})


// 请求的发送需要调用下面的方法
client.write('');
client.end();