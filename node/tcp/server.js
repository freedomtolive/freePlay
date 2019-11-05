/**
 * 在node中，tcp 协议，基于 net 模块来实现的
 */

const net = require('net');
const fs = require('fs');

/**
 * 创建一个服务器端
 *      1. 监听地址以及端口
 *      2. 处理发送到当前监听地址以及端口的数据
 *      3. 返回（发送）数据到连接的客户端
 * 
 * net.Server 类
 *      new net.Server()
 *      net.createServer()  => return new net.Server()
 */

const server = net.createServer();

/**
 * function createServer(callback) {
 *  let s = new net.Server();
 *  s.on('connection', callback);
 *  return s;
 * }
 */

// 当有客户端连接的时候触发
server.on('connection', socket => {
    // socket => 当前连接的 socket 对象
    console.log('有人连接了');

    /*
        数据包
		    在数据传输过程中不仅仅只有主体数据（你要发送的主要内容），还包括了一些其他的数据信息，比如发送端的IP、端口等，以方便接受者对数据进行处理与回复
		    如果发送的数据比较大的话，还会对发送的数据进行分包，每一个包中包含有一部分主体数据以及上面提到的额外信息，接收方在接收到数据以后会数据包进行整合等一系列操作
            这种传输规则就是数据传输协议中的规定，不同的协议对传输规则有不同的规
        
    */
   
    // 发送一个图片给客户端
    let imgBuffer = fs.readFileSync('./server/1.jpg');
    socket.write( imgBuffer );
    socket.end();
    

    /*
        Net 模块（TCP）
            属性
                socket.remoteAddress
                socket.remotePort
    */
   
    /*socket.on('data', data => {
        // socket.write('show me the money');
        console.log(data.toString(), socket.remoteAddress, socket.remotePort);
    });*/
});

/**
 * 监听地址及端口
 */
// server.listen(12345, '127.0.0.1');

// 0.0.0.0 : * 通配
server.listen(12345, '0.0.0.0');