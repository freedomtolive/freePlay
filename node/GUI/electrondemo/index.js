// 主进程与渲染进程的数据交互

const {app, BrowserWindow, ipcMain} = require('electron');

// 主进程

// 主进程将数据帮到global上，渲染进程获取
let username = "freedomtolive";
global.username = username;

const data = {
    userName : "freedomtolive",
    sex : "男"
}

// electron更细到5.0后，想让页面支持node，需要加nodeIntegration参数;

app.on("ready", function(){
    const win = new BrowserWindow({
        webPreferences:{
            nodeIntegration:true
        }
    });
    // 打开调试工具
    win.webContents.openDevTools();

    win.loadFile('./layout/index.html');

    // 二：监听渲染进程 ipcRenderer 发送的消息

    // ipcMain.on('getData', function(e, key) {
    //     // console.log(data, key); 通过key确认要发送给渲染进程的数据
    //     // e.sender => 通过这个对象返回消息给渲染进程
    //     console.log(data[key],key)
    //     e.sender.send('sendData', data[key]);
    // });


    // 三：主进程主动发送消息到渲染进程
    // setTimeout(() => {
    //     win.webContents.send('hello', 'hello........', 10, 20, 30);
    // }, 2000);

    // 页面间的数据传递（利用localstroge）
    const win2 = new BrowserWindow();
    win2.webContents.openDevTools();

    win2.loadFile('./layout/index2.html');
})