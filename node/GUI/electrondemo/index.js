// 主进程与渲染进程的数据交互

const {app, BrowserWindow, ipcMain} = require('electron');

app.on("ready", function(){
    const win = new BrowserWindow();

    win.loadFile('./layout/index.html');
})