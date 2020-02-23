const http = require("http");
const fs = require("fs");
const client = http.request({
    //tcp
    host : "127.0.0.1", //主机（给百度发送信息）
    port : 80,  //端口

    // http
    protocol: 'http:',
    method: 'get',
    path: '/list'
}, res => {
    //新建一个buffer对象用来存储数据
    let content = Buffer.alloc(0);

    res.on('data', data => {
        content = Buffer.concat([content, data], content.length + data.length);
    })

    res.on('end', () => {
        console.log(content.toString());
    });
})


// 请求的发送需要调用下面的方法
client.write('abcbcbc');
client.end();