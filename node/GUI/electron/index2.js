const {app, BrowserWindow, Menu, MenuItem} = require('electron');

/*
    app 对象
        该对象提供了一系列的事件用来控制整个应用程序的生命周期，从打开到关闭，如：
            ready、window-all-closed、quit……

        同时也提供了一些方法来管理应用程序的状态与行为，如：
            quit()、relaunch()、hide()、show()……
*/

app.on("ready",function(){
    // BrowserWindow    创建和控制浏览器窗口
    let bw1 = new BrowserWindow();

    // 创建菜单对象
    let m1 = new Menu();

    // 创建菜单项
    let mi1 = new MenuItem({
        type: 'normal',
        label: '文件'
    });

    // 把菜单项添加到指定的菜单对象中
    m1.append( mi1 );


    // 创建菜单项
    let mi2 = new MenuItem({
        type: 'submenu',
        label: '查看',
        submenu: [
            {
                type: 'normal',
                label: '文件'
            },
            {
                type: 'separator'
            },
            {
                type: 'normal',
                label: '文件夹'
            },
            {
                type: 'checkbox',
                label: '选项一',
                checked: true
            },
            {
                type: 'separator'
            },
            {
                type: 'radio',
                label: 'AAAA'
            },
            {
                type: 'radio',
                label: 'BBBB'
            },
            {
                type: 'separator'
            },
            // {
            //     role: 'quit',
            //     label: '退出'
            // }
            {
                type: 'normal',
                label: '退出',
                click() {
                    app.quit();
                }
            }
        ]
    });
    m1.append( mi2 );

     // 指定该菜单显示的主体（具体哪个窗口、右键-上下文）
    /**
     * 菜单位置：
     *  1. 应用程序的顶层菜单
     *  2. 上下文菜单
     */

     
    // 把菜单添加到应用程序窗口最顶层
    Menu.setApplicationMenu( m1 );
})