const net = require('net');


/**
 * 创建客户端
 *  net.Socket 类
 * 
 *  1. new net.Socket()
 *  2. net.createConnection()
 */

 // 要连接的目标主机的地址以及端口号
 const clientSocket = net.createConnection(12345, '192.168.1.102');

//  发送数据
clientSocket.write('hello');

// 监听数据传输
clientSocket.on('data', data => {
    // console.log('服务器返回：', data.toString());

    clientSocket.write('get money');

    clientSocket.write('getPic');

    console.log( '数据：', data );

    // 拼装buffer数据
});

// 当数据包接收完成的时候触发
clientSocket.on('end', () => {
    console.log( '数据包接收完成' );
    
    // 把接收到的数据组合起来，然后通过fs写入到client文件夹中
    // 注意：我们接收到的数据是buffer
    // 保存写入buffer数据到文件
});
