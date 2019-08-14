const {app, BrowserWindow} = require('electron');

app.on('ready', () => {

    const win = new BrowserWindow({
        width: 540,
        height: 720,
        frame: false,
        webPreferences:{
            nodeIntegration:true
        }
    });

    win.webContents.openDevTools();

    win.loadFile('./layout/index.html');

});